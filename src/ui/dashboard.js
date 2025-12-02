/**
 * سفید یاب | Sefid Yab - Dashboard UI Component
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @license GPL-3.0
 */

import { CONFIG } from '../core/config.js';
import tracker from '../modules/tracker.js';

/**
 * Dashboard UI component for displaying results
 */
export class Dashboard {
    constructor() {
        this.visible = false;
        this.element = null;
        this.currentLang = 'fa';
    }

    /**
     * Create dashboard element
     * @returns {HTMLElement} Dashboard element
     */
    create() {
        if (this.element) {
            return this.element;
        }

        const dashboard = document.createElement('div');
        dashboard.id = 'sefidyab-dashboard';
        dashboard.innerHTML = `
            <div id="sefidyab-header">
                <h1>${CONFIG.NAME_FA}</h1>
                <p>${CONFIG.TAGLINE_FA}</p>
            </div>
            <div id="sefidyab-controls">
                <button id="sefidyab-scan-btn" class="sefidyab-btn">
                    <span id="sefidyab-scan-text">اسکن</span>
                </button>
                <button id="sefidyab-export-btn" class="sefidyab-btn">خروجی</button>
                <button id="sefidyab-clear-btn" class="sefidyab-btn">پاک کردن</button>
            </div>
            <div id="sefidyab-stats">
                <div class="stat-item">
                    <span class="stat-label">کل:</span>
                    <span class="stat-value" id="stat-total">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">⚠️ ناهنجاری:</span>
                    <span class="stat-value" id="stat-anomaly">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">🛡️ سپر:</span>
                    <span class="stat-value" id="stat-shield">0</span>
                </div>
            </div>
            <div id="sefidyab-content">
                <div id="sefidyab-results"></div>
            </div>
        `;

        this.element = dashboard;
        this.attachEventListeners();

        return dashboard;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        const scanBtn = this.element.querySelector('#sefidyab-scan-btn');
        const exportBtn = this.element.querySelector('#sefidyab-export-btn');
        const clearBtn = this.element.querySelector('#sefidyab-clear-btn');

        scanBtn?.addEventListener('click', () => this.handleScan());
        exportBtn?.addEventListener('click', () => this.handleExport());
        clearBtn?.addEventListener('click', () => this.handleClear());
    }

    /**
     * Handle scan button click
     */
    handleScan() {
        const scanBtn = this.element.querySelector('#sefidyab-scan-btn');
        const scanText = this.element.querySelector('#sefidyab-scan-text');

        if (tracker.isTracking()) {
            tracker.stop();
            scanText.textContent = 'اسکن';
            scanBtn.classList.remove('scanning');
        } else {
            tracker.start();
            scanText.textContent = 'توقف';
            scanBtn.classList.add('scanning');

            // Add listener for new results
            tracker.addListener((result) => {
                this.addResult(result);
                this.updateStats();
            });
        }
    }

    /**
     * Handle export button click
     */
    handleExport() {
        const data = tracker.export();
        
        // Create download link
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sefidyab_export_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Handle clear button click
     */
    handleClear() {
        if (confirm('پاک کردن همه نتایج؟')) {
            tracker.clear();
            this.clearResults();
            this.updateStats();
        }
    }

    /**
     * Add result to display
     * @param {Object} result - Result data
     */
    addResult(result) {
        const resultsContainer = this.element.querySelector('#sefidyab-results');
        if (!resultsContainer) return;

        const resultElement = document.createElement('div');
        resultElement.className = `result-item status-${result.detection.status}`;
        resultElement.innerHTML = `
            <div class="result-header">
                <span class="username">@${result.username}</span>
                <span class="status-icon">${this.getStatusIcon(result.detection.status)}</span>
            </div>
            <div class="result-details">
                <span class="score">امتیاز: ${(result.detection.anomaly_score * 100).toFixed(0)}%</span>
            </div>
        `;

        resultsContainer.insertBefore(resultElement, resultsContainer.firstChild);
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

    /**
     * Update statistics
     */
    updateStats() {
        const stats = tracker.getStatistics();

        const totalEl = this.element.querySelector('#stat-total');
        const anomalyEl = this.element.querySelector('#stat-anomaly');
        const shieldEl = this.element.querySelector('#stat-shield');

        if (totalEl) totalEl.textContent = stats.total;
        if (anomalyEl) anomalyEl.textContent = stats.anomaly;
        if (shieldEl) shieldEl.textContent = stats.shield;
    }

    /**
     * Clear results display
     */
    clearResults() {
        const resultsContainer = this.element.querySelector('#sefidyab-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
        }
    }

    /**
     * Show dashboard
     */
    show() {
        if (!this.element) {
            this.create();
            document.body.appendChild(this.element);
        }
        this.element.style.display = 'block';
        this.visible = true;
    }

    /**
     * Hide dashboard
     */
    hide() {
        if (this.element) {
            this.element.style.display = 'none';
        }
        this.visible = false;
    }

    /**
     * Toggle dashboard visibility
     */
    toggle() {
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * Remove dashboard
     */
    remove() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
            this.element = null;
            this.visible = false;
        }
    }

    /**
     * Set language
     * @param {string} lang - Language code (fa/en)
     */
    setLanguage(lang) {
        this.currentLang = lang;
        // Update UI text based on language
        // This would update all text elements
    }
}

export default new Dashboard();
