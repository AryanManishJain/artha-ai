// ============================================
// Artha AI - Finance Chat Assistant
// Backend Server (Node.js + Express)
// ============================================

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// Middleware
// ============================================

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ============================================
// Financial Knowledge Base
// ============================================

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

// ============================================
// Utility Functions
// ============================================

function searchKnowledgeBase(query, mode = 'general') {
    const lowerQuery = query.toLowerCase();
    const modeKB = financeKnowledgeBase[mode] || financeKnowledgeBase.general;

    // Exact match
    for (const [key, response] of Object.entries(modeKB)) {
        if (lowerQuery.includes(key.toLowerCase())) {
            return response;
        }
    }

    // Partial match
    for (const [key, response] of Object.entries(modeKB)) {
        if (key.toLowerCase().includes(lowerQuery) || lowerQuery.includes(key.toLowerCase())) {
            return response;
        }
    }

    return null;
}

function generateGenericResponse(mode) {
    const responses = {
        'general': "That's a great question about personal finance! I can help you with budgeting, debt management, credit scores, savings strategies, and understanding inflation. What specific topic would you like to explore?",
        'investing': "That's an interesting investing question! I can explain investment options like PPF, SIP, mutual funds, stocks, ELSS, NPS, index funds, dividends, and portfolio management. What would you like to know?",
        'tax': "Good tax planning question! I can help with tax planning strategies, deductions, tax brackets, capital gains treatment, and ITR filing. What specific tax topic interests you?",
        'startup': "That's a startup-related question! I can discuss runway calculations, burn rate management, cash flow, funding options, and break-even analysis. What aspect would you like to learn about?"
    };

    return responses[mode] || responses['general'];
}

function generateAIResponse(userMessage, mode = 'general') {
    // Search knowledge base
    const response = searchKnowledgeBase(userMessage, mode);
    
    if (response) {
        return response;
    }

    // Return generic response if no match found
    return generateGenericResponse(mode);
}

// ============================================
// Calculator Functions
// ============================================

function calculatePPF(monthlyAmount, years, annualRate = 7.1) {
    const rate = annualRate / 100;
    let totalAmount = 0;

    for (let year = 1; year <= years; year++) {
        const monthlyForYear = monthlyAmount * 12;
        const monthsRemaining = (years - year) * 12;
        const rateForYear = (1 + rate / 2) ** (monthsRemaining / 6);
        totalAmount += monthlyForYear * rateForYear;
    }

    const totalInvested = monthlyAmount * 12 * years;
    const totalInterest = totalAmount - totalInvested;

    return {
        maturityAmount: parseFloat(totalAmount.toFixed(2)),
        totalInvested: parseFloat(totalInvested.toFixed(2)),
        totalInterest: parseFloat(totalInterest.toFixed(2)),
        roi: parseFloat(((totalInterest / totalInvested) * 100).toFixed(2))
    };
}

function calculateSIP(monthlyAmount, months, annualRate = 12) {
    const monthlyRate = annualRate / 12 / 100;
    const maturityValue = monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const invested = monthlyAmount * months;
    const interest = maturityValue - invested;

    return {
        maturityAmount: parseFloat(maturityValue.toFixed(2)),
        totalInvested: parseFloat(invested.toFixed(2)),
        totalInterest: parseFloat(interest.toFixed(2)),
        roi: parseFloat(((interest / invested) * 100).toFixed(2))
    };
}

function calculateStartupRunway(cashOnHand, monthlyBurnRate) {
    const runwayMonths = (cashOnHand / monthlyBurnRate).toFixed(2);
    const runwayWeeks = (runwayMonths * 4.33).toFixed(2);
    const fundingNeeded = monthlyBurnRate * 6; // Aim for 6 months buffer

    return {
        runwayMonths: parseFloat(runwayMonths),
        runwayWeeks: parseFloat(runwayWeeks),
        monthlyBurnRate: parseFloat(monthlyBurnRate.toFixed(2)),
        fundingNeeded: parseFloat(fundingNeeded.toFixed(2)),
        status: runwayMonths > 12 ? 'healthy' : runwayMonths > 6 ? 'warning' : 'critical'
    };
}

// ============================================
// API Routes
// ============================================

// Chat endpoint
app.post('/api/chat', (req, res) => {
    const { message, mode = 'general' } = req.body;

    if (!message || message.trim() === '') {
        return res.status(400).json({
            error: 'Message cannot be empty',
            reply: 'Please ask me a question!'
        });
    }

    try {
        const reply = generateAIResponse(message, mode);
        res.json({
            success: true,
            reply,
            mode,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error processing chat:', error);
        res.status(500).json({
            error: 'Internal server error',
            reply: 'Sorry, I encountered an error. Please try again.'
        });
    }
});

// PPF Calculator endpoint
app.post('/api/calculate/ppf', (req, res) => {
    const { monthlyAmount, years, annualRate = 7.1 } = req.body;

    if (!monthlyAmount || !years) {
        return res.status(400).json({
            error: 'monthlyAmount and years are required'
        });
    }

    try {
        const result = calculatePPF(monthlyAmount, years, annualRate);
        res.json({
            success: true,
            calculator: 'PPF',
            ...result
        });
    } catch (error) {
        console.error('Error calculating PPF:', error);
        res.status(500).json({
            error: 'Error calculating PPF',
            message: error.message
        });
    }
});

// SIP Calculator endpoint
app.post('/api/calculate/sip', (req, res) => {
    const { monthlyAmount, months, annualRate = 12 } = req.body;

    if (!monthlyAmount || !months) {
        return res.status(400).json({
            error: 'monthlyAmount and months are required'
        });
    }

    try {
        const result = calculateSIP(monthlyAmount, months, annualRate);
        res.json({
            success: true,
            calculator: 'SIP',
            ...result
        });
    } catch (error) {
        console.error('Error calculating SIP:', error);
        res.status(500).json({
            error: 'Error calculating SIP',
            message: error.message
        });
    }
});

// Startup Runway Calculator endpoint
app.post('/api/calculate/runway', (req, res) => {
    const { cashOnHand, monthlyBurnRate } = req.body;

    if (!cashOnHand || !monthlyBurnRate) {
        return res.status(400).json({
            error: 'cashOnHand and monthlyBurnRate are required'
        });
    }

    try {
        const result = calculateStartupRunway(cashOnHand, monthlyBurnRate);
        res.json({
            success: true,
            calculator: 'StartupRunway',
            ...result
        });
    } catch (error) {
        console.error('Error calculating runway:', error);
        res.status(500).json({
            error: 'Error calculating runway',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Artha AI Finance Chat Assistant',
        timestamp: new Date().toISOString()
    });
});

// Knowledge base endpoint
app.get('/api/knowledge', (req, res) => {
    const { mode = 'general' } = req.query;
    
    const kb = financeKnowledgeBase[mode] || financeKnowledgeBase.general;
    const topics = Object.keys(kb);

    res.json({
        success: true,
        mode,
        topics,
        count: topics.length
    });
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested endpoint does not exist',
        availableEndpoints: [
            'POST /api/chat',
            'POST /api/calculate/ppf',
            'POST /api/calculate/sip',
            'POST /api/calculate/runway',
            'GET /api/health',
            'GET /api/knowledge'
        ]
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════════════════════╗
    ║                                                        ║
    ║     🚀 Artha AI - Finance Chat Assistant              ║
    ║     Running on http://localhost:${PORT}                 ║
    ║                                                        ║
    ║     📊 Financial Advisor at Your Service              ║
    ║                                                        ║
    ╚════════════════════════════════════════════════════════╝
    `);
    console.log('✅ Server is ready to handle requests');
    console.log('📝 Available endpoints:');
    console.log('   • POST /api/chat - Chat with AI');
    console.log('   • POST /api/calculate/ppf - PPF Calculator');
    console.log('   • POST /api/calculate/sip - SIP Calculator');
    console.log('   • POST /api/calculate/runway - Startup Runway');
    console.log('   • GET /api/health - Health Check');
    console.log('   • GET /api/knowledge - Knowledge Base Topics');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n⚠️  SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n⚠️  SIGINT signal received: closing HTTP server');
    process.exit(0);
});

module.exports = app;
