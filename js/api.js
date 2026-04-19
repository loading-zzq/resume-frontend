import { CONFIG } from './config.js';

// 注意这里是全大写的 API
export const API = {
    // 接口 1：上传解析
    async uploadResume(file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`${CONFIG.API_BASE_URL}/upload/`, { method: 'POST', body: formData });
        if (!res.ok) throw new Error(CONFIG.MESSAGES.NETWORK_ERR);
        return await res.json();
    },

    // 接口 2：FAISS 搜索
    async searchCandidates(keyword) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/match/?keyword=${encodeURIComponent(keyword)}`);
        if (!res.ok) throw new Error(CONFIG.MESSAGES.NETWORK_ERR);
        return await res.json();
    }
};