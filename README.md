# 🔐 CIA Risk Dashboard

**Cryptography & Network Security Assignment - Project 0**  
*Interactive Web Application for Security Risk Assessment & Control Simulator*

![Status](https://img.shields.io/badge/Status-Complete-brightgreen)
![React](https://img.shields.io/badge/React-18.2-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 About This Project

The CIA Risk Dashboard is an **interactive web application** that identifies security risks to **Confidentiality, Integrity, and Availability (CIA)** for different systems and recommends appropriate security controls.

### Key Features

✨ **Interactive CIA Visualization**
- Real-time risk breakdown by confidentiality, integrity, and availability
- Beautiful pie charts and visual analytics

🎯 **Attack Scenario Simulator**
- Explore real-world threat scenarios
- Understand attack types and impacts
- View real-world breach examples

🛡️ **Security Control Simulator**
- Click to implement security controls
- See immediate risk reduction
- Analyze cost vs. effectiveness

📊 **Professional Dashboard**
- Cute animations with pastel color theme
- Responsive design (works on desktop & mobile)
- Real-time calculations and updates

💡 **Smart Recommendations**
- Dynamic recommendations based on applied controls
- Best practices for security
- Risk analysis and metrics

---

## 🌐 Live Demo

**Live Application:** https://cia-risk-dashboard-ax2d.vercel.app/

**Source Code:** https://github.com/VedhaSriD/cia-risk-dashboard 

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
 git clone https://github.com/VedhaSriD/cia-risk-dashboard.git
   cd cia-risk-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually visit the URL

---

## 📖 How to Use

### Step 1: Select a System
Click one of the system buttons at the top:
- 🏦 **Banking System** - Online banking platform
- 🏥 **Healthcare System** - Hospital patient management
- 🛒 **E-commerce Platform** - Online shopping system

### Step 2: View Current Risks
The CIA chart shows your system's current risk profile:
- **Confidentiality (Red)** - Risk of unauthorized data access
- **Integrity (Blue)** - Risk of unauthorized data modification
- **Availability (Yellow)** - Risk of service disruption

### Step 3: Explore Threats
Review the security threats section to understand:
- Attack names and descriptions
- Which CIA pillar is affected
- Real-world breach examples
- Available controls for each threat

### Step 4: Apply Security Controls
Click on any security control card to implement it:
- See which risks it protects
- Review effectiveness and cost
- Watch your risk score drop in real-time

### Step 5: Check Recommendations
The recommendation panel provides:
- Smart suggestions based on your controls
- Best practices for security
- Metrics on risk reduction progress

---

## 🏗️ Project Structure

```
cia-risk-dashboard/
├── public/
│   └── index.html              # Main HTML file
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Main dashboard component
│   │   ├── CIAChart.jsx        # CIA visualization chart
│   │   ├── AttackScenario.jsx  # Individual threat cards
│   │   ├── ControlSimulator.jsx # Control selector interface
│   │   └── RecommendationPanel.jsx # Recommendations display
│   ├── data/
│   │   └── risks.json          # Risk database (predefined)
│   ├── App.jsx                 # Root React component
│   ├── index.css               # Global styles & animations
│   └── index.js                # React entry point
├── docs/
│   ├── ARCHITECTURE.md         # System design documentation
│   ├── RISK_DATABASE.md        # Risk scenarios explained
│   └── SCREENSHOTS.md          # Visual screenshots & explanations
├── README.md                   # This file
├── DOCUMENTATION.md            # Assignment documentation
├── package.json                # Dependencies
└── .gitignore                  # Git ignore rules
```

---

## 🎨 Design & Theme

### Color Palette (Pastel Colors)
- **Primary** (#D4A5E8): Soft Lavender
- **Secondary** (#A8DADC): Soft Blue
- **Accent Pink** (#FFB4D6): Pastel Pink
- **Accent Cyan** (#C1F0F6): Soft Cyan
- **Accent Yellow** (#FFF5B0): Soft Yellow

### Animations & Interactions
- Smooth fade-in and slide animations
- Hover effects with scale and glow
- Cute floating animations on icons
- Interactive control cards with instant feedback

---

## 💻 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend Framework** | React.js 18.2 |
| **Charts & Visualization** | Recharts |
| **Styling** | Custom CSS3 (Pastel theme) |
| **Data** | JSON (predefined risks) |
| **Deployment** | Vercel |

---

## 🔒 Systems Analyzed

### 1. 🏦 Banking System
**Risks Covered:**
- SQL Injection → Data Breach
- Man-in-the-Middle Attack → Network Attack
- DDoS Attack → Denial of Service
- Phishing → Social Engineering
- Weak Password Policies → Authentication Bypass

**Key Controls:**
- Input Validation, WAF, TLS/SSL, MFA, Email Security

### 2. 🏥 Healthcare System
**Risks Covered:**
- Ransomware Attack → Malware
- Insider Threats → Data Exfiltration
- Medical Device Tampering → IoT Attack
- Patient Privacy Breach → HIPAA Violation

**Key Controls:**
- Backups & Disaster Recovery, DLP, Device Security, Encryption

### 3. 🛒 E-commerce Platform
**Risks Covered:**
- Credit Card Fraud → Payment Fraud
- Cross-Site Scripting (XSS) → Web Vulnerability
- Inventory Tampering → Database Attack
- Account Takeover → Authentication Attack
- Website Downtime → Infrastructure Failure

**Key Controls:**
- PCI-DSS, Fraud Detection, Input Encoding, MFA, Load Balancing

---

## 📚 Documentation

### Assignment Submission Documents
- **DOCUMENTATION.md** - Complete assignment documentation
- **docs/ARCHITECTURE.md** - System design & data flow
- **docs/RISK_DATABASE.md** - All risks explained with details
- **docs/SCREENSHOTS.md** - Visual guide with explanations

---

## 🎓 Learning Outcomes

After using this application, you'll understand:

✅ **CIA Triad Concept**
- Confidentiality, Integrity, and Availability in detail
- How different attacks impact each pillar
- Risk scoring and assessment

✅ **Security Threats**
- Real-world attack scenarios
- Attack types and vectors
- Impact on business operations

✅ **Security Controls**
- Defense mechanisms and their effectiveness
- Cost-benefit analysis
- Layered security approach

✅ **Risk Management**
- Risk identification and classification
- Mitigation strategies
- Prioritization of security investments

---

## 📊 Example Workflow

```
1. Select "Banking System"
   ↓
2. See initial CIA scores
   Confidentiality: 225, Integrity: 195, Availability: 95
   ↓
3. Review threats like "SQL Injection", "MITM", "DDoS"
   ↓
4. Apply "TLS/SSL Encryption" control
   ↓
5. Watch risk drop for MITM threat
   ↓
6. Apply "Input Validation" control
   ↓
7. See Confidentiality risk decrease significantly
   ↓
8. Check recommendations for next steps
```

---

## 🐛 Troubleshooting

### App won't start?
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm start
```

### Port 3000 already in use?
```bash
# Use a different port
PORT=3001 npm start
```

### Styles not loading?
- Clear browser cache (Ctrl+Shift+Delete)
- Restart development server

---

## 📦 Deployment

### Deploy to Vercel (Recommended - Free)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to GitHub Pages
```bash
# Add this to package.json
"homepage":(https://github.com/VedhaSriD/cia-risk-dashboard)
# Build and deploy
npm run build
npm install -g gh-pages
gh-pages -d build
```

---

## 🤝 Contributing

Feel free to suggest improvements:
- More risk scenarios
- Additional systems to analyze
- Enhanced visualizations
- UX/UI improvements

---

## 📝 License

MIT License - Feel free to use this project for educational purposes

---

## 👨‍💻 Author

Vedha Sri Dumpati 
CSE Panthers 2024  
Cryptography & Network Security Student

---

## 🙏 Acknowledgments

- OWASP Top 10 Security Risks
- NIST Cybersecurity Framework
- Real-world breach case studies
- React & Recharts documentation

---

## 📧 Questions?

Refer to the **DOCUMENTATION.md** file for detailed information.

---

**Last Updated:** September 2026 
**Status:** ✅ Complete
