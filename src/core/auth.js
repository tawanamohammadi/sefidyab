/**
 * سفید یاب | Sefid Yab - Authentication Module
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @license GPL-3.0
 */

import { CONFIG } from './config.js';

/**
 * Simple authentication and authorization module
 */
export class Auth {
    constructor() {
        this.authenticated = false;
        this.user = null;
        this.token = null;
    }

    /**
     * Check if user is authenticated
     * @returns {boolean} Authentication status
     */
    isAuthenticated() {
        return this.authenticated;
    }

    /**
     * Get current user
     * @returns {Object|null} User object or null
     */
    getUser() {
        return this.user;
    }

    /**
     * Set authentication token
     * @param {string} token - Authentication token
     */
    setToken(token) {
        this.token = token;
        this.authenticated = true;
        
        // Store in localStorage
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`${CONFIG.STORAGE_KEY}_token`, token);
        }
    }

    /**
     * Get authentication token
     * @returns {string|null} Authentication token
     */
    getToken() {
        if (this.token) {
            return this.token;
        }

        // Try to retrieve from localStorage
        if (typeof localStorage !== 'undefined') {
            this.token = localStorage.getItem(`${CONFIG.STORAGE_KEY}_token`);
        }

        return this.token;
    }

    /**
     * Login with credentials
     * @param {string} username - Username
     * @param {string} password - Password
     * @returns {Promise<boolean>} Success status
     */
    async login(username, password) {
        try {
            // This would connect to authentication service
            // For now, simple mock implementation
            this.user = { username };
            this.authenticated = true;
            return true;
        } catch (error) {
            console.error('Auth Login Error:', error);
            return false;
        }
    }

    /**
     * Logout
     */
    logout() {
        this.authenticated = false;
        this.user = null;
        this.token = null;

        // Clear from localStorage
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(`${CONFIG.STORAGE_KEY}_token`);
        }
    }

    /**
     * Verify authentication token
     * @returns {Promise<boolean>} Verification status
     */
    async verify() {
        const token = this.getToken();
        if (!token) {
            return false;
        }

        try {
            // This would verify token with service
            // For now, simple check
            this.authenticated = true;
            return true;
        } catch (error) {
            console.error('Auth Verify Error:', error);
            this.logout();
            return false;
        }
    }
}

export default new Auth();
