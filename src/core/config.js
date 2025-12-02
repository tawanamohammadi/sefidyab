/**
 * سفید یاب | Sefid Yab - Configuration Module
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @license GPL-3.0
 */

export const CONFIG = {
    // Version info
    VERSION: '1.0.0',
    AUTHOR: 'Tawana Mohammadi',
    WEBSITE: 'https://tawana.online',
    EMAIL: 'info@tawana.online',
    
    // Project info
    NAME: 'سفید یاب | Sefid Yab',
    NAME_FA: 'سفید یاب',
    NAME_EN: 'Sefid Yab',
    TAGLINE_FA: 'شفافیت در فضای مجازی',
    TAGLINE_EN: 'Transparency in Cyberspace',
    
    // Colors
    COLORS: {
        primary: '#1d9bf0',
        warning: '#ff6b00',
        success: '#00ba7c',
        danger: '#f4212e',
        dark: '#0f1419',
        light: '#ffffff',
        gray: '#536471'
    },
    
    // Storage keys
    STORAGE_KEY: 'sefidyab_data',
    SETTINGS_KEY: 'sefidyab_settings',
    CACHE_KEY: 'sefidyab_cache',
    
    // Timing
    SCAN_INTERVAL: 3000,
    API_TIMEOUT: 5000,
    CACHE_DURATION: 3600000, // 1 hour
    
    // API endpoints
    API: {
        github: 'https://api.github.com',
        repo: 'tawanamohammadi/sefidyab'
    },
    
    // Detection thresholds
    THRESHOLDS: {
        anomaly_score: 0.7,
        suspicious_patterns: 3,
        min_account_age: 30 // days
    }
};

export default CONFIG;
