/**
 * سفید یاب | Sefid Yab - Timeline Scanner Module
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @license GPL-3.0
 */

import { CONFIG } from '../core/config.js';

/**
 * Timeline scanner for extracting usernames from X/Twitter
 */
export class Scanner {
    constructor() {
        this.scanning = false;
        this.usernames = new Set();
        this.scanInterval = CONFIG.SCAN_INTERVAL;
    }

    /**
     * Start scanning the timeline
     * @param {Function} callback - Callback function for found usernames
     */
    start(callback) {
        if (this.scanning) {
            console.log('Scanner already running');
            return;
        }

        this.scanning = true;
        console.log('Scanner started');

        this.intervalId = setInterval(() => {
            this.scan(callback);
        }, this.scanInterval);

        // Initial scan
        this.scan(callback);
    }

    /**
     * Stop scanning
     */
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.scanning = false;
        console.log('Scanner stopped');
    }

    /**
     * Perform a single scan
     * @param {Function} callback - Callback function for found usernames
     */
    scan(callback) {
        try {
            const newUsernames = this.extractUsernames();
            
            newUsernames.forEach(username => {
                if (!this.usernames.has(username)) {
                    this.usernames.add(username);
                    if (callback) {
                        callback(username);
                    }
                }
            });
        } catch (error) {
            console.error('Scan error:', error);
        }
    }

    /**
     * Extract usernames from the current page
     * @returns {Array<string>} Array of usernames
     */
    extractUsernames() {
        const usernames = [];

        // Look for username links in timeline
        const usernameLinks = document.querySelectorAll('a[href^="/"]');
        
        usernameLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.includes('/status/') && !href.includes('/search')) {
                const match = href.match(/^\/([a-zA-Z0-9_]+)$/);
                if (match && match[1]) {
                    const username = match[1];
                    // Filter out common pages
                    if (!['home', 'explore', 'notifications', 'messages', 'compose'].includes(username)) {
                        usernames.push(username);
                    }
                }
            }
        });

        return [...new Set(usernames)];
    }

    /**
     * Get all collected usernames
     * @returns {Array<string>} Array of usernames
     */
    getUsers() {
        return Array.from(this.usernames);
    }

    /**
     * Clear collected usernames
     */
    clear() {
        this.usernames.clear();
    }

    /**
     * Check if scanning
     * @returns {boolean} Scanning status
     */
    isScanning() {
        return this.scanning;
    }
}

export default new Scanner();
