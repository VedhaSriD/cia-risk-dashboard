import React, { useState, useMemo } from 'react';
import risksData from '../data/risks.json';
import CIAChart from './CIAChart';
import AttackScenario from './AttackScenario';
import ControlSimulator from './ControlSimulator';
import RecommendationPanel from './RecommendationPanel';

export default function Dashboard() {
  const [selectedSystem, setSelectedSystem] = useState('banking');
  const [appliedControls, setAppliedControls] = useState([]);

  // Get current system
  const system = useMemo(
    () => risksData.systems.find(s => s.id === selectedSystem),
    [selectedSystem]
  );

  // Calculate CIA scores
  const calculateCIA = () => {
    let cia = { confidentiality: 0, integrity: 0, availability: 0 };
    
    system.baseRisks.forEach(risk => {
      // Check if risk has any control applied
      const hasControl = appliedControls.some(c =>
        risk.controls.some(rc => rc.id === c)
      );

      if (!hasControl) {
        cia.confidentiality += risk.cia.confidentiality;
        cia.integrity += risk.cia.integrity;
        cia.availability += risk.cia.availability;
      }
    });

    return cia;
  };

  // Calculate total investment
  const calculateTotalInvestment = () => {
    const allControls = system.baseRisks.flatMap(r => r.controls);
    const uniqueControls = Array.from(
      new Map(allControls.map(c => [c.id, c])).values()
    );

    return uniqueControls.reduce((sum, control) => {
      if (appliedControls.includes(control.id)) {
        return sum + control.cost;
      }
      return sum;
    }, 0);
  };

  const ciaScores = calculateCIA();
  const totalInvestment = calculateTotalInvestment();
  const totalRisk = ciaScores.confidentiality + ciaScores.integrity + ciaScores.availability;

  return (
    <>
      {/* Header */}
      <div className="header">
        <h1>🔐 CIA Risk Dashboard</h1>
        <p>Interactive Security Risk Assessment & Control Simulator</p>
      </div>

      {/* Main Dashboard */}
      <div className="dashboard">
        {/* System Selector */}
        <div className="system-selector">
          {risksData.systems.map(sys => (
            <button
              key={sys.id}
              className={`system-btn ${selectedSystem === sys.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedSystem(sys.id);
                setAppliedControls([]); // Reset controls when switching systems
              }}
            >
              {sys.icon} {sys.name}
            </button>
          ))}
        </div>

        {/* CIA Visualization Section */}
        <div className="cia-section">
          <div className="section-header">📊 Current Risk Profile</div>
          
          <div className="cia-chart-container">
            <CIAChart cia={ciaScores} />
          </div>

          {/* CIA Stats */}
          <div className="cia-stats">
            <div className="stat-card">
              <div className="stat-label">🔓 Confidentiality Risk</div>
              <div className="stat-value">{ciaScores.confidentiality}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">✏️ Integrity Risk</div>
              <div className="stat-value">{ciaScores.integrity}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">⏹️ Availability Risk</div>
              <div className="stat-value">{ciaScores.availability}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">⚠️ Total Risk Score</div>
              <div className="stat-value">{totalRisk}</div>
            </div>
          </div>
        </div>

        {/* Attack Scenarios */}
        <div className="attacks-section">
          <div className="section-header">🎯 Security Threats</div>
          <p style={{ marginBottom: '20px', opacity: 0.7 }}>
            Below are the primary threats affecting your system's security. Click to see how controls help mitigate them.
          </p>
          <div className="attacks-grid">
            {system.baseRisks.map(risk => (
              <AttackScenario
                key={risk.id}
                risk={risk}
                isControlled={appliedControls.some(c =>
                  risk.controls.some(rc => rc.id === c)
                )}
              />
            ))}
          </div>
        </div>

        {/* Control Simulator */}
        <ControlSimulator
          risks={system.baseRisks}
          appliedControls={appliedControls}
          setAppliedControls={setAppliedControls}
          totalInvestment={totalInvestment}
        />

        {/* Recommendation Panel */}
        <RecommendationPanel
          risks={system.baseRisks}
          appliedControls={appliedControls}
          totalRisk={totalRisk}
        />
      </div>

      {/* Footer */}
      <div className="footer">
        <p>💡 Pro Tip: Apply security controls to reduce your CIA triad risk score and see the impact in real-time!</p>
        <p style={{ marginTop: '10px', fontSize: '0.85em' }}>
          Assignment 0 - Cryptography & Network Security | CSE Panthers 2024
        </p>
      </div>
    </>
  );
}