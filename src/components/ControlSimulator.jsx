import React, { useMemo } from 'react';

export default function ControlSimulator({
  risks,
  appliedControls,
  setAppliedControls,
  totalInvestment
}) {
  // Get unique controls from all risks
  const allControls = useMemo(() => {
    const controls = risks.flatMap(r => r.controls);
    return Array.from(new Map(controls.map(c => [c.id, c])).values());
  }, [risks]);

  const toggleControl = (controlId) => {
    setAppliedControls(prev =>
      prev.includes(controlId)
        ? prev.filter(c => c !== controlId)
        : [...prev, controlId]
    );
  };

  // Get controls affecting each risk
  const getRisksAffectedByControl = (controlId) => {
    return risks.filter(risk =>
      risk.controls.some(c => c.id === controlId)
    ).length;
  };

  // Calculate effectiveness score
  const getControlEffectiveness = (controlId) => {
    const control = allControls.find(c => c.id === controlId);
    if (!control) return 0;

    const affectedRisks = getRisksAffectedByControl(controlId);
    return Math.round((control.effectiveness * affectedRisks) / 10);
  };

  // Sort controls by effectiveness
  const sortedControls = [...allControls].sort((a, b) => {
    const scoreA = getControlEffectiveness(a.id);
    const scoreB = getControlEffectiveness(b.id);
    return scoreB - scoreA;
  });

  return (
    <div className="control-section">
      <div className="section-header">
        💡 Security Controls - Apply & See Risk Drop
      </div>
      <p style={{ marginBottom: '25px', opacity: 0.7 }}>
        Click on any security control to implement it. Watch your risk profile improve in real-time! 🎯
      </p>

      <div className="controls-grid">
        {sortedControls.map(control => {
          const isActive = appliedControls.includes(control.id);
          const affectedRisks = getRisksAffectedByControl(control.id);
          const effectiveness = getControlEffectiveness(control.id);

          return (
            <div
              key={control.id}
              className={`control-card ${isActive ? 'active' : ''}`}
              onClick={() => toggleControl(control.id)}
              style={{
                cursor: 'pointer',
                opacity: isActive ? 1 : 0.9,
                transform: isActive ? 'scale(1)' : 'scale(1)'
              }}
            >
              <div className="control-header">
                <div className="control-icon">🛡️</div>
                <div className="control-name">{control.name}</div>
              </div>

              <p style={{
                fontSize: '0.9em',
                color: '#5A4A7A',
                opacity: 0.8,
                marginBottom: '15px',
                lineHeight: '1.4'
              }}>
                {control.description}
              </p>

              <div className="control-info">
                <div className="info-item">
                  <div className="info-label">⚡ Effectiveness</div>
                  <div className="info-value">{control.effectiveness}%</div>
                </div>
                <div className="info-item">
                  <div className="info-label">💰 Annual Cost</div>
                  <div className="info-value">${(control.cost / 1000).toFixed(0)}K</div>
                </div>
              </div>

              <div className="control-info">
                <div className="info-item">
                  <div className="info-label">🎯 Protects</div>
                  <div className="info-value">{affectedRisks} Risks</div>
                </div>
                <div className="info-item">
                  <div className="info-label">📊 Impact Score</div>
                  <div className="info-value">{effectiveness}</div>
                </div>
              </div>

              <button className="control-btn">
                {isActive ? '✅ ACTIVE' : '▶ APPLY'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Investment Summary */}
      <div className="investment-summary">
        <h3>💰 Total Annual Security Investment</h3>
        <div className="investment-amount">
          ${totalInvestment.toLocaleString()}
        </div>
        <p style={{ marginTop: '10px', opacity: 0.9, fontSize: '0.95em' }}>
          {appliedControls.length} / {allControls.length} controls applied
        </p>
        <p style={{ marginTop: '8px', opacity: 0.8, fontSize: '0.85em' }}>
          {appliedControls.length === 0
            ? '👉 Start applying controls to see your investment grow and risk decrease!'
            : '✅ Great job! You\'re building a stronger security posture.'}
        </p>
      </div>
    </div>
  );
}