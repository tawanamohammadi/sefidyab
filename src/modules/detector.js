/**
 * سفید یاب | Sefid Yab - Anomaly Detector Module
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @license GPL-3.0
 */

import { CONFIG } from '../core/config.js';

/**
 * Anomaly detector for identifying suspicious patterns
 */
export class Detector {
    constructor() {
        this.threshold = CONFIG.THRESHOLDS.anomaly_score;
    }

    /**
     * Detect anomalies in user data
     * @param {Object} userData - User data to analyze
     * @returns {Object} Detection results
     */
    detect(userData) {
        const patterns = this.detectPatterns(userData);
        const status = this.determineStatus(patterns);

        return {
            username: userData.username,
            timestamp: Date.now(),
            patterns,
            status,
            anomaly_score: patterns.score,
            is_anomaly: patterns.score >= this.threshold
        };
    }

    /**
     * Detect suspicious patterns
     * @param {Object} userData - User data
     * @returns {Object} Pattern detection results
     */
    detectPatterns(userData) {
        const patterns = {
            direct_connection: false,
            iran_location: false,
            no_vpn: false,
            suspicious_timing: false,
            hidden_identity: false,
            count: 0,
            score: 0
        };

        // Check for Iranian location
        if (userData.location?.is_iran) {
            patterns.iran_location = true;
            patterns.count++;
            patterns.score += 0.3;
        }

        // Check for direct connection (no VPN indicators)
        if (userData.connection?.direct) {
            patterns.direct_connection = true;
            patterns.no_vpn = true;
            patterns.count++;
            patterns.score += 0.4;
        }

        // Check for hidden identity
        if (!userData.location?.detected || !userData.device?.detected) {
            patterns.hidden_identity = true;
            patterns.count++;
            patterns.score += 0.2;
        }

        // Check suspicious timing patterns
        if (userData.activity?.suspicious_hours) {
            patterns.suspicious_timing = true;
            patterns.count++;
            patterns.score += 0.1;
        }

        return patterns;
    }

    /**
     * Determine user status based on patterns
     * @param {Object} patterns - Detected patterns
     * @returns {string} Status classification
     */
    determineStatus(patterns) {
        // 🔴 Hidden Identity - Unknown/hidden information
        if (patterns.hidden_identity && patterns.count === 1) {
            return 'hidden';
        }

        // ⚠️ Anomaly (White SIM) - Direct connection from Iran
        if (patterns.iran_location && patterns.no_vpn && patterns.direct_connection) {
            return 'anomaly';
        }

        // 🛡️ Shield Active - VPN/Proxy detected
        if (!patterns.direct_connection || patterns.count === 0) {
            return 'shield';
        }

        // ✅ Safe - Direct connection but not from Iran
        if (patterns.direct_connection && !patterns.iran_location) {
            return 'safe';
        }

        // Default to hidden if unclear
        return 'hidden';
    }

    /**
     * Get status description
     * @param {string} status - Status code
     * @param {string} lang - Language (fa/en)
     * @returns {string} Status description
     */
    getStatusDescription(status, lang = 'fa') {
        const descriptions = {
            fa: {
                shield: '🛡️ سپر فعال (VPN/پروکسی)',
                safe: '✅ اتصال مستقیم امن',
                anomaly: '⚠️ ناهنجاری (سیم‌کارت سفید)',
                hidden: '🔴 هویت پنهان'
            },
            en: {
                shield: '🛡️ Shield Active (VPN/Proxy)',
                safe: '✅ Direct Safe Connection',
                anomaly: '⚠️ Anomaly (White SIM)',
                hidden: '🔴 Hidden Identity'
            }
        };

        return descriptions[lang]?.[status] || descriptions.en[status] || 'Unknown';
    }

    /**
     * Batch detect anomalies for multiple users
     * @param {Array<Object>} usersData - Array of user data
     * @returns {Array<Object>} Detection results
     */
    batchDetect(usersData) {
        return usersData.map(userData => this.detect(userData));
    }

    /**
     * Get anomaly statistics
     * @param {Array<Object>} detections - Detection results
     * @returns {Object} Statistics
     */
    getStatistics(detections) {
        const stats = {
            total: detections.length,
            shield: 0,
            safe: 0,
            anomaly: 0,
            hidden: 0
        };

        detections.forEach(detection => {
            if (stats[detection.status] !== undefined) {
                stats[detection.status]++;
            }
        });

        return stats;
    }

    /**
     * Set detection threshold
     * @param {number} threshold - New threshold (0-1)
     */
    setThreshold(threshold) {
        if (threshold >= 0 && threshold <= 1) {
            this.threshold = threshold;
        }
    }
}

export default new Detector();
