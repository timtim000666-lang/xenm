import React, { useState } from 'react';
import { Search, MessageCircle, Settings, AlertCircle } from 'lucide-react';

export default function ModernMessenger() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [activeTab, setActiveTab] = useState('chats');
  const [isRegistering, setIsRegistering] = useState(false);
  const [screenTransition, setScreenTransition] = useState(false);
  
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState('');
  
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [searchActive, setSearchActive] = useState(false);

  const validateUsername = (username) => {
    const cleanUsername = username.replace('@', '');
    const regex = /^[a-zA-Z0-9]{4,24}$/;
    return regex.test(cleanUsername);
  };

  const handleLogin = () => {
    setError('');
    const cleanUsername = loginData.username.replace('@', '');
    
    if (!loginData.username || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateUsername(cleanUsername)) {
      setError('Invalid username format');
      return;
    }

    const existingUser = registeredUsers.find(
      u => u.username.toLowerCase() === cleanUsername.toLowerCase() && u.password === loginData.password
    );

    if (!existingUser) {
      setError('Account does not exist or wrong password');
      return;
    }

    setUser({
      username: existingUser.username,
      email: existingUser.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${existingUser.username}`
    });
    
    setScreenTransition(true);
    setTimeout(() => {
      setCurrentScreen('main');
      setScreenTransition(false);
    }, 300);
  };

  const handleRegister = () => {
    setError('');
    const cleanUsername = registerData.username.replace('@', '');
    
    if (!registerData.email || !registerData.username || !registerData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateUsername(cleanUsername)) {
      setError('Username must be 4-24 characters (letters and numbers only)');
      return;
    }

    const userExists = registeredUsers.find(
      u => u.username.toLowerCase() === cleanUsername.toLowerCase()
    );

    if (userExists) {
      setError('Username already taken');
      return;
    }

    const newUser = {
      email: registerData.email,
      username: cleanUsername,
      password: registerData.password
    };

    setRegisteredUsers([...registeredUsers, newUser]);
    setUser({
      username: cleanUsername,
      email: registerData.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanUsername}`
    });
    
    setScreenTransition(true);
    setTimeout(() => {
      setCurrentScreen('main');
      setScreenTransition(false);
    }, 300);
  };

  const switchAuthMode = () => {
    setError('');
    setScreenTransition(true);
    setTimeout(() => {
      setIsRegistering(!isRegistering);
      setScreenTransition(false);
    }, 200);
  };

  const chats = [
    { id: 1, username: 'alex_dev', lastMessage: 'Hey, how are you?', time: '10:30', unread: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex' },
    { id: 2, username: 'sarah_design', lastMessage: 'Check out this new design', time: '09:15', unread: 0, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
    { id: 3, username: 'mike_tech', lastMessage: 'Meeting at 3pm', time: 'Yesterday', unread: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike' },
    { id: 4, username: 'emma_creative', lastMessage: 'Sounds good!', time: 'Yesterday', unread: 0, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
  ];

  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className={`w-full max-w-md transition-all duration-300 ${screenTransition ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="text-center mb-12 transition-all duration-500 animate-fade-in">
            <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:rotate-12">
              <MessageCircle className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Messenger</h1>
            <p className="text-gray-400">Connect with everyone</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-3xl flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {!isRegistering ? (
            <div className="space-y-4">
              <div className="transform transition-all duration-300 hover:scale-102">
                <input
                  type="text"
                  placeholder="@username"
                  value={loginData.username}
                  onChange={(e) => {
                    setError('');
                    setLoginData({...loginData, username: e.target.value});
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-6 py-4 bg-white bg-opacity-10 rounded-full text-white placeholder-gray-400 outline-none focus:bg-opacity-20 transition-all duration-300 focus:scale-102"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                />
              </div>
              <div className="transform transition-all duration-300 hover:scale-102">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => {
                    setError('');
                    setLoginData({...loginData, password: e.target.value});
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-6 py-4 bg-white bg-opacity-10 rounded-full text-white placeholder-gray-400 outline-none focus:bg-opacity-20 transition-all duration-300 focus:scale-102"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-full py-4 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 active:scale-95 transform hover:scale-105"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Log In
              </button>
              <div className="text-center pt-4">
                <span className="text-gray-400">Don't have an account? </span>
                <button
                  onClick={switchAuthMode}
                  className="text-white font-semibold hover:underline transition-all duration-200"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  Register
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="transform transition-all duration-300 hover:scale-102">
                <input
                  type="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={(e) => {
                    setError('');
                    setRegisterData({...registerData, email: e.target.value});
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                  className="w-full px-6 py-4 bg-white bg-opacity-10 rounded-full text-white placeholder-gray-400 outline-none focus:bg-opacity-20 transition-all duration-300 focus:scale-102"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                />
              </div>
              <div className="transform transition-all duration-300 hover:scale-102">
                <input
                  type="text"
                  placeholder="@username (4-24 characters)"
                  value={registerData.username}
                  onChange={(e) => {
                    setError('');
                    const value = e.target.value.replace(/[^a-zA-Z0-9@]/g, '');
                    if (value.length <= 25) {
                      setRegisterData({...registerData, username: value});
                    }
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                  className="w-full px-6 py-4 bg-white bg-opacity-10 rounded-full text-white placeholder-gray-400 outline-none focus:bg-opacity-20 transition-all duration-300 focus:scale-102"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                />
              </div>
              <div className="transform transition-all duration-300 hover:scale-102">
                <input
                  type="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={(e) => {
                    setError('');
                    setRegisterData({...registerData, password: e.target.value});
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                  className="w-full px-6 py-4 bg-white bg-opacity-10 rounded-full text-white placeholder-gray-400 outline-none focus:bg-opacity-20 transition-all duration-300 focus:scale-102"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                />
              </div>
              <button
                onClick={handleRegister}
                className="w-full py-4 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 active:scale-95 transform hover:scale-105"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Register
              </button>
              <div className="text-center pt-4">
                <span className="text-gray-400">Already have an account? </span>
                <button
                  onClick={switchAuthMode}
                  className="text-white font-semibold hover:underline transition-all duration-200"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  Log In
                </button>
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
          .hover\\:scale-102:hover {
            transform: scale(1.02);
          }
          .focus\\:scale-102:focus {
            transform: scale(1.02);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {activeTab === 'chats' && (
        <div className="flex-1 overflow-hidden flex flex-col animate-fade-in">
          <div className="p-4 flex items-center justify-between border-b border-white border-opacity-10 backdrop-blur-sm">
            <h1 className="text-2xl font-bold">Chats</h1>
            <button
              onClick={() => setSearchActive(!searchActive)}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-all duration-300 active:scale-95 transform hover:rotate-90"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Search className="w-6 h-6" />
            </button>
          </div>

          {searchActive && (
            <div className="p-4 border-b border-white border-opacity-10 animate-slide-down">
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full px-4 py-3 bg-white bg-opacity-10 rounded-full text-white placeholder-gray-400 outline-none focus:bg-opacity-20 transition-all duration-300"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              />
            </div>
          )}

          <div className="flex-1 overflow-y-auto pb-20">
            {chats.map((chat, index) => (
              <div
                key={chat.id}
                className="flex items-center gap-3 p-4 hover:bg-white hover:bg-opacity-5 transition-all duration-300 cursor-pointer active:bg-opacity-10 transform hover:translate-x-1"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  animation: `slide-in-left 0.4s ease-out ${index * 0.1}s both`
                }}
              >
                <img
                  src={chat.avatar}
                  alt={chat.username}
                  className="w-14 h-14 rounded-full bg-white bg-opacity-10 transition-all duration-300 hover:scale-110"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">@{chat.username}</span>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold animate-bounce-subtle">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && user && (
        <div className="flex-1 overflow-y-auto pb-20 animate-fade-in">
          <div className="p-6 text-center border-b border-white border-opacity-10">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-24 h-24 rounded-full mx-auto mb-4 bg-white bg-opacity-10 transition-all duration-500 hover:scale-110 hover:rotate-6"
            />
            <h2 className="text-xl font-bold">@{user.username}</h2>
          </div>

          <div className="p-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Account</h3>
            <div className="space-y-1">
              <div
                className="p-4 bg-white bg-opacity-5 rounded-3xl hover:bg-opacity-10 transition-all duration-300 cursor-pointer active:scale-98 transform hover:translate-x-1"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div
                className="p-4 bg-white bg-opacity-5 rounded-3xl hover:bg-opacity-10 transition-all duration-300 cursor-pointer active:scale-98 transform hover:translate-x-1"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <p className="text-sm text-gray-400">Username</p>
                <p className="font-medium">@{user.username}</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Settings</h3>
            <div className="space-y-1">
              <div
                className="p-4 bg-white bg-opacity-5 rounded-3xl hover:bg-opacity-10 transition-all duration-300 cursor-pointer active:scale-98 transform hover:translate-x-1"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <p className="font-medium">Chat Settings</p>
              </div>
              <div
                className="p-4 bg-white bg-opacity-5 rounded-3xl hover:bg-opacity-10 transition-all duration-300 cursor-pointer active:scale-98 transform hover:translate-x-1"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <p className="font-medium">Privacy</p>
              </div>
              <div
                className="p-4 bg-white bg-opacity-5 rounded-3xl hover:bg-opacity-10 transition-all duration-300 cursor-pointer active:scale-98 transform hover:translate-x-1"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <p className="font-medium">Security</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Support</h3>
            <div
              className="p-4 bg-white bg-opacity-5 rounded-3xl hover:bg-opacity-10 transition-all duration-300 cursor-pointer active:scale-98 transform hover:translate-x-1"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <p className="font-medium">Contact Support</p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white border-opacity-10 backdrop-blur-lg">
        <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-full transition-all duration-300 active:scale-95 transform ${
              activeTab === 'chats' ? 'bg-white bg-opacity-10 scale-105' : 'hover:scale-105'
            }`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <MessageCircle className={`w-6 h-6 transition-all duration-300 ${activeTab === 'chats' ? 'text-white' : 'text-gray-400'}`} />
            <span className={`text-xs font-medium transition-all duration-300 ${activeTab === 'chats' ? 'text-white' : 'text-gray-400'}`}>
              Chats
            </span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-full transition-all duration-300 active:scale-95 transform ${
              activeTab === 'settings' ? 'bg-white bg-opacity-10 scale-105' : 'hover:scale-105'
            }`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <Settings className={`w-6 h-6 transition-all duration-300 ${activeTab === 'settings' ? 'text-white' : 'text-gray-400'}`} />
            <span className={`text-xs font-medium transition-all duration-300 ${activeTab === 'settings' ? 'text-white' : 'text-gray-400'}`}>
              Settings
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }
      `}</style>
    </div>
  );
}