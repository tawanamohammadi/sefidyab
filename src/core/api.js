/**
 * سفید یاب | Sefid Yab - API Helper Module
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @license GPL-3.0
 */

import { CONFIG } from './config.js';

/**
 * Simple API helper for making HTTP requests
 */
export class API {
    constructor() {
        this.baseURL = CONFIG.API.github;
        this.timeout = CONFIG.API_TIMEOUT;
    }

    /**
     * Make a GET request
     * @param {string} endpoint - API endpoint
     * @param {Object} headers - Additional headers
     * @returns {Promise<Object>} Response data
     */
    async get(endpoint, headers = {}) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API GET Error:', error);
            throw error;
        }
    }

    /**
     * Make a POST request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request body
     * @param {Object} headers - Additional headers
     * @returns {Promise<Object>} Response data
     */
    async post(endpoint, data = {}, headers = {}) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: JSON.stringify(data),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    }

    /**
     * Fetch user profile from X/Twitter
     * @param {string} username - Twitter username
     * @returns {Promise<Object>} User profile data
     */
    async fetchUserProfile(username) {
        // This would connect to X/Twitter API or scrape page
        // For now, return mock structure
        return {
            username,
            timestamp: Date.now(),
            fetched: true
        };
    }
}

export default new API();
