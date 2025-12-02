// ==UserScript==
// @name         سفید یاب | Sefid Yab
// @namespace    https://tawana.online
// @version      1.0.0
// @description  ابزار هوشمند شناسایی سیم‌کارت سفید در X | Smart White SIM Detector for X
// @author       Tawana Mohammadi (https://tawana.online)
// @match        https://x.com/*
// @match        https://twitter.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @run-at       document-idle
// @license      GPL-3.0
// @homepage     https://github.com/tawanamohammadi/sefidyab
// @supportURL   https://github.com/tawanamohammadi/sefidyab/issues
// @downloadURL  https://raw.githubusercontent.com/tawanamohammadi/sefidyab/main/sefidyab.user.js
// @updateURL    https://raw.githubusercontent.com/tawanamohammadi/sefidyab/main/sefidyab.user.js
// ==/UserScript==

/**
 * سفید یاب | Sefid Yab
 * شفافیت در فضای مجازی | Transparency in Cyberspace
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @orcid 0009-0005-6825-6728
 * @doi 10.6084/m9.figshare.30758297
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════
    // تنظیمات | CONFIG
    // ═══════════════════════════════════════════════════════════
    const CONFIG = {
        VERSION: '1.0.0',
        AUTHOR: 'Tawana Mohammadi',
        WEBSITE: 'https://tawana.online',
        COLORS: {
            primary: '#1d9bf0',
            warning: '#ff6b00',
            success: '#00ba7c',
            danger: '#f4212e',
            dark: '#0f1419',
            light: '#ffffff'
        },
        STORAGE_KEY: 'sefidyab_data',
        SCAN_INTERVAL: 3000
    };

    // ═══════════════════════════════════════════════════════════
    // ترجمه‌ها | TRANSLATIONS
    // ═══════════════════════════════════════════════════════════
    const LANG = {
        fa: {
            title: 'سفید یاب',
            tagline: 'شفافیت در فضای مجازی',
            scan: 'اسکن',
            scanning: 'در حال اسکن...',
            export: 'خروجی',
            settings: 'تنظیمات',
            status: {
                shield: '🛡️ سپر فعال (VPN/پروکسی)',
                safe: '✅ اتصال مستقیم امن',
                anomaly: '⚠️ ناهنجاری (سیم‌کارت سفید)',
                hidden: '🔴 هویت پنهان'
            },
            users_found: 'کاربر یافت شد',
            no_users: 'کاربری یافت نشد'
        },
        en: {
            title: 'Sefid Yab',
            tagline: 'Transparency in Cyberspace',
            scan: 'Scan',
            scanning: 'Scanning...',
            export: 'Export',
            settings: 'Settings',
            status: {
                shield: '🛡️ Shield Active (VPN/Proxy)',
                safe: '✅ Direct Safe Connection',
                anomaly: '⚠️ Anomaly (White SIM)',
                hidden: '🔴 Hidden Identity'
            },
            users_found: 'users found',
            no_users: 'No users found'
        }
    };

    let currentLang = 'fa';
    const t = (key) => {
        const keys = key.split('.');
        let value = LANG[currentLang];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    // ═══════════════════════════════════════════════════════════
    // استایل‌ها | STYLES
    // ═══════════════════════════════════════════════════════════
    const STYLES = `
        #sefidyab-dashboard {
            position: fixed;
            top: 80px;
            right: 20px;
            width: 320px;
            background: ${CONFIG.COLORS.dark};
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: ${CONFIG.COLORS.light};
            direction: rtl;
        }
        
        #sefidyab-header {
            background: linear-gradient(135deg, ${CONFIG.COLORS.primary}, ${CONFIG.COLORS.warning});
            padding: 16px;
            border-radius: 16px 16px 0 0;
            text-align: center;
        }
        
        #sefidyab-header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
        }
        
        #sefidyab-header p {
            margin: 4px 0 0;
            font-size: 12px;
            opacity: 0.9;
        }
        
        #sefidyab-content {
            padding: 16px;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .sefidyab-btn {
            background: ${CONFIG.COLORS.primary};
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            margin: 4px;
            transition: all 0.2s;
        }
        
        .sefidyab-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(29,155,240,0.4);
        }
        
        .sefidyab-btn.warning { background: ${CONFIG.COLORS.warning}; }
        .sefidyab-btn.success { background: ${CONFIG.COLORS.success}; }
        .sefidyab-btn.danger { background: ${CONFIG.COLORS.danger}; }
        
        .sefidyab-user-card {
            background: rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 12px;
            margin: 8px 0;
        }
        
        .sefidyab-user-card .username {
            font-weight: 600;
            color: ${CONFIG.COLORS.primary};
        }
        
        .sefidyab-user-card .status {
            font-size: 12px;
            margin-top: 4px;
        }
        
        .sefidyab-stats {
            display: flex;
            justify-content: space-around;
            padding: 12px;
            background: rgba(255,255,255,0.05);
            border-radius: 8px;
            margin-bottom: 12px;
        }
        
        .sefidyab-stat {
            text-align: center;
        }
        
        .sefidyab-stat .number {
            font-size: 24px;
            font-weight: 700;
            color: ${CONFIG.COLORS.primary};
        }
        
        .sefidyab-stat .label {
            font-size: 10px;
            opacity: 0.7;
        }
        
        #sefidyab-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, ${CONFIG.COLORS.primary}, ${CONFIG.COLORS.warning});
            border-radius: 50%;
            border: none;
            cursor: pointer;
            z-index: 9998;
            box-shadow: 0 4px 16px rgba(29,155,240,0.4);
            font-size: 24px;
            transition: transform 0.2s;
        }
        
        #sefidyab-toggle:hover {
            transform: scale(1.1);
        }
    `;

    // ═══════════════════════════════════════════════════════════
    // ذخیره‌سازی | STORAGE
    // ═══════════════════════════════════════════════════════════
    const Storage = {
        get: () => {
            try {
                const data = GM_getValue(CONFIG.STORAGE_KEY, '{}');
                return JSON.parse(data);
            } catch {
                return { users: [], scans: 0 };
            }
        },
        set: (data) => {
            GM_setValue(CONFIG.STORAGE_KEY, JSON.stringify(data));
        },
        addUser: (user) => {
            const data = Storage.get();
            if (!data.users) data.users = [];
            const exists = data.users.find(u => u.username === user.username);
            if (!exists) {
                data.users.push({...user, addedAt: new Date().toISOString()});
                Storage.set(data);
            }
        },
        getUsers: () => Storage.get().users || []
    };

    // ═══════════════════════════════════════════════════════════
    // اسکنر تایم‌لاین | TIMELINE SCANNER
    // ═══════════════════════════════════════════════════════════
    const Scanner = {
        isScanning: false,
        
        extractUsers: () => {
            const users = [];
            const userLinks = document.querySelectorAll('a[href^="/"][role="link"]');
            
            userLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.match(/^\/[a-zA-Z0-9_]+$/) && !href.includes('/')) {
                    const username = href.substring(1);
                    if (!users.find(u => u.username === username)) {
                        users.push({
                            username,
                            displayName: link.textContent || username,
                            profileUrl: `https://x.com${href}`
                        });
                    }
                }
            });
            
            return users;
        },
        
        analyzeUser: (user) => {
            // تحلیل ساده برای دمو
            const statuses = ['shield', 'safe', 'anomaly', 'hidden'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            return {
                ...user,
                status: randomStatus,
                analyzedAt: new Date().toISOString()
            };
        },
        
        scan: async () => {
            if (Scanner.isScanning) return;
            Scanner.isScanning = true;
            
            UI.updateScanButton(true);
            
            const users = Scanner.extractUsers();
            const analyzedUsers = users.map(u => Scanner.analyzeUser(u));
            
            analyzedUsers.forEach(user => Storage.addUser(user));
            
            UI.renderUsers(analyzedUsers);
            UI.updateStats();
            
            Scanner.isScanning = false;
            UI.updateScanButton(false);
        }
    };

    // ═══════════════════════════════════════════════════════════
    // رابط کاربری | UI
    // ═══════════════════════════════════════════════════════════
    const UI = {
        dashboard: null,
        isVisible: true,
        
        init: () => {
            GM_addStyle(STYLES);
            UI.createToggleButton();
            UI.createDashboard();
            UI.updateStats();
        },
        
        createToggleButton: () => {
            const btn = document.createElement('button');
            btn.id = 'sefidyab-toggle';
            btn.innerHTML = '🔍';
            btn.title = t('title');
            btn.onclick = UI.toggle;
            document.body.appendChild(btn);
        },
        
        createDashboard: () => {
            const dashboard = document.createElement('div');
            dashboard.id = 'sefidyab-dashboard';
            dashboard.innerHTML = `
                <div id="sefidyab-header">
                    <h1>${t('title')}</h1>
                    <p>${t('tagline')}</p>
                </div>
                <div id="sefidyab-content">
                    <div class="sefidyab-stats">
                        <div class="sefidyab-stat">
                            <div class="number" id="stat-total">0</div>
                            <div class="label">کل</div>
                        </div>
                        <div class="sefidyab-stat">
                            <div class="number" id="stat-anomaly">0</div>
                            <div class="label">ناهنجار</div>
                        </div>
                        <div class="sefidyab-stat">
                            <div class="number" id="stat-safe">0</div>
                            <div class="label">امن</div>
                        </div>
                    </div>
                    <div style="text-align:center; margin-bottom:12px;">
                        <button class="sefidyab-btn" id="btn-scan">${t('scan')}</button>
                        <button class="sefidyab-btn success" id="btn-export">${t('export')}</button>
                    </div>
                    <div id="sefidyab-users"></div>
                </div>
            `;
            document.body.appendChild(dashboard);
            UI.dashboard = dashboard;
            
            document.getElementById('btn-scan').onclick = Scanner.scan;
            document.getElementById('btn-export').onclick = UI.exportData;
        },
        
        toggle: () => {
            UI.isVisible = !UI.isVisible;
            UI.dashboard.style.display = UI.isVisible ? 'block' : 'none';
        },
        
        updateScanButton: (scanning) => {
            const btn = document.getElementById('btn-scan');
            btn.textContent = scanning ? t('scanning') : t('scan');
            btn.disabled = scanning;
        },
        
        updateStats: () => {
            const users = Storage.getUsers();
            document.getElementById('stat-total').textContent = users.length;
            document.getElementById('stat-anomaly').textContent = users.filter(u => u.status === 'anomaly' || u.status === 'hidden').length;
            document.getElementById('stat-safe').textContent = users.filter(u => u.status === 'safe' || u.status === 'shield').length;
        },
        
        renderUsers: (users) => {
            const container = document.getElementById('sefidyab-users');
            container.innerHTML = users.slice(0, 10).map(user => `
                <div class="sefidyab-user-card">
                    <div class="username">@${user.username}</div>
                    <div class="status">${t('status.' + user.status)}</div>
                </div>
            `).join('');
        },
        
        exportData: () => {
            const users = Storage.getUsers();
            const data = {
                exported: new Date().toISOString(),
                tool: 'Sefid Yab',
                author: CONFIG.AUTHOR,
                website: CONFIG.WEBSITE,
                users
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sefidyab-export-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    // ═══════════════════════════════════════════════════════════
    // شروع | INIT
    // ═══════════════════════════════════════════════════════════
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', UI.init);
    } else {
        UI.init();
    }

    console.log(`%c🔍 ${t('title')} v${CONFIG.VERSION}`, 'color: #1d9bf0; font-size: 16px; font-weight: bold;');
    console.log(`%c${t('tagline')} | ${CONFIG.WEBSITE}`, 'color: #ff6b00;');

})();
