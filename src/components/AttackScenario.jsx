import React from 'react';

export default function AttackScenario({ risk, isControlled }) {
  // Get emoji based on attack type
  const getAttackEmoji = (attackType) => {
    const emojiMap = {
      '🔓 Data Breach': '🔓',
      '🕵️ Network Attack': '🕵️',
      '💥 Denial of Service': '💥',
      '👤 Social Engineering': '👤',
      '🔑 Authentication Bypass': '🔑',
      '🦠 Malware': '🦠',
      '👤 Insider Threat': '👤',
      '⚙️ IoT/Device Attack': '⚙️',
      '💳 Payment Fraud': '💳',
      '🔓 Web Vulnerability': '🔓',
      '📊 Database Attack': '📊',
      '👤 Authentication Attack': '👤',
      '💥 Infrastructure Failure': '💥'
    };
    return emojiMap[attackType] || '⚠️';
  };

  // Get severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return '#FF9999';
      case 'HIGH':
        return '#FFC58B';
      default:
        return '#FFE5B0';
    }
  };

  const total = risk.cia.confidentiality + risk.cia.integrity + risk.cia.availability;
  const ciaPercentages = {
    confidentiality: Math.round((risk.cia.confidentiality / total) * 100),
    integrity: Math.round((risk.cia.integrity / total) * 100),
    availability: Math.round((risk.cia.availability / total) * 100)
  };

  return (
    <div className="attack-card">
      <div className="attack-header">
        <div className="attack-icon">{getAttackEmoji(risk.attackType)}</div>
        <div>
          <div className="attack-title">{risk.name}</div>
          <span
            className="attack-type"
            style={{
              backgroundColor: getSeverityColor(risk.severity),
              color: '#5A4A7A'
            }}
          >
            {risk.severity}
          </span>
        </div>
      </div>

      <div className="attack-description">{risk.description}</div>

      <div style={{ fontSize: '0.85em', color: '#5A4A7A', opacity: 0.7, marginBottom: '15px' }}>
        📌 <strong>Real Example:</strong> {risk.realWorldExample}
      </div>

      {/* CIA Breakdown */}
      <div className="attack-cia">
        <div className="cia-badge confidentiality">
          🔓 C: {ciaPercentages.confidentiality}%
        </div>
        <div className="cia-badge integrity">
          ✏️ I: {ciaPercentages.integrity}%
        </div>
        <div className="cia-badge availability">
          ⏹️ A: {ciaPercentages.availability}%
        </div>
      </div>

      {/* Controlled Status */}
      {isControlled && (
        <div className="controlled-badge">
          ✅ Mitigated with Control
        </div>
      )}

      {/* Available Controls Info */}
      <div style={{
        marginTop: '15px',
        padding: '12px',
        background: 'rgba(212, 165, 232, 0.1)',
        borderRadius: '8px',
        fontSize: '0.85em',
        color: '#5A4A7A'
      }}>
        <strong>💡 Available Controls ({risk.controls.length}):</strong>
        <div style={{ marginTop: '8px' }}>
          {risk.controls.map(control => (
            <div key={control.id} style={{ marginBottom: '6px' }}>
              • <strong>{control.name}</strong> ({control.effectiveness}% effective)
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}