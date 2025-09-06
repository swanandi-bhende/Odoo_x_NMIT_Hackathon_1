import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../utils/dataService';
import { LifeBuoy, Search, MessageSquare, Send, Paperclip, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const faqCategories = [
  "Ordering", "Shipping", "Returns", "Payments", "Seller Help"
];

const faqs = {
  "Ordering": [{ q: "How do I place an order?", a: "Simply click the 'Buy' button on an item page and follow the checkout process." }],
  "Shipping": [{ q: "How long does shipping take?", a: "Shipping times vary by seller, but typically take 3-7 business days." }],
  "Returns": [{ q: "What is your return policy?", a: "You can request a return within 14 days of delivery if the item is not as described." }],
  "Payments": [{ q: "What payment methods do you accept?", a: "We accept all major credit cards and PayPal." }],
  "Seller Help": [{ q: "How do I become a seller?", a: "You can start listing items from your 'My Listings' page." }],
};

const SupportPage = () => {
  const { user } = useAuth();
  const [subject, setSubject] = useState('');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Ordering");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setAttachments(prev => [...prev, e.target.files[0]]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message || !subject) {
      toast.error("Please fill in subject and message.");
      return;
    }
    const result = dataService.createSupportTicket({
      userId: user?.id,
      subject,
      orderId,
      message,
      attachments: attachments.map(f => f.name) // Mocking upload
    });

    if (result.success) {
      toast.success(`Ticket #${result.ticket.id} created! Status: ${result.ticket.status}. We'll get back to you soon.`);
      setSubject(''); setOrderId(''); setMessage(''); setAttachments([]);
    } else {
      toast.error("Failed to create ticket.");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Support Center</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left: FAQ Categories */}
        <aside className="lg:col-span-1">
          <h2 className="font-semibold text-lg mb-4">FAQ Categories</h2>
          <ul className="space-y-2">
            {faqCategories.map(cat => (
              <li key={cat}>
                <button 
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left flex justify-between items-center p-3 rounded-md transition-colors ${activeCategory === cat ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  {cat} <ChevronRight size={16}/>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main: Searchable FAQ & Contact Form */}
        <main className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-semibold text-lg mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs[activeCategory].map((faq, i) => (
                <details key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <summary className="font-medium cursor-pointer">{faq.q}</summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="font-semibold text-lg mb-4">Contact Support</h2>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" required className="w-full p-2 border rounded-md bg-transparent border-gray-300 dark:border-gray-600 focus:ring-green-500" />
              <input type="text" value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Order ID (optional)" className="w-full p-2 border rounded-md bg-transparent border-gray-300 dark:border-gray-600 focus:ring-green-500" />
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Your message..." required rows="5" className="w-full p-2 border rounded-md bg-transparent border-gray-300 dark:border-gray-600 focus:ring-green-500"></textarea>
              <div className="flex items-center justify-between">
                <label htmlFor="file-upload" className="cursor-pointer text-sm flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600">
                  <Paperclip size={16} /> Attach Screenshot
                </label>
                <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"><Send size={16}/> Open Support Ticket</button>
              </div>
              {attachments.length > 0 && <div className="text-xs text-gray-500">Attached: {attachments.map(f => f.name).join(', ')}</div>}
            </form>
          </div>
        </main>

        {/* Right: Recent Tickets & Links */}
        <aside className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="font-semibold text-lg mb-4">Recent Tickets</h2>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 italic">Login to see your recent tickets.</p>
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-4">Chat with EcoBot</h2>
              <button className="w-full bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600">
                <MessageSquare size={20} /> Start Chat
              </button>
            </div>
        </aside>
      </div>
    </div>
  );
};

export default SupportPage;