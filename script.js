const API_KEY = "這裡換成你的API_KEY"; 

async function sendMessage() {
    const inputEl = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const text = inputEl.value.trim();
    
    if (!text) return;

    // 顯示使用者對話
    chatBox.innerHTML += `<div class="message user">${text}</div>`;
    inputEl.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // 顯示思考中
    const loadingId = 'loading-' + Date.now();
    chatBox.innerHTML += `<div class="message model" id="${loadingId}">思考中...</div>`;

    try {
        // 直接呼叫 Google AI Studio 的最新版 Gemini 1.5 Flash API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }]
            })
        });

        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        
        // 替換思考中文字
        document.getElementById(loadingId).innerText = reply;
    } catch (error) {
        document.getElementById(loadingId).innerText = "錯誤：連線失敗，請檢查 API Key 是否正確。";
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}