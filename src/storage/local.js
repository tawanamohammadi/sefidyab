/**
 * سفید یاب | Sefid Yab - Local Storage Module
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @license GPL-3.0
 */

import { CONFIG } from '../core/config.js';

/**
 * localStorage wrapper with enhanced functionality
 */
export class LocalStorage {
    constructor() {
        this.prefix = CONFIG.STORAGE_KEY;
        this.available = this.checkAvailability();
    }

    /**
     * Check if localStorage is available
     * @returns {boolean} Availability status
     */
    checkAvailability() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Get prefixed key
     * @param {string} key - Original key
     * @returns {string} Prefixed key
     */
    getKey(key) {
        return `${this.prefix}_${key}`;
    }

    /**
     * Set item in storage
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @returns {boolean} Success status
     */
    set(key, value) {
        if (!this.available) {
            return false;
        }

        try {
            const data = {
                value,
                timestamp: Date.now()
            };
            localStorage.setItem(this.getKey(key), JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('LocalStorage set error:', error);
            return false;
        }
    }

    /**
     * Get item from storage
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Stored value or default
     */
    get(key, defaultValue = null) {
        if (!this.available) {
            return defaultValue;
        }

        try {
            const item = localStorage.getItem(this.getKey(key));
            if (!item) {
                return defaultValue;
            }

            const data = JSON.parse(item);
            return data.value;
        } catch (error) {
            console.error('LocalStorage get error:', error);
            return defaultValue;
        }
    }

    /**
     * Remove item from storage
     * @param {string} key - Storage key
     * @returns {boolean} Success status
     */
    remove(key) {
        if (!this.available) {
            return false;
        }

        try {
            localStorage.removeItem(this.getKey(key));
            return true;
        } catch (error) {
            console.error('LocalStorage remove error:', error);
            return false;
        }
    }

    /**
     * Clear all items with prefix
     * @returns {boolean} Success status
     */
    clear() {
        if (!this.available) {
            return false;
        }

        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('LocalStorage clear error:', error);
            return false;
        }
    }

    /**
     * Get all items with prefix
     * @returns {Object} All stored items
     */
    getAll() {
        if (!this.available) {
            return {};
        }

        const items = {};
        const keys = Object.keys(localStorage);
        
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                const shortKey = key.replace(`${this.prefix}_`, '');
                items[shortKey] = this.get(shortKey);
            }
        });

        return items;
    }

    /**
     * Check if key exists
     * @param {string} key - Storage key
     * @returns {boolean} Existence status
     */
    has(key) {
        if (!this.available) {
            return false;
        }

        return localStorage.getItem(this.getKey(key)) !== null;
    }

    /**
     * Get storage size in bytes
     * @returns {number} Storage size
     */
    getSize() {
        if (!this.available) {
            return 0;
        }

        let size = 0;
        const keys = Object.keys(localStorage);
        
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                const value = localStorage.getItem(key);
                if (value) {
                    size += key.length + value.length;
                }
            }
        });

        return size;
    }

    /**
     * Set item with expiration
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @param {number} ttl - Time to live in milliseconds
     * @returns {boolean} Success status
     */
    setWithExpiry(key, value, ttl) {
        if (!this.available) {
            return false;
        }

        try {
            const data = {
                value,
                timestamp: Date.now(),
                expiry: Date.now() + ttl
            };
            localStorage.setItem(this.getKey(key), JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('LocalStorage setWithExpiry error:', error);
            return false;
        }
    }

    /**
     * Get item with expiration check
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if not found or expired
     * @returns {*} Stored value or default
     */
    getWithExpiry(key, defaultValue = null) {
        if (!this.available) {
            return defaultValue;
        }

        try {
            const item = localStorage.getItem(this.getKey(key));
            if (!item) {
                return defaultValue;
            }

            const data = JSON.parse(item);
            
            // Check expiration
            if (data.expiry && Date.now() > data.expiry) {
                this.remove(key);
                return defaultValue;
            }

            return data.value;
        } catch (error) {
            console.error('LocalStorage getWithExpiry error:', error);
            return defaultValue;
        }
    }
}

export default new LocalStorage();
