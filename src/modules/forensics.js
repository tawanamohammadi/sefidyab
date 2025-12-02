/**
 * سفید یاب | Sefid Yab - Profile Forensics Module
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @license GPL-3.0
 */

import { CONFIG } from '../core/config.js';
import api from '../core/api.js';

/**
 * Profile forensics analyzer for deep user analysis
 */
export class Forensics {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Analyze user profile
     * @param {string} username - Twitter username
     * @returns {Promise<Object>} Analysis results
     */
    async analyze(username) {
        // Check cache first
        if (this.cache.has(username)) {
            return this.cache.get(username);
        }

        try {
            const profile = await this.fetchProfile(username);
            const analysis = this.performAnalysis(profile);
            
            // Cache results
            this.cache.set(username, analysis);
            
            return analysis;
        } catch (error) {
            console.error('Forensics analysis error:', error);
            return null;
        }
    }

    /**
     * Fetch user profile data
     * @param {string} username - Twitter username
     * @returns {Promise<Object>} Profile data
     */
    async fetchProfile(username) {
        // This would scrape or call X/Twitter API
        // For now, return mock structure
        return {
            username,
            location: null,
            created_at: null,
            device: null,
            verified: false,
            followers_count: 0,
            following_count: 0,
            tweet_count: 0
        };
    }

    /**
     * Perform deep analysis on profile
     * @param {Object} profile - Profile data
     * @returns {Object} Analysis results
     */
    performAnalysis(profile) {
        const analysis = {
            username: profile.username,
            timestamp: Date.now(),
            location: this.analyzeLocation(profile.location),
            account_age: this.analyzeAccountAge(profile.created_at),
            device: this.analyzeDevice(profile.device),
            behavior: this.analyzeBehavior(profile),
            risk_score: 0
        };

        // Calculate risk score
        analysis.risk_score = this.calculateRiskScore(analysis);

        return analysis;
    }

    /**
     * Analyze location data
     * @param {string} location - Location string
     * @returns {Object} Location analysis
     */
    analyzeLocation(location) {
        if (!location) {
            return { detected: false, suspicious: false };
        }

        // Check for Iranian locations
        const iranKeywords = ['iran', 'tehran', 'تهران', 'ایران'];
        const isIran = iranKeywords.some(keyword => 
            location.toLowerCase().includes(keyword)
        );

        return {
            detected: true,
            location,
            is_iran: isIran,
            suspicious: isIran
        };
    }

    /**
     * Analyze account age
     * @param {string} created_at - Account creation date
     * @returns {Object} Account age analysis
     */
    analyzeAccountAge(created_at) {
        if (!created_at) {
            return { detected: false, days: null };
        }

        const created = new Date(created_at);
        const now = new Date();
        const days = Math.floor((now - created) / (1000 * 60 * 60 * 24));

        return {
            detected: true,
            days,
            created_at,
            is_new: days < CONFIG.THRESHOLDS.min_account_age
        };
    }

    /**
     * Analyze device information
     * @param {string} device - Device string
     * @returns {Object} Device analysis
     */
    analyzeDevice(device) {
        if (!device) {
            return { detected: false };
        }

        return {
            detected: true,
            device,
            type: this.detectDeviceType(device)
        };
    }

    /**
     * Detect device type
     * @param {string} device - Device string
     * @returns {string} Device type
     */
    detectDeviceType(device) {
        const lower = device.toLowerCase();
        if (lower.includes('iphone') || lower.includes('ipad')) return 'iOS';
        if (lower.includes('android')) return 'Android';
        if (lower.includes('web')) return 'Web';
        return 'Unknown';
    }

    /**
     * Analyze user behavior patterns
     * @param {Object} profile - Profile data
     * @returns {Object} Behavior analysis
     */
    analyzeBehavior(profile) {
        const ratio = profile.followers_count > 0 
            ? profile.following_count / profile.followers_count 
            : 0;

        return {
            follower_ratio: ratio,
            is_suspicious: ratio > 10 || ratio < 0.1,
            tweet_frequency: profile.tweet_count
        };
    }

    /**
     * Calculate overall risk score
     * @param {Object} analysis - Analysis data
     * @returns {number} Risk score (0-1)
     */
    calculateRiskScore(analysis) {
        let score = 0;

        if (analysis.location?.suspicious) score += 0.3;
        if (analysis.account_age?.is_new) score += 0.2;
        if (analysis.behavior?.is_suspicious) score += 0.3;
        if (!analysis.location?.detected) score += 0.2;

        return Math.min(score, 1);
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
    }
}

export default new Forensics();
