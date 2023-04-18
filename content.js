
// 在文档加载完成后执行复制函数
window.onload = function() {
    // 每隔 5 秒加载一次元素，实现比较丑陋~
    setInterval(loadElements, 5000);
}
  
function loadElements() {
    // 检查当前网站是否为 ChatGPT
    if (window.location.href.startsWith("https://chat.openai.com/")) {
        const style = document.createElement('style');
        style.textContent = `
            .btncy {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 2px 4px;
                margin: 8px;
                color: white;
                font-size: 13px;
                font-weight: bold;
                text-transform: uppercase;
                text-align: center;
                white-space: nowrap;
                cursor: pointer;
                border-radius: 4px;
                background-color: #9ca3af;
                border: none;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                transition: all 0.2s ease;
            }
            
            /* 当鼠标悬停时 */
            .btncy:hover {
                filter: brightness(90%);
            }
            
            /* 当被单击时 */
            .btncy:active {
                box-shadow: none;
                transform: translateY(2px);
            }  
        `;
        document.head.appendChild(style);
        
        const messageBox = document.querySelectorAll('div.markdown.prose.w-full.break-words');
        const parentDivs = Array.from(document.querySelectorAll('div.text-gray-400.flex.self-end.visible'));
        const targetDivs = parentDivs.filter(parentDiv => {
            // 获取当前 div 元素下的所有 button 元素
            const buttons = parentDiv.querySelectorAll('button'); 
            // 如果当前 div 元素下包含两个button 元素，则匹配成功
            if (buttons.length != 2) return false; 
            // 获取 button 元素下的 svg 元素
            const svg = buttons[0].querySelector('svg'); 
            // 检查 svg 元素是否存在
            return svg !== null; 
        });

        targetDivs.forEach(function(targetDiv, index) {
            // 添加复制按钮
            const copyButton = document.createElement("button");
            
            copyButton.innerHTML = 'Copy';
            copyButton.className = 'btncy';
            copyButton.onclick = () => {
                const text = messageBox[index] === null ? "" : messageBox[index].innerText;
                navigator.clipboard.writeText(text);
            }
            targetDiv.appendChild(copyButton);
        });
    

    }
}
