import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export default function CIAChart({ cia }) {
  const total = cia.confidentiality + cia.integrity + cia.availability || 1;

  const data = [
    {
      name: '🔓 Confidentiality',
      value: Math.round((cia.confidentiality / total) * 100),
      rawValue: cia.confidentiality
    },
    {
      name: '✏️ Integrity',
      value: Math.round((cia.integrity / total) * 100),
      rawValue: cia.integrity
    },
    {
      name: '⏹️ Availability',
      value: Math.round((cia.availability / total) * 100),
      rawValue: cia.availability
    }
  ];

  const COLORS = ['#FFB4D6', '#A8DADC', '#FFF5B0'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'white',
          padding: '12px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '2px solid #D4A5E8'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#5A4A7A' }}>
            {payload[0].name}
          </p>
          <p style={{ margin: '5px 0 0 0', color: '#D4A5E8', fontWeight: 'bold' }}>
            {payload[0].value}% ({payload[0].payload.rawValue} points)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, value }) => `${name}: ${value}%`}
          outerRadius={130}
          fill="#8884d8"
          dataKey="value"
          animationBegin={0}
          animationDuration={800}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ paddingTop: '20px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}