// ============================================
// Artha AI - Finance Chat Assistant
// Safe + Advanced Script
// ============================================

// Knowledge Base
const financeKnowledgeBase = {
    general: {
        'budget': 'Budgeting helps manage money using rules like 50-30-20.',
        'debt': 'Debt is borrowed money. Pay high-interest debt first.',
        'credit': 'Credit score ranges from 300-850. Higher is better.',
        'savings': 'Save at least 20% of your income.',
        'inflation': 'Inflation reduces purchasing power over time.'
    },
    investing: {
        'ppf': 'PPF is a 15-year government scheme with tax-free returns.',
        'sip': 'SIP is investing monthly in mutual funds.',
        'mutual': 'Mutual funds pool money and invest in markets.',
        'stocks': 'Stocks represent ownership in a company.',
        'elss': 'ELSS gives tax benefits with 3-year lock-in.'
    },
    tax: {
        'tax': 'Tax planning helps reduce liability legally.',
        '80c': 'Section 80C allows ₹1.5L deduction.',
        'itr': 'ITR must be filed annually before deadline.'
    },
    startup: {
        'runway': 'Runway = cash / monthly burn rate.',
        'burn': 'Burn rate is monthly spending.',
        'funding': 'Funding can be VC, angel, or bootstrap.'
    }
};

// Utility
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Safe DOM getters
function getEl(id) {
    return document.getElementById(id);
}

// Mode
function getSelectedMode() {
    const el = getEl('modeSelect');
    return el ? el.value : 'general';
}

// AI Response
function generateAIResponse(message) {
    const mode = getSelectedMode();
    const kb = financeKnowledgeBase[mode] || financeKnowledgeBase.general;
    const msg = message.toLowerCase();

    for (let key in kb) {
        if (msg.includes(key)) {
            return kb[key];
        }
    }

    return "I can help with finance topics like budgeting, investing, tax, and startups.";
}

// Add message
function addMessage(text, isUser = false) {
    const chatBox = getEl('chatBox');
    if (!chatBox) return;

    const div = document.createElement('div');
    div.className = isUser ? 'user-msg' : 'bot-msg';
    div.textContent = text + " (" + getCurrentTime() + ")";

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Main send function
function sendMessage() {
    const input = getEl('userInput') || getEl('input');
    if (!input) return;

    const text = input.value.trim();
    if (text === '') return;

    addMessage(text, true);
    input.value = '';

    setTimeout(() => {
        const reply = generateAIResponse(text);
        addMessage(reply, false);
    }, 400);
}

// Form support (if using form)
const chatForm = getEl('chat-form');
if (chatForm) {
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendMessage();
    });
}

// Button support (if using button)
const sendBtn = document.querySelector('button');
if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
}

// Mode change
const modeSelect = getEl('modeSelect');
if (modeSelect) {
    modeSelect.addEventListener('change', function() {
        addMessage("Switched to " + this.value + " mode");
    });
}

// New chat
const newChatBtn = document.querySelector('.new-chat-btn');
if (newChatBtn) {
    newChatBtn.addEventListener('click', () => {
        const chatBox = getEl('chatBox');
        if (chatBox) chatBox.innerHTML = '';
    });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    addMessage("Hello! I am Artha AI. Ask me anything about finance.");
});    if (text === '') return;

    addMessage(text, true);
    input.value = '';

    setTimeout(() => {
        const reply = generateAIResponse(text);
        addMessage(reply, false);
    }, 400);
}

// Form support (if using form)
const chatForm = getEl('chat-form');
if (chatForm) {
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendMessage();
    });
}

// Button support (if using button)
const sendBtn = document.querySelector('button');
if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
}

// Mode change
const modeSelect = getEl('modeSelect');
if (modeSelect) {
    modeSelect.addEventListener('change', function() {
        addMessage("Switched to " + this.value + " mode");
    });
}

// New chat
const newChatBtn = document.querySelector('.new-chat-btn');
if (newChatBtn) {
    newChatBtn.addEventListener('click', () => {
        const chatBox = getEl('chatBox');
        if (chatBox) chatBox.innerHTML = '';
    });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
   addMessage("Hello! I am Artha AI. Ask me anything about finance.");
});        return (amount / 10000000).toFixed(2) + ' Cr';
    } else if (amount >= 100000) {
        return (amount / 100000).toFixed(2) + ' L';
    } else {
        return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    }
}
function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
// Get financial mode from select
function getSelectedMode() {
    return document.getElementById('modeSelect').value;
}
function getModeLabel(mode) {
    const labels = {
        'general': 'General Finance',
        'investing': 'Investing',
        'tax': 'Tax Planning',
        'startup': 'Startup Runway'
    };
    return labels[mode] || 'General Finance';
}
// AI Response Generator
function generateAIResponse(userMessage) {
    const mode = getSelectedMode();
    const modeKB = financeKnowledgeBase[mode];
    const lowerMessage = userMessage.toLowerCase();
    // Match user query with knowledge base
    for (const [key, response] of Object.entries(modeKB)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    // Generic responses for different modes
    const genericResponses = {
        'general': "That's a great question about personal finance! I can help you with budgeting, debt management, credit scores, savings strategies, and understanding inflation. What specific topic would you like to explore?",
        'investing': "That's an interesting investing question! I can explain investment options like PPF, SIP, mutual funds, stocks, ELSS, NPS, index funds, dividends, and portfolio management. What would you like to know?",
        'tax': "Good tax planning question! I can help with tax planning strategies, deductions, tax brackets, capital gains treatment, and ITR filing. What specific tax topic interests you?",
        'startup': "That's a startup-related question! I can discuss runway calculations, burn rate management, cash flow, funding options, and break-even analysis. What aspect would you like to learn about?"
    };
    return genericResponses[mode] || genericResponses['general'];
}
// Chat Interface
const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chatBox');
const input = document.getElementById('input');
const modeSelect = document.getElementById('modeSelect');
const currentModeSpan = document.getElementById('currentMode');
const modeStatusSpan = document.getElementById('modeStatus');
// Add message to chat
function addMessage(content, isUser = false, timestamp = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = timestamp || getCurrentTime();
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeSpan);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
// Handle form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;
    // Add user message
    addMessage(userText, true);
    input.value = '';
    // Simulate API delay
    setTimeout(() => {
        const aiResponse = generateAIResponse(userText);
        addMessage(aiResponse, false);
    }, 500);
});
// Handle quick action buttons
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const topic = btn.textContent;
        input.value = topic;
        input.focus();
    });
});
// Handle mode change
modeSelect.addEventListener('change', (e) => {
    const newMode = e.target.value;
    const modeLabel = getModeLabel(newMode);
    currentModeSpan.textContent = modeLabel;
    modeStatusSpan.textContent = `${modeLabel} Active`; 
    // Add system message
    const currentTime = getCurrentTime();
    addMessage(`Switched to ${modeLabel} mode. Ask me anything about ${modeLabel.toLowerCase()}!`, false, currentTime);
});
// Handle calculator input sync
document.getElementById('monthlyAmount').addEventListener('change', function() {
    document.getElementById('amountSlider').value = this.value;
});
document.getElementById('amountSlider').addEventListener('input', function() {
    document.getElementById('monthlyAmount').value = this.value;
});
document.getElementById('years').addEventListener('change', function() {
    document.getElementById('yearsSlider').value = this.value;
});
document.getElementById('yearsSlider').addEventListener('input', function() {
    document.getElementById('years').value = this.value;
});
// New chat button
document.querySelector('.new-chat-btn').addEventListener('click', () => {
    chatBox.innerHTML = '';
    input.value = '';
    const mode = getModeLabel(getSelectedMode());
    addMessage(`Hello! I'm Artha AI. I'm now in ${mode} mode. How can I help you with your finances?`, false);
});
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    calculatePPF();
});
// Auto-save chat (can integrate with backend)
function saveChatHistory() {
    const messages = [];
    document.querySelectorAll('.message').forEach(msg => {
        const isUser = msg.classList.contains('user');
        const content = msg.querySelector('.message-content').textContent;
        const time = msg.querySelector('.message-time').textContent;
        messages.push({ content, isUser, time });
    });
    localStorage.setItem('chatHistory', JSON.stringify(messages));
}
// Periodically save chat
setInterval(saveChatHistory, 10000);
