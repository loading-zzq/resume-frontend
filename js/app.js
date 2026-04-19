import { CONFIG } from './config.js';
import { Utils } from './utils.js';
import { API } from './api.js';

const { createApp, ref } = Vue;

createApp({
    setup() {
        // --- 核心导航控制 ---
        const currentView = ref('workspace'); // 可选值: workspace, library, matching, monitor

        // --- 视图 1：解析舱 (Workspace) ---
        const viewMode = ref('visual');
        const fileInput = ref(null);
        const selectedFile = ref(null);
        const isLoading = ref(false);
        const loadingMsg = ref('');
        const errorMessage = ref('');
        const resumeData = ref(null);

        const handleFileSelect = (e) => {
            const file = e.target.files[0];
            if (file) {
                if (file.size > CONFIG.MAX_FILE_SIZE) { errorMessage.value = '文件体积超出限制'; return; }
                selectedFile.value = file; errorMessage.value = '';
            }
        };

        const executeAnalysis = async () => {
            if (!selectedFile.value) return;
            isLoading.value = true;
            loadingMsg.value = '正在建立特征空间映射...';
            try {
                await Utils.sleep(800);
                loadingMsg.value = '抽取高维 JSON 张量...';
                const result = await API.uploadResume(selectedFile.value);
                if (result.status === 'success') { resumeData.value = result.data; }
                else { errorMessage.value = result.message || CONFIG.MESSAGES.UPLOAD_ERROR; }
            } catch (error) { errorMessage.value = error.message; }
            finally { isLoading.value = false; }
        };

        const confirmSave = () => {
            alert(CONFIG.MESSAGES.SAVE_SUCCESS);
            selectedFile.value = null; resumeData.value = null;
        };

        // --- 视图 2：检索库 (Library) ---
        const searchKeyword = ref('');
        const searchResults = ref([]);

        const executeSearch = async () => {
            if (!searchKeyword.value.trim()) return;
            try {
                const result = await API.searchCandidates(searchKeyword.value);
                searchResults.value = result.results || [];
            } catch (error) {
                alert('检索失败，请检查后端引擎连接。');
            }
        };

        // 暴露给 HTML 模板
        return {
            currentView,
            viewMode, fileInput, selectedFile, isLoading, loadingMsg, errorMessage, resumeData,
            handleFileSelect, executeAnalysis, confirmSave, formatJSON: Utils.formatJSON,
            searchKeyword, searchResults, executeSearch
        };
    }
}).mount('#app');