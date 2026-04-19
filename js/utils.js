export const Utils = {
    // 模拟等待延迟
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    // 格式化 JSON 代码用于展示
    formatJSON(obj) {
        return JSON.stringify(obj, null, 4);
    }
};