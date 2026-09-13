import React from 'react';

export default function RecommendationPanel({ risks, appliedControls, totalRisk }) {
  // Get mitigated risks
  const mitigatedRisks = risks.filter(risk =>
    appliedControls.some(c => risk.controls.some(rc => rc.id === c))
  ).length;

  const unmitigatedRisks = risks.length - mitigatedRisks;

  // Get recommendations
  const getRecommendations = () => {
    const recommendations = [];

    if (mitigatedRisks === 0) {
      recommendations.push({
        icon: '🚨',
        title: 'No Controls Applied Yet',
        description: 'Start by applying security controls from the section above to reduce your risk score.'
      });
    }

    if (mitigatedRisks > 0 && mitigatedRisks < risks.length) {
      const mostCritical = risks.filter(r =>
        !appliedControls.some(c => r.controls.some(rc => rc.id === c))
      ).sort((a, b) => {
        const totalA = a.cia.confidentiality + a.cia.integrity + a.cia.availability;
        const totalB = b.cia.confidentiality + b.cia.integrity + b.cia.availability;
        return totalB - totalA;
      })[0];

      if (mostCritical) {
        recommendations.push({
          icon: '⚠️',
          title: 'Priority Risk Detected',
          description: `Focus on mitigating "${mostCritical.name}" - it's one of your highest impact threats.`
        });
      }
    }

    if (mitigatedRisks === risks.length) {
      recommendations.push({
        icon: '🎉',
        title: 'All Risks Mitigated!',
        description: 'Excellent! All identified threats now have security controls in place. Consider regular security audits.'
      });
    }

    if (totalRisk > 200) {
      recommendations.push({
        icon: '🔒',
        title: 'Strengthen Data Protection',
        description: 'Consider implementing encryption (TLS, AES-256) to protect sensitive data both in transit and at rest.'
      });
    }

    if (unmitigatedRisks > 2) {
      recommendations.push({
        icon: '👤',
        title: 'Improve Authentication',
        description: 'Implement Multi-Factor Authentication (MFA) to prevent account takeovers and unauthorized access.'
      });
    }

    recommendations.push({
      icon: '📋',
      title: 'Regular Security Audits',
      description: 'Conduct quarterly security assessments and penetration testing to identify new vulnerabilities.'
    });

    recommendations.push({
      icon: '👥',
      title: 'Security Awareness Training',
      description: 'Train employees on recognizing phishing, social engineering, and best security practices.'
    });

    recommendations.push({
      icon: '🔄',
      title: 'Incident Response Plan',
      description: 'Develop and test an incident response plan for quick detection and remediation of security breaches.'
    });

    return recommendations;
  };

  const recommendations = getRecommendations();

  // Calculate risk reduction percentage
  const riskReductionPercentage = appliedControls.length > 0
    ? Math.round((mitigatedRisks / risks.length) * 100)
    : 0;

  return (
    <div className="recommendation-section">
      <div className="section-header">
        📋 Security Recommendations & Risk Analysis
      </div>

      {/* Risk Metrics Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(212, 165, 232, 0.1), rgba(255, 180, 214, 0.1))',
          padding: '20px',
          borderRadius: '12px',
          border: '2px solid rgba(212, 165, 232, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9em', color: '#5A4A7A', opacity: 0.7 }}>Total Risks</div>
          <div style={{ fontSize: '2em', fontWeight: '700', color: '#D4A5E8' }}>
            {risks.length}
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(168, 218, 220, 0.1), rgba(193, 240, 246, 0.1))',
          padding: '20px',
          borderRadius: '12px',
          border: '2px solid rgba(168, 218, 220, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9em', color: '#5A4A7A', opacity: 0.7 }}>Mitigated</div>
          <div style={{ fontSize: '2em', fontWeight: '700', color: '#A8DADC' }}>
            {mitigatedRisks}
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(161, 216, 186, 0.1), rgba(168, 216, 186, 0.1))',
          padding: '20px',
          borderRadius: '12px',
          border: '2px solid rgba(161, 216, 186, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9em', color: '#5A4A7A', opacity: 0.7 }}>Risk Reduction</div>
          <div style={{ fontSize: '2em', fontWeight: '700', color: '#A1D8BA' }}>
            {riskReductionPercentage}%
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="recommendations-list">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="recommendation-item"
          >
            <div className="recommendation-icon">{rec.icon}</div>
            <div className="recommendation-content">
              <h4>{rec.title}</h4>
              <p>{rec.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Best Practices Note */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: 'linear-gradient(135deg, rgba(255, 245, 176, 0.3), rgba(255, 180, 214, 0.2))',
        borderRadius: '12px',
        border: '2px solid rgba(212, 165, 232, 0.2)',
        borderLeft: '5px solid #FFF5B0'
      }}>
        <h4 style={{ color: '#D4A5E8', marginBottom: '10px' }}>
          💡 Pro Tips for Maximum Security
        </h4>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          color: '#5A4A7A'
        }}>
          <li style={{ marginBottom: '8px' }}>
            ✅ <strong>Defense in Depth:</strong> Combine multiple controls for overlapping protection
          </li>
          <li style={{ marginBottom: '8px' }}>
            ✅ <strong>Regular Updates:</strong> Keep all systems patched and up-to-date
          </li>
          <li style={{ marginBottom: '8px' }}>
            ✅ <strong>Monitoring:</strong> Implement SIEM/logging for threat detection
          </li>
          <li>
            ✅ <strong>Compliance:</strong> Align with standards like ISO 27001, NIST, GDPR
          </li>
        </ul>
      </div>
    </div>
  );
}