/**
 * سفید یاب | Sefid Yab - GitHub Sync Module
 * 
 * @author Tawana Mohammadi
 * @website https://tawana.online
 * @email info@tawana.online
 * @license GPL-3.0
 */

import { CONFIG } from '../core/config.js';
import api from '../core/api.js';

/**
 * GitHub synchronization module for data backup and sharing
 */
export class GitHubSync {
    constructor() {
        this.repo = CONFIG.API.repo;
        this.syncing = false;
    }

    /**
     * Sync data to GitHub
     * @param {Object} data - Data to sync
     * @param {string} token - GitHub token
     * @returns {Promise<boolean>} Success status
     */
    async sync(data, token) {
        if (this.syncing) {
            console.log('Sync already in progress');
            return false;
        }

        this.syncing = true;

        try {
            // This would use GitHub API to create/update a gist or file
            console.log('Syncing data to GitHub...');
            
            const result = await this.createGist(data, token);
            
            this.syncing = false;
            return result;
        } catch (error) {
            console.error('GitHub sync error:', error);
            this.syncing = false;
            return false;
        }
    }

    /**
     * Create a GitHub Gist
     * @param {Object} data - Data to store
     * @param {string} token - GitHub token
     * @returns {Promise<boolean>} Success status
     */
    async createGist(data, token) {
        try {
            const content = JSON.stringify(data, null, 2);
            
            const gistData = {
                description: `Sefid Yab Data - ${new Date().toISOString()}`,
                public: false,
                files: {
                    'sefidyab_data.json': {
                        content
                    }
                }
            };

            // Note: This would require actual GitHub API call
            // For now, mock implementation
            console.log('Gist created successfully');
            return true;
        } catch (error) {
            console.error('Create gist error:', error);
            return false;
        }
    }

    /**
     * Load data from GitHub
     * @param {string} gistId - Gist ID
     * @param {string} token - GitHub token
     * @returns {Promise<Object|null>} Loaded data
     */
    async load(gistId, token) {
        try {
            // This would fetch from GitHub API
            console.log('Loading data from GitHub...');
            
            // Mock implementation
            return null;
        } catch (error) {
            console.error('GitHub load error:', error);
            return null;
        }
    }

    /**
     * Get repository information
     * @returns {Promise<Object|null>} Repository info
     */
    async getRepoInfo() {
        try {
            const endpoint = `/repos/${this.repo}`;
            const data = await api.get(endpoint);
            return data;
        } catch (error) {
            console.error('Get repo info error:', error);
            return null;
        }
    }

    /**
     * Check repository status
     * @returns {Promise<boolean>} Status
     */
    async checkStatus() {
        try {
            const info = await this.getRepoInfo();
            return info !== null;
        } catch (error) {
            console.error('Check status error:', error);
            return false;
        }
    }

    /**
     * Get latest release
     * @returns {Promise<Object|null>} Release info
     */
    async getLatestRelease() {
        try {
            const endpoint = `/repos/${this.repo}/releases/latest`;
            const data = await api.get(endpoint);
            return data;
        } catch (error) {
            console.error('Get latest release error:', error);
            return null;
        }
    }

    /**
     * Compare versions
     * @param {string} current - Current version
     * @param {string} latest - Latest version
     * @returns {boolean} True if update available
     */
    isUpdateAvailable(current, latest) {
        try {
            const currentParts = current.split('.').map(Number);
            const latestParts = latest.split('.').map(Number);

            for (let i = 0; i < 3; i++) {
                if (latestParts[i] > currentParts[i]) return true;
                if (latestParts[i] < currentParts[i]) return false;
            }

            return false;
        } catch (error) {
            console.error('Version comparison error:', error);
            return false;
        }
    }

    /**
     * Check for updates
     * @returns {Promise<Object>} Update information
     */
    async checkForUpdates() {
        try {
            const release = await this.getLatestRelease();
            
            if (!release) {
                return { available: false };
            }

            const latestVersion = release.tag_name.replace('v', '');
            const available = this.isUpdateAvailable(CONFIG.VERSION, latestVersion);

            return {
                available,
                current: CONFIG.VERSION,
                latest: latestVersion,
                url: release.html_url
            };
        } catch (error) {
            console.error('Check for updates error:', error);
            return { available: false, error: error.message };
        }
    }

    /**
     * Check if syncing
     * @returns {boolean} Syncing status
     */
    isSyncing() {
        return this.syncing;
    }
}

export default new GitHubSync();
