// app.js
/**
* Cosmos Search - A customizable browser homepage
* Features:
* - Beautiful animated background themes
* - Google search integration
* - Customizable quick links
* - Settings panel with appearance options
* - Local storage for preferences
* - I'm out of time, enjoy the code so you can make your own version, to your taste!
*/

function App() {
  // State for search functionality
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  
  // State for settings panel
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState('cosmic');
  const [showThemes, setShowThemes] = React.useState(false);
  const [blurEnabled, setBlurEnabled] = React.useState(true);
  
  // State for favorites (quick links)
  const [favorites, setFavorites] = React.useState(() => {
    // Load saved favorites from localStorage or use defaults
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [
      { 
        name: 'Google',
        url: 'https://google.com',
        icon: `<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`
      },
      {
        name: 'GitHub',
        url: 'https://github.com',
        icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.417 22 12c0-5.523-4.477-10-10-10z"/></svg>`
      },
      {
        name: 'YouTube',
        url: 'https://youtube.com',
        icon: `<svg viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
      }
    ];
  });
  
  // State for managing favorites
  const [showAddFavorite, setShowAddFavorite] = React.useState(false);
  const [newFavorite, setNewFavorite] = React.useState({ name: '', url: '', icon: '' });
  
  // State for wallpaper customization
  const [customWallpaper, setCustomWallpaper] = React.useState(() => {
    const saved = localStorage.getItem('customWallpaper');
    return saved || '';
  });
  const [showWallpaperInput, setShowWallpaperInput] = React.useState(false);

  // Common icons for quick selection
  const commonIcons = {
    google: `<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`,
    github: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.417 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24"><path fill="#1DA1F2" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  };

  // Apply theme and blur effects when they change
  React.useEffect(() => {
    document.body.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-blur', blurEnabled ? 'enabled' : 'disabled');
  }, [currentTheme, blurEnabled]);

  // Save favorites to localStorage when they change
  React.useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle wallpaper changes
  React.useEffect(() => {
    if (customWallpaper) {
      localStorage.setItem('customWallpaper', customWallpaper);
      document.body.style.backgroundImage = `url(${customWallpaper})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
    } else {
      document.body.style.backgroundImage = 'none';
    }
  }, [customWallpaper]);

  // Change the current theme
  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
  };

  // Toggle blur effects
  const handleBlurToggle = () => {
    setBlurEnabled(!blurEnabled);
  };

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      setSuggestions([
        { type: 'search', term: event.target.value },
      ]);
    } else {
      setSuggestions([]);
    }
  };

  // Handle search input focus
  const handleFocus = () => {
    setIsFocused(true);
    document.querySelector('.title-container').classList.add('focused');
    document.querySelector('.search-form').classList.add('focused');
  };

  // Handle search input blur
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      document.querySelector('.title-container').classList.remove('focused');
      document.querySelector('.search-form').classList.remove('focused');
    }, 100);
  };

  // Handle search form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
  };

  // Handle suggestion selection
  const handleSuggestionClick = (term) => {
    setSearchTerm(term);
    setSuggestions([]);
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(term)}`;
  };

  // Toggle settings panel
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Toggle theme selector
  const toggleThemes = () => {
    setShowThemes(!showThemes);
  };

  // Add a new favorite
  const addFavorite = () => {
    if (newFavorite.name && newFavorite.url) {
      setFavorites([...favorites, newFavorite]);
      setNewFavorite({ name: '', url: '', icon: '' });
      setShowAddFavorite(false);
    }
  };

  // Remove a favorite
  const removeFavorite = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  // Handle wallpaper file selection
  const handleWallpaperChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomWallpaper(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove current wallpaper
  const removeWallpaper = () => {
    setCustomWallpaper('');
    localStorage.removeItem('customWallpaper');
  };

  return (
    <>
      {/* Background effects */}
      <div className={`background-effects theme-${currentTheme} ${customWallpaper ? 'with-wallpaper' : ''}`}>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Settings button */}
      <button className="settings-button" onClick={toggleSettings}>
        <img src="https://www.svgrepo.com/show/146207/settings-cogwheel-button.svg" alt="Settings" width="20" height="20" />
      </button>

      {/* Settings modal */}
      <div className={`modal-overlay ${isSettingsOpen ? 'active' : ''}`}>
        <div className="settings-modal">
          <header className="settings-header">
            <h2>Settings</h2>
            <button className="close-button" onClick={toggleSettings} aria-label="Close settings">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </header>

          <section className="settings-section">
            <h3>Appearance</h3>
            <div className="setting-item theme-button" onClick={toggleThemes}>
              <div className="setting-label-group">
                <span className="setting-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/>
                  </svg>
                </span>
                <span className="setting-label">Themes</span>
                <span className="setting-description">Change the look and feel</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-chevron-right ${showThemes ? 'rotated' : ''}`} viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
            
            {showThemes && (
              <div className="theme-selector">
                <div 
                  className={`theme-option ${currentTheme === 'cosmic' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('cosmic')}
                  aria-label="Cosmic theme"
                >
                  <div className="theme-preview cosmic"></div>
                  <span>Cosmic</span>
                </div>
                <div 
                  className={`theme-option ${currentTheme === 'aurora' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('aurora')}
                  aria-label="Aurora theme"
                >
                  <div className="theme-preview aurora"></div>
                  <span>Aurora</span>
                </div>
                <div 
                  className={`theme-option ${currentTheme === 'ocean' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('ocean')}
                  aria-label="Ocean theme"
                >
                  <div className="theme-preview ocean"></div>
                  <span>Ocean</span>
                </div>
                <div 
                  className={`theme-option ${currentTheme === 'sunset' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('sunset')}
                  aria-label="Sunset theme"
                >
                  <div className="theme-preview sunset"></div>
                  <span>Sunset</span>
                </div>
              </div>
            )}

            <div className="setting-item">
              <div className="setting-label-group">
                <span className="setting-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
                  </svg>
                </span>
                <span className="setting-label">Custom Wallpaper</span>
                <span className="setting-description">Set your own background image</span>
              </div>
              <button className="wallpaper-button" onClick={() => setShowWallpaperInput(true)}>
                Change
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-label-group">
                <span className="setting-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                    <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864z"/>
                  </svg>
                </span>
                <span className="setting-label">Blur Effects</span>
                <span className="setting-description">Enable glass-like effects</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={blurEnabled}
                  onChange={handleBlurToggle}
                  aria-label="Toggle blur effects"
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </section>

          <section className="settings-section">
            <h3>Search</h3>
            <div className="setting-item">
              <span className="setting-label">Safe Search - does not work, future integration</span>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked aria-label="Toggle safe search" />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span className="setting-label">Search Suggestions - does not work, future integration </span>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked aria-label="Toggle search suggestions" />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </section>
        </div>
      </div>

      {/* Wallpaper modal */}
      {showWallpaperInput && (
        <div className="wallpaper-modal">
          <div className="wallpaper-content">
            <h3>Custom Wallpaper</h3>
            <div className="wallpaper-preview">
              {customWallpaper && (
                <img src={customWallpaper} alt="Current wallpaper" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleWallpaperChange}
              className="wallpaper-input"
              aria-label="Select wallpaper image"
            />
            <div className="wallpaper-actions">
              <button onClick={() => setShowWallpaperInput(false)}>Cancel</button>
              <button onClick={removeWallpaper} className="remove-wallpaper">Remove Wallpaper</button>
              <button onClick={() => setShowWallpaperInput(false)} className="save-wallpaper">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <div className="title-container">
            <h1 className="display-1 mb-4">Cosmos Search</h1>
          </div>

          <form onSubmit={handleSubmit} className="search-form" role="search">
            <input
              type="text"
              className="search-input"
              placeholder="Explore the universe..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-label="Search input"
            />
            <div className="suggestions-container">
              {suggestions.length > 0 && isFocused && (
                <div className="suggestions" role="listbox">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion"
                      onClick={() => handleSuggestionClick(suggestion.term)}
                      role="option"
                    >
                      {suggestion.type === 'search' && (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0 0-6.492 6.5 6.5 0 0 0 0 6.492zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                          </svg>
                          <span>Search for: <b>{suggestion.term}</b></span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>

          {/* Favorites bar */}
          <nav className="favorites-bar" aria-label="Quick links">
            <div className="favorites-container">
              {favorites.map((favorite, index) => (
                <a 
                  key={index} 
                  href={favorite.url} 
                  className="favorite-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${favorite.name}`}
                >
                  <span 
                    className="favorite-icon"
                    dangerouslySetInnerHTML={{ __html: favorite.icon }}
                  />
                  <span className="favorite-name">{favorite.name}</span>
                  <button 
                    className="remove-favorite" 
                    onClick={(e) => {
                      e.preventDefault();
                      removeFavorite(index);
                    }}
                    aria-label={`Remove ${favorite.name}`}
                  >
                    ×
                  </button>
                </a>
              ))}
            </div>
            <button 
              className="add-favorite-button"
              onClick={() => setShowAddFavorite(true)}
              aria-label="Add new quick link"
            >
              +
            </button>
          </nav>

          {/* Add favorite modal */}
          {showAddFavorite && (
            <div className="add-favorite-modal">
              <div className="add-favorite-content">
                <h3>Add Favorite</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={newFavorite.name}
                  onChange={(e) => setNewFavorite({...newFavorite, name: e.target.value})}
                  aria-label="Favorite name"
                />
                <input
                  type="url"
                  placeholder="URL"
                  value={newFavorite.url}
                  onChange={(e) => setNewFavorite({...newFavorite, url: e.target.value})}
                  aria-label="Favorite URL"
                />
                <div className="icon-picker">
                  {Object.entries(commonIcons).map(([name, icon]) => (
                    <button
                      key={name}
                      className={`icon-option ${newFavorite.icon === icon ? 'selected' : ''}`}
                      onClick={() => setNewFavorite({...newFavorite, icon: icon})}
                      dangerouslySetInnerHTML={{ __html: icon }}
                      aria-label={`Select ${name} icon`}
                    />
                  ))}
                </div>
                <div className="add-favorite-actions">
                  <button onClick={() => setShowAddFavorite(false)}>Cancel</button>
                  <button onClick={addFavorite}>Add</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
