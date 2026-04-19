import os

def fix_ui_colors():
    print("🎨 开始执行浅色主题视觉融合...")
    
    # 精准替换字典：只替换冲突的标题和文本框，绝不误伤按钮
    replacements = {
        # 1. 修正 HTML 内联样式里的白色字体
        "color: #fff; margin-bottom: 4px;": "color: var(--text-main); margin-bottom: 4px;",
        "justify-content: space-between; color: #fff;": "justify-content: space-between; color: var(--text-main);",
        "font-size: 15px; color: #fff;": "font-size: 15px; color: var(--text-main);",
        
        # 2. 修正 CSS 类里的白色字体
        "color: #fff; font-size: 24px;": "color: var(--text-main); font-size: 24px;",  # section-title
        "color: #fff; margin-bottom: 6px;": "color: var(--text-main); margin-bottom: 6px;", # resume-meta h4
        "color: #fff; outline: none;": "color: var(--text-main); outline: none;", # 输入框文字
        
        # 3. 把突兀的深灰色背景，换成适配浅色主题的“透亮毛玻璃”
        "background: rgba(0,0,0,0.4);": "background: rgba(255, 255, 255, 0.6); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);",
        "border: 1px solid rgba(255,255,255,0.05);": "border: 1px solid rgba(255, 255, 255, 0.8);"
    }

    fixed_count = 0
    # 遍历当前目录下的所有 html 和 css 文件
    for root_dir, _, files in os.walk("."):
        for file in files:
            if file.endswith((".html", ".css")):
                filepath = os.path.join(root_dir, file)
                
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                
                original_content = content
                for old_str, new_str in replacements.items():
                    content = content.replace(old_str, new_str)
                
                # 如果有修改，才重新写入
                if content != original_content:
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"✅ 成功适配浅色主题: {filepath}")
                    fixed_count += 1
                    
    if fixed_count == 0:
        print("⚠️ 未发现需要修正的代码，请确认你在包含 index.html 的目录下运行此脚本。")
    else:
        print(f"\\n🎉 完美！共优化了 {fixed_count} 个文件。请去浏览器强制刷新 (Ctrl+F5) 查看效果。")

if __name__ == "__main__":
    fix_ui_colors()