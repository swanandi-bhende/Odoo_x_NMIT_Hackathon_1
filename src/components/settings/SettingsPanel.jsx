import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Moon, Sun, Type, Monitor, Bell, Globe } from 'lucide-react';

const SettingsPanel = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Theme Setting */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                {settings.theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
                Theme
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateSettings({ theme: 'light' })}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    settings.theme === 'light'
                      ? 'bg-green-100 text-green-800 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => updateSettings({ theme: 'dark' })}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    settings.theme === 'dark'
                      ? 'bg-green-100 text-green-800 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            {/* Font Size Setting */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Type size={16} />
                Font Size
              </label>
              <div className="flex gap-2">
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => updateSettings({ fontSize: size })}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                      settings.fontSize === size
                        ? 'bg-green-100 text-green-800 border-2 border-green-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Page Width Setting */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Monitor size={16} />
                Page Width
              </label>
              <div className="flex gap-2">
                {['narrow', 'normal', 'wide'].map((width) => (
                  <button
                    key={width}
                    onClick={() => updateSettings({ pageWidth: width })}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                      settings.pageWidth === width
                        ? 'bg-green-100 text-green-800 border-2 border-green-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {width}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications Toggle */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Bell size={16} />
                Notifications
              </label>
              <button
                onClick={() => updateSettings({ notifications: !settings.notifications })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Language Setting */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Globe size={16} />
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;