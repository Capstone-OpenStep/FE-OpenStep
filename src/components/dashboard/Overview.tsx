import React, { useState } from 'react';
import styles from './Overview.module.css';
import GitHubCalendar from 'react-github-calendar';
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";

const issueData = [
  { label: "bug", value: 35 },
  { label: "feature", value: 20 },
  { label: "documentation", value: 10 },
  { label: "enhancement", value: 15 },
  { label: "question", value: 5 },
  { label: "help wanted", value: 5 },
  { label: "good first issue", value: 3 },
  { label: "wontfix", value: 2 },
  { label: "duplicate", value: 3 },
  { label: "invalid", value: 2 },
];

const labelColors = {
  bug: "#c53030",             
  feature: "#60c6d2",         
  documentation: "#005fa3",   
  enhancement: "#42b7c4",     
  question: "#b072cc",        
  "help wanted": "#00745c",   
  "good first issue": "#573bff", 
  wontfix: "#6e7781",        
  duplicate: "#a0a4a8",       
  invalid: "#c0b800",         
};

const getColor = (label) => {
  return labelColors[label] || "#ccc";
};


function DonutChart({ width = 190, height = 190 }) {
  const radius = Math.min(width, height) / 2;
  const innerRadius = radius * 0.6;

  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event, label) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredLabel(label);
    setTooltipPos({
      x: event.clientX - rect.left + 10,
      y: event.clientY - rect.top + 10,
    });
  };

  return (
    <div style={{ position: "relative", width, height, left:35, top: 45}}>
      <svg width={width} height={height}>
        <Group top={height / 2} left={width / 2}>
          <Pie
            data={issueData}
            pieValue={(d) => d.value}
            outerRadius={radius}
            innerRadius={innerRadius}
            cornerRadius={3}
          >
            {(pie) =>
              pie.arcs.map((arc, i) => (
                <path
                  key={`arc-${arc.data.label}`}
                  d={pie.path(arc) || ""}
                  fill={getColor(arc.data.label)}
                  stroke="#fff"
                  strokeWidth={1}
                  onMouseMove={(e) => handleMouseMove(e, arc.data.label)}
                  onMouseLeave={() => setHoveredLabel(null)}
                />
              ))
            }
          </Pie>
          <circle r={innerRadius - 5} fill="#fff" />
        </Group>
      </svg>

      {hoveredLabel && (
        <div
          style={{
            position: "absolute",
            top: tooltipPos.y,
            left: tooltipPos.x,
            backgroundColor: "#000",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "14px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {hoveredLabel}
        </div>
      )}
    </div>
  );
}

function IssueDetails({ data }) {
  const [expanded, setExpanded] = useState(false);

  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const shownData = expanded ? sortedData : sortedData.slice(0, 6);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      style={{
        width: 500,
        minHeight: 190,
        position: 'relative',
        marginTop: 35,
        marginBottom: 35,
        fontFamily: '"Noto Sans KR", sans-serif',
        fontSize: 14,
        marginLeft: 35,
        paddingRight: 10,
        left: 50,
      }}
    >
      {/* 제목과 버튼을 flex로 나란히 배치 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>레벨</h3>
        {sortedData.length > 6 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            style={{
              fontSize: 14,
              cursor: 'pointer',
              background: '#d7d7d7',
              border: '1px solid #ccc',
              padding: '6px 10px',
              borderRadius: 4,
              height: 40,
            }}
          >
            {expanded ? '간단히' : '자세히'}
          </button>
        )}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th align="left">Label</th>
            <th align="right">수</th>
            <th align="right">비율</th>
          </tr>
        </thead>
        <tbody>
          {shownData.map((item) => (
            <tr key={item.label} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ color: getColor(item.label), padding: '8px 0' }}>{item.label}</td>
              <td align="right">{item.value}</td>
              <td align="right">{((item.value / total) * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Overview: React.FC = () => {

  return (
    <div className={styles.boardBody}>
      {/* <span className={styles.title}>태그 분포</span> */}
      <div className={styles.circleGraph}>
        <DonutChart/>
        <IssueDetails data={issueData} />
      </div>
      <div className={styles.githubCalendar}>
        <GitHubCalendar username="allorak333" colorScheme='light' blockSize={11}/>
      </div>
    </div>
  );
};

export default Overview;
