import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, RotateCcw, Package, ArrowLeft } from 'lucide-react';

const EcoBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! I\'m EcoBot 🌱 How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { icon: Package, label: 'Track Order', action: 'track' },
    { icon: RotateCcw, label: 'Return Item', action: 'return' },
    { icon: ArrowLeft, label: 'Buy Again', action: 'repurchase' }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
      return 'I can help you track your orders! Your recent order for "Vintage Denim Jacket" is currently in transit and should arrive tomorrow. Would you like me to show you the tracking details?';
    }
    
    if (lowerMessage.includes('return')) {
      return 'I\'d be happy to help with returns! Which item would you like to return? I can see your recent purchases and help you start the return process.';
    }
    
    if (lowerMessage.includes('co2') || lowerMessage.includes('carbon')) {
      return 'Great question! You\'ve saved 45.2kg of CO₂ through your sustainable purchases this month. That\'s equivalent to 12 trees worth of carbon absorption! 🌳';
    }
    
    if (lowerMessage.includes('buy again') || lowerMessage.includes('repurchase')) {
      return 'I can help you find similar items! Based on your recent purchases, I found some eco-friendly alternatives. Would you like me to show you recommendations?';
    }
    
    return 'Thanks for your message! I\'m here to help with orders, returns, sustainability questions, and finding eco-friendly products. What would you like to know?';
  };

  const handleQuickAction = (action) => {
    let message = '';
    switch (action) {
      case 'track':
        message = 'Can you help me track my order?';
        break;
      case 'return':
        message = 'I need to return an item';
        break;
      case 'repurchase':
        message = 'I want to buy something similar to my previous purchase';
        break;
    }
    setInputMessage(message);
  };

  const handleSupportTicket = () => {
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = {
        id: Date.now(),
        type: 'bot',
        message: 'I\'ve created a support ticket for you! A human agent will contact you within 24 hours. Is there anything else I can help you with in the meantime?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat Bubble */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-eco-green text-white rounded-full shadow-lg flex items-center justify-center z-50 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white">1</span>
        </div>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-card shadow-2xl border z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-eco-green text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <h3 className="font-semibold">EcoBot</h3>
                  <p className="text-xs text-green-100">
                    Can access your recent orders (no payment data)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-green-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-b border-gray-200">
              <div className="flex space-x-2">
                {quickActions.map((action) => (
                  <button
                    key={action.action}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors"
                  >
                    <action.icon className="w-3 h-3" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-eco-green text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-card focus:ring-2 focus:ring-eco-green focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-eco-green text-white rounded-card hover:bg-emerald-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleSupportTicket}
                className="w-full text-xs text-eco-green hover:underline"
              >
                Talk to human support →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="md:hidden fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl z-50 h-[70vh] flex flex-col"
          >
            {/* Mobile Header */}
            <div className="bg-eco-green text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-semibold">EcoBot</h3>
                    <p className="text-xs text-green-100">Eco-friendly assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-green-600 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Quick Actions */}
            <div className="p-4 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.action}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex flex-col items-center space-y-1 p-3 bg-gray-100 hover:bg-gray-200 rounded-card text-xs transition-colors"
                  >
                    <action.icon className="w-5 h-5" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-eco-green text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-card focus:ring-2 focus:ring-eco-green focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-eco-green text-white rounded-card hover:bg-emerald-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleSupportTicket}
                className="w-full text-xs text-eco-green hover:underline text-center"
              >
                Talk to human support →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EcoBot;
