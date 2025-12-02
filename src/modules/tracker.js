/**
 * سفید یاب | Sefid Yab - Auto Tracker Module
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @license GPL-3.0
 */

import { CONFIG } from '../core/config.js';
import scanner from './scanner.js';
import forensics from './forensics.js';
import detector from './detector.js';

/**
 * Auto tracker for continuous monitoring and analysis
 */
export class Tracker {
    constructor() {
        this.tracking = false;
        this.results = [];
        this.listeners = [];
    }

    /**
     * Start auto tracking
     */
    start() {
        if (this.tracking) {
            console.log('Tracker already running');
            return;
        }

        this.tracking = true;
        console.log('Tracker started');

        // Start scanner with callback
        scanner.start((username) => {
            this.processUser(username);
        });
    }

    /**
     * Stop auto tracking
     */
    stop() {
        this.tracking = false;
        scanner.stop();
        console.log('Tracker stopped');
    }

    /**
     * Process a discovered user
     * @param {string} username - Twitter username
     */
    async processUser(username) {
        try {
            // Perform forensic analysis
            const forensicData = await forensics.analyze(username);
            
            if (!forensicData) {
                return;
            }

            // Detect anomalies
            const detection = detector.detect(forensicData);

            // Store result
            const result = {
                username,
                timestamp: Date.now(),
                forensics: forensicData,
                detection
            };

            this.results.push(result);

            // Notify listeners
            this.notifyListeners(result);

        } catch (error) {
            console.error('Tracker process error:', error);
        }
    }

    /**
     * Add event listener
     * @param {Function} callback - Callback function
     */
    addListener(callback) {
        if (typeof callback === 'function') {
            this.listeners.push(callback);
        }
    }

    /**
     * Remove event listener
     * @param {Function} callback - Callback function
     */
    removeListener(callback) {
        const index = this.listeners.indexOf(callback);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }

    /**
     * Notify all listeners
     * @param {Object} result - Processing result
     */
    notifyListeners(result) {
        this.listeners.forEach(listener => {
            try {
                listener(result);
            } catch (error) {
                console.error('Listener error:', error);
            }
        });
    }

    /**
     * Get all tracked results
     * @returns {Array<Object>} Tracking results
     */
    getResults() {
        return this.results;
    }

    /**
     * Get results by status
     * @param {string} status - Status filter
     * @returns {Array<Object>} Filtered results
     */
    getResultsByStatus(status) {
        return this.results.filter(result => 
            result.detection?.status === status
        );
    }

    /**
     * Get anomaly results only
     * @returns {Array<Object>} Anomaly results
     */
    getAnomalies() {
        return this.getResultsByStatus('anomaly');
    }

    /**
     * Clear all results
     */
    clear() {
        this.results = [];
    }

    /**
     * Export results to JSON
     * @returns {string} JSON string
     */
    export() {
        return JSON.stringify({
            timestamp: Date.now(),
            version: CONFIG.VERSION,
            total: this.results.length,
            results: this.results
        }, null, 2);
    }

    /**
     * Get tracking statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const detections = this.results.map(r => r.detection);
        const stats = detector.getStatistics(detections);

        return {
            ...stats,
            tracking: this.tracking,
            start_time: this.startTime,
            duration: this.startTime ? Date.now() - this.startTime : 0
        };
    }

    /**
     * Check if tracking
     * @returns {boolean} Tracking status
     */
    isTracking() {
        return this.tracking;
    }
}

export default new Tracker();
