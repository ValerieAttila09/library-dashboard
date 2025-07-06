// LineChart.jsx
import React, { useEffect, useState } from "react";

const SvgElement = ({ widthElement, heightElement, areaPath, linePath }) => {
  return (
    <svg
      viewBox={`0 0 ${widthElement} ${heightElement}`}
      className="w-full h-[9rem] md:h-[5rem] scale-[1.05]"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#lineFill)" />
      <path d={linePath} stroke="#6366f1" strokeWidth="2" fill="none" />
    </svg>
  )
}

export const LineChartIncome = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchDataIncome = async () => {
      const response = await fetch('http://localhost:3000/books/stats')
      const statsData = await response.json()

      if (response.ok) {
        const income = statsData.income.weekly
        setData(income)
      }
    };

    fetchDataIncome();
  }, []);

  if (data.length === 0) return <div>Loading...</div>;

  const width = 540;
  const height = 390;
  const padding = 0;

  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values);
  const stepX = (width - 2 * padding) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (d.value / maxValue) * (height - 2 * padding);
    return [x, y];
  });

  const linePath = points
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");

  const areaPath = `${linePath} L${points[points.length - 1][0]},${height - padding} L${points[0][0]},${height - padding} Z`;

  return (
    <SvgElement widthElement={width} heightElement={height} areaPath={areaPath} linePath={linePath} />
  );
};

export const LineChartLoan = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataIncome = async () => {
      const response = await fetch('http://localhost:3000/books/stats')
      const statsData = await response.json()

      if (response.ok) {
        const loan = statsData.loan.weekly
        setData(loan)
      }
    };

    fetchDataIncome();
  }, []);

  if (data.length === 0) return <div>Loading...</div>;

  const width = 540;
  const height = 390;
  const padding = 0;

  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values);
  const stepX = (width - 2 * padding) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (d.value / maxValue) * (height - 2 * padding);
    return [x, y];
  });

  const linePath = points
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");

  const areaPath = `${linePath} L${points[points.length - 1][0]},${height - padding} L${points[0][0]},${height - padding} Z`;

  return (
    <SvgElement widthElement={width} heightElement={height} areaPath={areaPath} linePath={linePath} />
  );
};

export const LineChartMembers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataIncome = async () => {
      const response = await fetch('http://localhost:3000/books/stats')
      const statsData = await response.json()

      if (response.ok) {
        const members = statsData.members.weekly
        setData(members)
      }
    };

    fetchDataIncome();
  }, []);

  if (data.length === 0) return <div>Loading...</div>;

  const width = 540;
  const height = 390;
  const padding = 0;

  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values);
  const stepX = (width - 2 * padding) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (d.value / maxValue) * (height - 2 * padding);
    return [x, y];
  });

  const linePath = points
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");

  const areaPath = `${linePath} L${points[points.length - 1][0]},${height - padding} L${points[0][0]},${height - padding} Z`;

  return (
    <SvgElement widthElement={width} heightElement={height} areaPath={areaPath} linePath={linePath} />
  );
};
