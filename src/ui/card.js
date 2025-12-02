/**
 * سفید یاب | Sefid Yab - User Card Component
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @license GPL-3.0
 */

import { CONFIG } from '../core/config.js';
import detector from '../modules/detector.js';

/**
 * User card UI component for displaying user information
 */
export class Card {
    constructor() {
        this.cards = new Map();
    }

    /**
     * Sanitize username to prevent XSS
     * @param {string} username - Raw username
     * @returns {string} Sanitized username
     */
    sanitizeUsername(username) {
        // Only allow alphanumeric and underscore characters
        return String(username).replace(/[^a-zA-Z0-9_]/g, '');
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Create a user card
     * @param {Object} userData - User data
     * @returns {HTMLElement} Card element
     */
    create(userData) {
        const card = document.createElement('div');
        card.className = 'sefidyab-card';
        card.dataset.username = userData.username;

        // Add status class
        if (userData.detection?.status) {
            card.classList.add(`status-${userData.detection.status}`);
        }

        card.innerHTML = this.getCardHTML(userData);

        // Attach event listener for link button
        const linkBtn = card.querySelector('.card-btn');
        if (linkBtn) {
            linkBtn.addEventListener('click', () => {
                const username = this.sanitizeUsername(linkBtn.dataset.username);
                window.open(`https://x.com/${username}`, '_blank');
            });
        }

        this.cards.set(userData.username, card);

        return card;
    }

    /**
     * Get card HTML
     * @param {Object} userData - User data
     * @returns {string} HTML string
     */
    getCardHTML(userData) {
        const status = userData.detection?.status || 'hidden';
        const statusText = detector.getStatusDescription(status, 'fa');
        const score = userData.detection?.anomaly_score || 0;
        const safeUsername = this.sanitizeUsername(userData.username);
        const escapedUsername = this.escapeHtml(safeUsername);

        return `
            <div class="card-header">
                <div class="card-avatar">
                    <img src="https://unavatar.io/twitter/${escapedUsername}" 
                         alt="${escapedUsername}"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2248%22%3E%3Crect fill=%22%23${this.getColorForUsername(escapedUsername)}%22 width=%2248%22 height=%2248%22/%3E%3C/svg%3E'">
                </div>
                <div class="card-info">
                    <div class="card-username">@${escapedUsername}</div>
                    <div class="card-status">${this.escapeHtml(statusText)}</div>
                </div>
                <div class="card-actions">
                    <button class="card-btn" data-username="${escapedUsername}">
                        🔗
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="card-score">
                    <div class="score-label">امتیاز ریسک</div>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${score * 100}%"></div>
                    </div>
                    <div class="score-value">${(score * 100).toFixed(0)}%</div>
                </div>
                ${this.getDetailsHTML(userData)}
            </div>
            <div class="card-footer">
                <span class="card-timestamp">${this.formatTimestamp(userData.timestamp)}</span>
            </div>
        `;
    }

    /**
     * Get details HTML
     * @param {Object} userData - User data
     * @returns {string} HTML string
     */
    getDetailsHTML(userData) {
        const details = [];

        if (userData.forensics?.location?.detected) {
            details.push(`
                <div class="detail-item">
                    <span class="detail-icon">📍</span>
                    <span class="detail-text">${userData.forensics.location.location}</span>
                </div>
            `);
        }

        if (userData.forensics?.device?.detected) {
            details.push(`
                <div class="detail-item">
                    <span class="detail-icon">📱</span>
                    <span class="detail-text">${userData.forensics.device.type}</span>
                </div>
            `);
        }

        if (userData.forensics?.account_age?.detected) {
            details.push(`
                <div class="detail-item">
                    <span class="detail-icon">📅</span>
                    <span class="detail-text">${userData.forensics.account_age.days} روز</span>
                </div>
            `);
        }

        return details.length > 0 
            ? `<div class="card-details">${details.join('')}</div>` 
            : '';
    }

    /**
     * Format timestamp
     * @param {number} timestamp - Unix timestamp
     * @returns {string} Formatted date
     */
    formatTimestamp(timestamp) {
        if (!timestamp) return '';

        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        // Less than 1 minute
        if (diff < 60000) {
            return 'همین الان';
        }

        // Less than 1 hour
        if (diff < 3600000) {
            const minutes = Math.floor(diff / 60000);
            return `${minutes} دقیقه پیش`;
        }

        // Less than 24 hours
        if (diff < 86400000) {
            const hours = Math.floor(diff / 3600000);
            return `${hours} ساعت پیش`;
        }

        // Default format
        return date.toLocaleDateString('fa-IR');
    }

    /**
     * Get color for username (for avatar fallback)
     * @param {string} username - Username
     * @returns {string} Hex color without #
     */
    getColorForUsername(username) {
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const color = Math.abs(hash).toString(16).substring(0, 6).padEnd(6, '0');
        return color;
    }

    /**
     * Update card
     * @param {string} username - Username
     * @param {Object} userData - Updated user data
     */
    update(username, userData) {
        const card = this.cards.get(username);
        if (card) {
            card.innerHTML = this.getCardHTML(userData);
            
            // Update status class
            card.className = 'sefidyab-card';
            if (userData.detection?.status) {
                card.classList.add(`status-${userData.detection.status}`);
            }
        }
    }

    /**
     * Remove card
     * @param {string} username - Username
     */
    remove(username) {
        const card = this.cards.get(username);
        if (card && card.parentNode) {
            card.parentNode.removeChild(card);
            this.cards.delete(username);
        }
    }

    /**
     * Get card by username
     * @param {string} username - Username
     * @returns {HTMLElement|null} Card element
     */
    get(username) {
        return this.cards.get(username) || null;
    }

    /**
     * Clear all cards
     */
    clear() {
        this.cards.forEach(card => {
            if (card.parentNode) {
                card.parentNode.removeChild(card);
            }
        });
        this.cards.clear();
    }

    /**
     * Create compact card (for list view)
     * @param {Object} userData - User data
     * @returns {HTMLElement} Compact card element
     */
    createCompact(userData) {
        const card = document.createElement('div');
        card.className = 'sefidyab-card-compact';
        const safeUsername = this.sanitizeUsername(userData.username);
        const escapedUsername = this.escapeHtml(safeUsername);
        card.dataset.username = safeUsername;

        const status = userData.detection?.status || 'hidden';
        card.classList.add(`status-${status}`);

        card.innerHTML = `
            <span class="compact-icon">${this.getStatusIcon(status)}</span>
            <span class="compact-username">@${escapedUsername}</span>
            <span class="compact-score">${((userData.detection?.anomaly_score || 0) * 100).toFixed(0)}%</span>
        `;

        return card;
    }

    /**
     * Get status icon
     * @param {string} status - Status code
     * @returns {string} Status icon
     */
    getStatusIcon(status) {
        const icons = {
            shield: '🛡️',
            safe: '✅',
            anomaly: '⚠️',
            hidden: '🔴'
        };
        return icons[status] || '❓';
    }
}

export default new Card();
