import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Adjust path as needed
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

function SellItemForm() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: '',
    condition: '',
    price: '',
    originalYear: '',
    yearsUsed: '',
    location: user?.location || '',
    description: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [cvLoaded, setCvLoaded] = useState(false);
  const [model, setModel] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Load OpenCV.js
    const opencvScript = document.createElement('script');
    opencvScript.src = 'https://docs.opencv.org/4.10.0/opencv.js';
    opencvScript.async = true;
    opencvScript.onload = () => {
      window.cv['onRuntimeInitialized'] = () => {
        setCvLoaded(true);
      };
    };
    opencvScript.onerror = () => setError('Failed to load OpenCV.js');
    document.body.appendChild(opencvScript);

    // Load TensorFlow.js MobileNet
    const loadModel = async () => {
      try {
        const m = await mobilenet.load();
        setModel(m);
      } catch (err) {
        setError('Failed to load MobileNet model');
      }
    };
    loadModel();

    return () => {
      // Cleanup camera
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
      setError('');
    } catch (err) {
      setError('Error accessing camera: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setImagePreview(dataUrl);
    stopCamera();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.onerror = () => setError('Error reading image file');
      reader.readAsDataURL(file);
    }
  };

  const recognizeProductLocal = async () => {
    if (!model || !imagePreview) return null;
    try {
      const img = document.createElement('img');
      img.src = imagePreview;
      await new Promise(resolve => { img.onload = resolve; });
      const predictions = await model.classify(img);
      return predictions[0].className;
    } catch (err) {
      setError('Error recognizing product locally: ' + err.message);
      return null;
    }
  };

  const recognizeProductCloud = async () => {
    if (!imagePreview) return null;
    try {
      const formData = new FormData();
      const response = await fetch(imagePreview);
      const blob = await response.blob();
      formData.append('image', blob, 'product.png');

      const res = await fetch('http://localhost:5000/api/analyze-image', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        setError('Cloud API error: ' + data.error);
        return null;
      }
      return data.labels[0]?.description || null;
    } catch (err) {
      setError('Error with Cloud Vision API: ' + err.message);
      return null;
    }
  };

  const detectDamageLocal = () => {
    if (!cvLoaded || !imagePreview) return false;
    try {
      const imgElem = document.createElement('img');
      imgElem.src = imagePreview;
      const src = window.cv.imread(imgElem);
      const gray = new window.cv.Mat();
      window.cv.cvtColor(src, gray, window.cv.COLOR_RGBA2GRAY);
      window.cv.GaussianBlur(gray, gray, new window.cv.Size(5, 5), 0);
      const edges = new window.cv.Mat();
      window.cv.Canny(gray, edges, 75, 200);
      const contours = new window.cv.MatVector();
      const hierarchy = new window.cv.Mat();
      window.cv.findContours(edges, contours, hierarchy, window.cv.RETR_EXTERNAL, window.cv.CHAIN_APPROX_SIMPLE);
      const numContours = contours.size();
      src.delete();
      gray.delete();
      edges.delete();
      contours.delete();
      hierarchy.delete();
      return numContours > 50; // Arbitrary threshold
    } catch (err) {
      setError('Error detecting damage locally: ' + err.message);
      return false;
    }
  };

  const detectDamageCloud = async () => {
    if (!imagePreview) return false;
    try {
      const formData = new FormData();
      const response = await fetch(imagePreview);
      const blob = await response.blob();
      formData.append('image', blob, 'product.png');

      const res = await fetch('http://localhost:5000/api/analyze-image', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        setError('Cloud API error: ' + data.error);
        return false;
      }
      // Simplified: Consider image "damaged" if low confidence or specific labels (e.g., "scratch", "dent")
      return data.labels.some(label => ['scratch', 'dent', 'damage'].includes(label.description.toLowerCase()));
    } catch (err) {
      setError('Error with Cloud Vision API for damage detection: ' + err.message);
      return false;
    }
  };

  const analyzeImage = async () => {
    if (!imagePreview) {
      setError('Please upload or take a photo first.');
      return;
    }
    if (!formData.condition) {
      setError('Please select a condition first.');
      return;
    }

    // Try cloud-based recognition first
    let productName = await recognizeProductCloud();
    if (!productName) {
      // Fallback to local MobileNet
      productName = await recognizeProductLocal();
    }
    if (productName) {
      setFormData(prev => ({ ...prev, title: productName }));
    }

    // Try cloud-based damage detection
    let isDamaged = await detectDamageCloud();
    if (isDamaged === false) {
      // Fallback to local OpenCV
      isDamaged = detectDamageLocal();
    }

    if (isDamaged && ['New', 'Excellent'].includes(formData.condition)) {
      alert('Damage detected! This does not match the specified condition.');
    } else {
      alert('Analysis complete. No mismatch detected.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (imagePreview) {
      const response = await fetch(imagePreview);
      const blob = await response.blob();
      formDataToSend.append('image', blob, 'product.png');
    }

    try {
      const response = await fetch('http://localhost:5000/api/sell-item', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const result = await response.json();
      if (result.error) {
        setError('Submission error: ' + result.error);
        return;
      }
      alert('Item submitted successfully!');
      setFormData({
        id: '',
        title: '',
        category: '',
        condition: '',
        price: '',
        originalYear: '',
        yearsUsed: '',
        location: user?.location || '',
        description: '',
      });
      setImagePreview(null);
    } catch (error) {
      setError('Error submitting item: ' + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-card shadow-sm border">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Sell an Item</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-900">ID</span>
          <input
            className="mt-1 p-2 border rounded-card focus:ring-eco-green focus:border-eco-green"
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-900">Title</span>
          <input
            className="mt-1 p-2 border rounded-card focus:ring-eco-green focus:border-eco-green"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-900">Category</span>
          <input
            className="mt-1 p-2 border rounded-card focus:ring-eco-green focus:border-eco-green"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-900">Condition</span>
          <select
            className="mt-1 p-2 border rounded-card focus:ring-eco-green focus:border-eco-green"
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="New">New</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </label>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-900">Price ($)</span>
          <input
            className="mt-1 p-2 border rounded-card focus:ring-eco-green focus:border-eco-green"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-900">Original Year</span>
          <input
            className="mt-1 p-2 border rounded-card focus:ring-eco-green focus:border-eco-green"
            type="number"
            name="originalYear"
            value={formData.originalYear}
            onChange={handleInputChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-900">Years Used</span>
          <input
            className="mt-1 p-2 border rounded-card focus:ring-eco-green focus:border-eco-green"
            type="number"
            name="yearsUsed"
            value={formData.yearsUsed}
            onChange={handleInputChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-900">Location of Seller</span>
          <input
            className="mt-1 p-2 border rounded-card focus:ring-eco-green focus:border-eco-green"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-900">Description</span>
          <textarea
            className="mt-1 p-2 border rounded-card focus:ring-eco-green focus:border-eco-green"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-900">Image</span>
          <input
            className="mt-1"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="flex space-x-2 mt-2">
            <button
              type="button"
              onClick={startCamera}
              className="bg-eco-green text-white px-4 py-2 rounded-card font-medium hover:bg-emerald-600 transition-colors"
              disabled={isCameraActive}
            >
              Start Camera
            </button>
            {isCameraActive && (
              <button
                type="button"
                onClick={stopCamera}
                className="bg-red-500 text-white px-4 py-2 rounded-card font-medium hover:bg-red-600 transition-colors"
              >
                Stop Camera
              </button>
            )}
            <button
              type="button"
              onClick={takePhoto}
              className="bg-eco-green text-white px-4 py-2 rounded-card font-medium hover:bg-emerald-600 transition-colors"
              disabled={!isCameraActive}
            >
              Take Photo
            </button>
          </div>
          <video
            ref={videoRef}
            autoPlay
            className="mt-2 w-full max-w-md rounded-card border"
            style={{ display: isCameraActive ? 'block' : 'none' }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Product Preview"
              className="mt-2 w-full max-w-md rounded-card border"
            />
          )}
        </label>
        <button
          type="button"
          onClick={analyzeImage}
          className="bg-eco-green text-white px-6 py-2 rounded-card font-medium hover:bg-emerald-600 transition-colors"
        >
          Analyze Image with AI
        </button>
        <button
          type="submit"
          className="bg-eco-green text-white px-6 py-2 rounded-card font-medium hover:bg-emerald-600 transition-colors"
        >
          Submit Item
        </button>
      </form>
    </div>
  );
}

export default SellItemForm;