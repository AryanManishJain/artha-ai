// ============================================
// Artha AI - Finance Chat Assistant
// Frontend JavaScript
// ============================================

// Financial Knowledge Base
const financeKnowledgeBase = {
    general: {
        'budget': 'Budgeting is the process of creating a plan for your money. It helps you allocate income to different categories like housing, food, entertainment, and savings. A common approach is the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.',
        'debt': 'Debt is money borrowed that must be repaid. Types include credit card debt, personal loans, mortgages, and student loans. To manage debt, track what you owe, prioritize high-interest debt first (avalanche method), or pay smallest balances first (snowball method).',
        'credit score': 'A credit score is a number (300-850) that represents your creditworthiness. Factors include payment history (35%), credit utilization (30%), length of credit history (15%), credit mix (10%), and new inquiries (10%). A higher score gets you better loan rates.',
        'savings': 'Saving is setting aside money for future use. Emergency funds should cover 3-6 months of expenses. Use high-yield savings accounts for liquidity or fixed deposits for guaranteed returns with a timeline.',
        'inflation': 'Inflation is the rate at which the general level of prices for goods and services rises. It reduces purchasing power over time. To combat inflation, invest in assets that grow faster than inflation rates.'
    },
    investing: {
        'PPF': 'Public Provident Fund (PPF) is a long-term savings scheme run by the Indian government. Features: 15-year maturity, 7.1% annual interest (currently), tax-free returns under Section 80C, flexible withdrawal rules. You can invest ₹500 to ₹1.5 lakh annually. Perfect for conservative investors seeking guaranteed returns.',
        'SIP': 'Systematic Investment Plan (SIP) is investing a fixed amount regularly (monthly, quarterly) in mutual funds. Benefits: rupee cost averaging (reduces market timing risk), disciplined investing, flexibility, and lower entry costs. Start with as low as ₹500 per month.',
        'mutual funds': 'Mutual funds pool money from investors to buy stocks, bonds, or other securities. Types: equity (stocks), debt (bonds), balanced (mix), money market. Managed by professionals. Benefits: diversification, liquidity, and expert management. SIP is a popular way to invest.',
        'stocks': 'Stocks represent ownership in companies. Buy low, sell high. Risks are higher than bonds but offer higher growth potential. Beginners should start with index funds or dividend stocks. Avoid emotional decisions and follow a long-term strategy.',
        'ELSS': 'Equity Linked Saving Scheme (ELSS) is a mutual fund that invests in stocks. Tax benefits: deduction up to ₹1.5 lakh under Section 80C. Lock-in period: only 3 years. Returns linked to market performance. Great for tax-saving combined with growth.',
        'NPS': 'National Pension System (NPS) is a retirement savings scheme. Contributions get tax deduction. You choose how much to invest and in which instruments. Tax-exempt returns if held till retirement. Minimum ₹500, no maximum limit. Opens at age 18, matures at 60.',
        'index funds': 'Index funds track market indices like Sensex, Nifty. Benefits: low expense ratio, low risk, passive investing. Perfect for long-term wealth building. Returns match market performance minus fees. Best for beginners who want simplicity.',
        'dividend': 'A dividend is a payment from company profits to shareholders. Dividend yield = annual dividend / current stock price. Some stocks pay quarterly or annually. Dividend stocks provide regular income plus capital appreciation potential.',
        'portfolio': 'A portfolio is a collection of investments (stocks, bonds, funds, etc.). Asset allocation depends on age, risk tolerance, and goals. Typical allocation: 60% stocks, 30% bonds, 10% cash. Rebalance annually to maintain desired allocation.'
    },
    tax: {
        'tax planning': 'Tax planning involves arranging finances to minimize tax liability legally. Use tax-advantaged investments like PPF, ELSS, insurance. Claim deductions for rent (80GG), donations (80G), education (80E). Keep records for documentation.',
        'deduction': 'A deduction reduces your taxable income. Common deductions: section 80C (₹1.5 lakh limit for investments), 80D (health insurance), 80E (education loan interest). Each has specific rules and documentation requirements.',
        'tax bracket': 'Tax brackets are income ranges with different tax rates. In India: ₹0-2.5L (0%), ₹2.5L-5L (5%), ₹5L-10L (20%), above ₹10L (30%). Calculate your applicable rate based on total income.',
        'capital gains': 'Capital gains are profits from selling investments. Short-term (held <1 year for stocks) taxed as income. Long-term (held >1 year) taxed at lower rates (5-20% depending on asset type). Tax-loss harvesting can offset gains.',
        'itr': 'Income Tax Return (ITR) is filed annually to report income and taxes paid. Choose correct ITR form based on income source. File before July 31. Benefits: claim tax refunds, maintain tax compliance, apply for loans/visas.'
    },
    startup: {
        'runway': 'Startup runway is how long your cash reserves will last. Calculate: monthly burn rate = total monthly spending. Runway (months) = cash on hand / monthly burn. Most startups aim for 12+ months runway to reach profitability or next funding round.',
        'burn rate': 'Burn rate is monthly cash spending. Calculated as: total monthly expenses (salaries, rent, operations). High burn rate = risk of running out of funds quickly. Reduce by cutting costs or increasing revenue. Monitor weekly for cash management.',
        'cash flow': 'Cash flow is money moving in and out of your business. Positive: more money coming in than going out. Manage by tracking daily cash, negotiating payment terms with vendors, and accelerating customer collections. Critical for startup survival.',
        'funding': 'Funding options for startups: bootstrapping (personal funds), angel investors (high-net-worth individuals), venture capital (professional investors), loans, grants. Each has different terms, dilution, and control implications. Choose based on your needs.',
        'break even': 'Break-even point is when revenue equals expenses. No profit or loss. Calculate: fixed costs / (price per unit - variable cost per unit). Reach break-even quickly to ensure sustainability. Plan path to profitability after break-even.'
    }
};

// Financial Calculators
function calculatePPF() {
    const monthlyAmount = parseFloat(document.getElementById('monthlyAmount').value);
    const years = parseFloat(document.getElementById('years').value);
    const annualRate = 7.1 / 100;

    let totalAmount = 0;
    for (let year = 1; year <= years; year++) {
        const monthlyForYear = monthlyAmount * 12;
        const monthsElapsed = (years - year) * 12 + 6; // Interest compounds half-yearly
        const rate = (1 + annualRate / 2) ** (monthsElapsed / 6);
        totalAmount += monthlyForYear * rate;
    }

    const totalInvested = monthlyAmount * 12 * years;
    const totalInterest = totalAmount - totalInvested;

    // Update UI
    document.getElementById('maturityAmount').textContent = formatCurrency(totalAmount);
    document.getElementById('totalInvested').textContent = formatCurrency(totalInvested);
    document.getElementById('totalInterest').textContent = formatCurrency(totalInterest);
    document.getElementById('maturityPeriod').textContent = `after ${years} years`;
    
    // ROI Percentage
    const roiPercent = ((totalInterest / totalInvested) * 100).toFixed(0);
    document.querySelector('.roi-value').textContent = `+${roiPercent}%`;
}

function calculateSIP(monthlyAmount, months, annualRate) {
    const monthlyRate = annualRate / 12 / 100;
    const maturityValue = monthlyAmount * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate);
    return {
        maturity: maturityValue,
        invested: monthlyAmount * months,
        interest: maturityValue - (monthlyAmount * months)
    };
}

// Utility Functions
function formatCurrency(amount) {
    if (amount >= 10000000) {
        return (amount / 10000000).toFixed(2) + ' Cr';
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
