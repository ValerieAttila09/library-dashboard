import React, { useEffect, useState } from "react";

const SvgElement = ({
  widthElement,
  heightElement,
  hoveredPointElement,
  setHoveredPointElement,
  pointsElement,
  areaPathElement,
  smoothPathElement,
  maxIndexElement
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-xl mx-auto relative">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Weekly Line Chart</h2>

      <svg
        viewBox={`0 0 ${widthElement} ${heightElement}`}
        className="w-full h-60"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Fill Area */}
        <path d={areaPathElement} fill="url(#lineFill)" />

        {/* Smooth Line */}
        <path d={smoothPathElement} stroke="#6366f1" strokeWidth="2" fill="none" />

        {/* Data Points + Hover Events */}
        {pointsElement.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="5"
              fill={i === maxIndexElement ? "#f59e0b" : "#6366f1"}
              className="cursor-pointer transition duration-200"
              onMouseEnter={() => setHoveredPointElement(p)}
              onMouseLeave={() => setHoveredPointElement(null)}
            />
          </g>
        ))}

        {/* Max Value Label */}
        <text
          x={pointsElement[maxIndexElement].x}
          y={pointsElement[maxIndexElement].y - 12}
          fontSize="12"
          fill="#f59e0b"
          textAnchor="middle"
          className="font-semibold"
        >
          Max: {pointsElement[maxIndexElement].value}
        </text>

        {/* Tooltip on Hovered Point */}
        {hoveredPointElement && (
          <g>
            <rect
              x={hoveredPointElement.x - 20}
              y={hoveredPointElement.y - 35}
              width="40"
              height="20"
              rx="4"
              fill="#111827"
              opacity="0.9"
            />
            <text
              x={hoveredPointElement.x}
              y={hoveredPointElement.y - 20}
              fontSize="12"
              fill="#ffffff"
              textAnchor="middle"
              className="font-medium"
            >
              {hoveredPointElement.value}
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}

export const LineChartIncome = () => {
  const [data, setData] = useState([]);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/books/stats')
      const statsData = await response.json()

      if (response.ok) {
        const income = statsData.income.weekly
        setData(income);
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) return <div>Loading...</div>;

  const width = 500;
  const height = 200;
  const padding = 30;

  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values);
  const maxIndex = values.indexOf(maxValue);
  const stepX = (width - 2 * padding) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (d.value / maxValue) * (height - 2 * padding);
    return { x, y, ...d };
  });

  const getSmoothPath = (pts) => {
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const midX = (prev.x + curr.x) / 2;
      d += ` Q${prev.x},${prev.y} ${midX},${(prev.y + curr.y) / 2}`;
    }
    const last = pts[pts.length - 1];
    d += ` T${last.x},${last.y}`;
    return d;
  };

  const smoothPath = getSmoothPath(points);
  const areaPath = `${smoothPath} L${points[points.length - 1].x},${height - padding} L${points[0].x},${height - padding} Z`;

  return (
    <SvgElement
      widthElement={width}
      heightElement={height}
      hoveredPointElement={hoveredPoint}
      setHoveredPointElement={setHoveredPoint}
      areaPathElement={areaPath}
      smoothPathElement={smoothPath}
      pointsElement={points}
      maxIndexElement={maxIndex}
    />
  );
};

export const LineChartLoan = () => {
  const [data, setData] = useState([]);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/books/stats')
      const statsData = await response.json()

      if (response.ok) {
        const income = statsData.loan.weekly
        setData(income);
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) return <div>Loading...</div>;

  const width = 500;
  const height = 200;
  const padding = 30;

  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values);
  const maxIndex = values.indexOf(maxValue);
  const stepX = (width - 2 * padding) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (d.value / maxValue) * (height - 2 * padding);
    return { x, y, ...d };
  });

  const getSmoothPath = (pts) => {
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const midX = (prev.x + curr.x) / 2;
      d += ` Q${prev.x},${prev.y} ${midX},${(prev.y + curr.y) / 2}`;
    }
    const last = pts[pts.length - 1];
    d += ` T${last.x},${last.y}`;
    return d;
  };

  const smoothPath = getSmoothPath(points);
  const areaPath = `${smoothPath} L${points[points.length - 1].x},${height - padding} L${points[0].x},${height - padding} Z`;

  return (
    <SvgElement
      widthElement={width}
      heightElement={height}
      hoveredPointElement={hoveredPoint}
      setHoveredPointElement={setHoveredPoint}
      areaPathElement={areaPath}
      smoothPathElement={smoothPath}
      pointsElement={points}
      maxIndexElement={maxIndex}
    />
  );
};

export const LineChartMembers = () => {
  const [data, setData] = useState([]);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/books/stats')
      const statsData = await response.json()

      if (response.ok) {
        const income = statsData.members.weekly
        setData(income);
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) return <div>Loading...</div>;

  const width = 500;
  const height = 200;
  const padding = 30;

  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values);
  const maxIndex = values.indexOf(maxValue);
  const stepX = (width - 2 * padding) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (d.value / maxValue) * (height - 2 * padding);
    return { x, y, ...d };
  });

  const getSmoothPath = (pts) => {
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const midX = (prev.x + curr.x) / 2;
      d += ` Q${prev.x},${prev.y} ${midX},${(prev.y + curr.y) / 2}`;
    }
    const last = pts[pts.length - 1];
    d += ` T${last.x},${last.y}`;
    return d;
  };

  const smoothPath = getSmoothPath(points);
  const areaPath = `${smoothPath} L${points[points.length - 1].x},${height - padding} L${points[0].x},${height - padding} Z`;

  return (
    <SvgElement
      widthElement={width}
      heightElement={height}
      hoveredPointElement={hoveredPoint}
      setHoveredPointElement={setHoveredPoint}
      areaPathElement={areaPath}
      smoothPathElement={smoothPath}
      pointsElement={points}
      maxIndexElement={maxIndex}
    />
  );
};

