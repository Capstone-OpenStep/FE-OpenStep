import React, { useState } from 'react';
import styles from './Overview.module.css';
import GitHubCalendar from 'react-github-calendar';
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { TaskStatistic } from '../../types/task';


const labelColors = {
  bug: "#D32F2F", // Dark Red
  feature: "#1976D2", // Deep Blue
  refactor: "#388E3C", // Forest Green
  "good first issue": "#FBC02D", // Goldenrod
  chore: "#7B1FA2", // Dark Grayish Blue
  other: "#546E7A", // Deep Purple
};

const getColor = (label: string): string => {
  return labelColors[label] || "#ccc";
};

interface ChartDataItem {
  label: string;
  value: number;
}

interface DonutChartProps {
  width?: number;
  height?: number;
  data: ChartDataItem[];
}

function DonutChart({ width = 190, height = 190, data }: DonutChartProps) {
  const radius = Math.min(width, height) / 2;
  const innerRadius = radius * 0.6;

  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<SVGPathElement>, label: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredLabel(label);
    setTooltipPos({
      x: event.clientX - rect.left + 10,
      y: event.clientY - rect.top + 10,
    });
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div style={{ position: "relative", width, height, left: 35, top: 45 }}>
      <svg width={width} height={height}>
        <Group top={height / 2} left={width / 2}>
          {total === 0 ? (
            // 기여 이력이 없을 시 회색으로 렌더
            <circle r={radius} fill="#e0e0e0" stroke="#ccc" strokeWidth={1} />
          ) : (
            <Pie<ChartDataItem>
              data={data}
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
          )}
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
      {total === 0 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          fontSize: '12px',
          color: '#888',
        }}>
          데이터 없음
        </div>
      )}
    </div>
  );
}

interface IssueDetailsDataItem {
  label: string;
  value: number;
}

interface IssueDetailsProps {
  data: IssueDetailsDataItem[];
}

function IssueDetails({ data }: IssueDetailsProps) {
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
            <th style={{ textAlign: 'right' }}>수</th>
            <th style={{ textAlign: 'right' }}>비율</th>
          </tr>
        </thead>
        <tbody>
          {shownData.map((item) => (
            <tr key={item.label} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ color: getColor(item.label), padding: '8px 0' }}>{item.label}</td>
              <td align="right">{item.value}</td>
              <td align="right">
                {total === 0 // NAN 방지
                  ? "0%"
                  : `${((item.value / total) * 100).toFixed(1)}%`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface OverviewProps {
  taskStatistic: TaskStatistic;
}

const Overview: React.FC<OverviewProps> = ({ taskStatistic }) => {
  const formattedTaskData = Object.entries(taskStatistic).map(([label, value]) => ({
    label,
    value,
  }));

  const username: string | null = sessionStorage.getItem('username');

  return (
    <div className={styles.boardBody}>
      <div className={styles.circleGraph}>
        <DonutChart data={formattedTaskData} />
        <IssueDetails data={formattedTaskData} />
      </div>
      <div className={styles.githubCalendar}>
        {username === null ? (null) : (<GitHubCalendar username={username} colorScheme='light' blockSize={11} />)}
      </div>
    </div>
  );
};

export default Overview;