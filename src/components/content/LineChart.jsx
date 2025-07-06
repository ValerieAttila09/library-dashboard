import React, { useEffect, useState } from "react";

const SvgElement = ({
  widthElement,
  heightElement,
  areaPathElement,
  smoothPathElement,
}) => {
  return (
      <svg
        viewBox={`0 0 ${widthElement} ${heightElement}`}
        className="w-full h-30"
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
      </svg>
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
  const padding = 0;

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
  const padding = 0;

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
  const padding = 0;

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
    />
  );
};

