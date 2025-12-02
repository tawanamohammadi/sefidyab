/**
 * سفید یاب | Sefid Yab - CSS Styles Module
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @license GPL-3.0
 */

import { CONFIG } from '../core/config.js';

/**
 * CSS styles as JavaScript module
 */
export const STYLES = `
/* ═══════════════════════════════════════════════════════════
   Dashboard Styles
   ═══════════════════════════════════════════════════════════ */

#sefidyab-dashboard {
    position: fixed;
    top: 80px;
    right: 20px;
    width: 320px;
    background: ${CONFIG.COLORS.dark};
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    z-index: 9999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: ${CONFIG.COLORS.light};
    direction: rtl;
    overflow: hidden;
}

#sefidyab-header {
    background: linear-gradient(135deg, ${CONFIG.COLORS.primary}, ${CONFIG.COLORS.warning});
    padding: 16px;
    text-align: center;
}

#sefidyab-header h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: ${CONFIG.COLORS.light};
}

#sefidyab-header p {
    margin: 4px 0 0;
    font-size: 12px;
    opacity: 0.9;
    color: ${CONFIG.COLORS.light};
}

#sefidyab-controls {
    display: flex;
    gap: 8px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
}

.sefidyab-btn {
    flex: 1;
    background: ${CONFIG.COLORS.primary};
    color: ${CONFIG.COLORS.light};
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.sefidyab-btn:hover {
    background: ${CONFIG.COLORS.warning};
    transform: translateY(-2px);
}

.sefidyab-btn:active {
    transform: translateY(0);
}

.sefidyab-btn.scanning {
    background: ${CONFIG.COLORS.danger};
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

#sefidyab-stats {
    display: flex;
    gap: 8px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
}

.stat-item {
    flex: 1;
    text-align: center;
    padding: 8px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
}

.stat-label {
    display: block;
    font-size: 11px;
    opacity: 0.7;
    margin-bottom: 4px;
}

.stat-value {
    display: block;
    font-size: 18px;
    font-weight: 700;
    color: ${CONFIG.COLORS.primary};
}

#sefidyab-content {
    padding: 12px;
    max-height: 400px;
    overflow-y: auto;
}

#sefidyab-content::-webkit-scrollbar {
    width: 6px;
}

#sefidyab-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
}

#sefidyab-content::-webkit-scrollbar-thumb {
    background: ${CONFIG.COLORS.primary};
    border-radius: 3px;
}

#sefidyab-results {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

/* ═══════════════════════════════════════════════════════════
   Result Item Styles
   ═══════════════════════════════════════════════════════════ */

.result-item {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 12px;
    border-left: 4px solid ${CONFIG.COLORS.gray};
    transition: all 0.3s ease;
}

.result-item:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(-4px);
}

.result-item.status-anomaly {
    border-left-color: ${CONFIG.COLORS.warning};
}

.result-item.status-shield {
    border-left-color: ${CONFIG.COLORS.success};
}

.result-item.status-safe {
    border-left-color: ${CONFIG.COLORS.primary};
}

.result-item.status-hidden {
    border-left-color: ${CONFIG.COLORS.danger};
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.username {
    font-weight: 600;
    font-size: 14px;
}

.status-icon {
    font-size: 18px;
}

.result-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    opacity: 0.8;
}

.score {
    color: ${CONFIG.COLORS.warning};
    font-weight: 600;
}

/* ═══════════════════════════════════════════════════════════
   Card Styles
   ═══════════════════════════════════════════════════════════ */

.sefidyab-card {
    background: ${CONFIG.COLORS.dark};
    border-radius: 12px;
    padding: 16px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.sefidyab-card:hover {
    border-color: ${CONFIG.COLORS.primary};
    box-shadow: 0 4px 16px rgba(29, 155, 240, 0.3);
}

.sefidyab-card.status-anomaly {
    border-color: ${CONFIG.COLORS.warning};
}

.sefidyab-card.status-shield {
    border-color: ${CONFIG.COLORS.success};
}

.sefidyab-card.status-safe {
    border-color: ${CONFIG.COLORS.primary};
}

.sefidyab-card.status-hidden {
    border-color: ${CONFIG.COLORS.danger};
}

.card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
}

.card-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-info {
    flex: 1;
}

.card-username {
    font-weight: 700;
    font-size: 16px;
    color: ${CONFIG.COLORS.light};
}

.card-status {
    font-size: 12px;
    opacity: 0.8;
    margin-top: 2px;
}

.card-actions {
    display: flex;
    gap: 4px;
}

.card-btn {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
}

.card-btn:hover {
    background: ${CONFIG.COLORS.primary};
}

.card-body {
    margin: 12px 0;
}

.card-score {
    margin-bottom: 12px;
}

.score-label {
    font-size: 12px;
    opacity: 0.7;
    margin-bottom: 4px;
}

.score-bar {
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
    margin: 4px 0;
}

.score-fill {
    height: 100%;
    background: linear-gradient(90deg, ${CONFIG.COLORS.success}, ${CONFIG.COLORS.warning}, ${CONFIG.COLORS.danger});
    transition: width 0.5s ease;
}

.score-value {
    font-size: 14px;
    font-weight: 700;
    color: ${CONFIG.COLORS.warning};
}

.card-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
}

.detail-icon {
    font-size: 16px;
}

.detail-text {
    opacity: 0.8;
}

.card-footer {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 11px;
    opacity: 0.6;
    text-align: left;
    direction: ltr;
}

.card-timestamp {
    display: inline-block;
}

/* ═══════════════════════════════════════════════════════════
   Compact Card Styles
   ═══════════════════════════════════════════════════════════ */

.sefidyab-card-compact {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border-left: 3px solid ${CONFIG.COLORS.gray};
    transition: all 0.3s ease;
}

.sefidyab-card-compact:hover {
    background: rgba(255, 255, 255, 0.08);
}

.sefidyab-card-compact.status-anomaly {
    border-left-color: ${CONFIG.COLORS.warning};
}

.sefidyab-card-compact.status-shield {
    border-left-color: ${CONFIG.COLORS.success};
}

.sefidyab-card-compact.status-safe {
    border-left-color: ${CONFIG.COLORS.primary};
}

.sefidyab-card-compact.status-hidden {
    border-left-color: ${CONFIG.COLORS.danger};
}

.compact-icon {
    font-size: 16px;
}

.compact-username {
    flex: 1;
    font-size: 13px;
    font-weight: 600;
}

.compact-score {
    font-size: 12px;
    font-weight: 700;
    color: ${CONFIG.COLORS.warning};
}

/* ═══════════════════════════════════════════════════════════
   Animations
   ═══════════════════════════════════════════════════════════ */

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.slide-in {
    animation: slideIn 0.3s ease;
}

.fade-in {
    animation: fadeIn 0.3s ease;
}

/* ═══════════════════════════════════════════════════════════
   Responsive
   ═══════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
    #sefidyab-dashboard {
        width: calc(100% - 40px);
        right: 20px;
        left: 20px;
    }
}
`;

/**
 * Inject styles into page
 */
export function injectStyles() {
    const styleId = 'sefidyab-styles';
    
    // Remove existing styles if any
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
        existingStyle.remove();
    }

    // Create and inject new style element
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = STYLES;
    document.head.appendChild(style);
}

/**
 * Remove styles from page
 */
export function removeStyles() {
    const styleId = 'sefidyab-styles';
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
        existingStyle.remove();
    }
}

export default {
    STYLES,
    injectStyles,
    removeStyles
};
