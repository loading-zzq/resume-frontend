export const CONFIG = {
    // 确保这里指向你后端的 FastAPI 地址
    API_BASE_URL: 'http://127.0.0.1:8000/api/v1',
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MESSAGES: {
        UPLOAD_ERROR: '载入失败，请检查连接或文件格式。',
        SAVE_SUCCESS: '✨ 数据节点已成功写入 FAISS 向量库。',
        NETWORK_ERR: '服务器失联，请检查后端引擎是否启动。'
    }
};