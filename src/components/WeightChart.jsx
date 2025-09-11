"use client";

import { useMemo } from "react";

export default function WeightChart({ chartData, currentWeek, currentWeight }) {
  // Calculate positions for the custom chart
  const getYPosition = (value) => {
    const minWeight = Math.min(...chartData.map((d) => d.min)) - 5;
    const maxWeight = Math.max(...chartData.map((d) => d.max)) + 5;
    return 250 - ((value - minWeight) / (maxWeight - minWeight)) * 200;
  };

  const getXPosition = (weekValue) => {
    return 50 + (weekValue / 40) * 500;
  };

  const status = useMemo(() => {
    const weekData = chartData.find((d) => d.week === currentWeek);
    if (!weekData) return { status: "normal", text: "Data not available" };

    if (currentWeight < weekData.min) {
      return {
        status: "underweight",
        text: `Your weight is below the recommended range for week ${currentWeek}.`,
      };
    } else if (currentWeight > weekData.max) {
      return {
        status: "overweight",
        text: `Your weight is above the recommended range for week ${currentWeek}.`,
      };
    } else {
      return {
        status: "normal",
        text: `Your weight is within the normal range for week ${currentWeek}.`,
      };
    }
  }, [chartData, currentWeek, currentWeight]);

  return (
    <div className="mt-6">
      <div className="container">
        <header>
          <h1>Pregnancy Weight Tracker</h1>
          <p className="subtitle">
            Monitor your weight gain throughout pregnancy
          </p>
        </header>

        <div className="content">
          <div className="content_section">
            <div className="chart-container">
              <div className="chart-title">
                Weight Progression During Pregnancy
              </div>

              {/* Custom SVG Chart */}
              <div className="custom-chart">
                <svg width="100%" height="100%" viewBox="0 0 600 300">
                  {/* Y-axis labels */}
                  <text x="30" y="50" className="axis-label">
                    {Math.max(...chartData.map((d) => d.max)) + 5}
                  </text>
                  <text x="30" y="150" className="axis-label">
                    {(Math.max(...chartData.map((d) => d.max)) +
                      Math.min(...chartData.map((d) => d.min))) /
                      2}
                  </text>
                  <text x="30" y="250" className="axis-label">
                    {Math.min(...chartData.map((d) => d.min)) - 5}
                  </text>

                  {/* X-axis labels */}
                  <text x="100" y="280" className="axis-label">
                    10
                  </text>
                  <text x="300" y="280" className="axis-label">
                    20
                  </text>
                  <text x="500" y="280" className="axis-label">
                    30
                  </text>

                  {/* Y-axis line */}
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="250"
                    stroke="#ccc"
                    strokeWidth="1"
                  />

                  {/* X-axis line */}
                  <line
                    x1="50"
                    y1="250"
                    x2="550"
                    y2="250"
                    stroke="#ccc"
                    strokeWidth="1"
                  />

                  {/* Ideal range area */}
                  <path
                    d={`M${getXPosition(1)},${getYPosition(
                      chartData[0]?.max
                    )} ${chartData
                      .map(
                        (data) =>
                          `L${getXPosition(data.week)},${getYPosition(
                            data.max
                          )}`
                      )
                      .join(" ")} L${getXPosition(40)},${getYPosition(
                      chartData[chartData.length - 1]?.min
                    )} ${chartData
                      .slice()
                      .reverse()
                      .map(
                        (data) =>
                          `L${getXPosition(data.week)},${getYPosition(
                            data.min
                          )}`
                      )
                      .join(" ")} Z`}
                    fill="rgba(144, 238, 144, 0.3)"
                    stroke="transparent"
                  />

                  {/* Min recommended line */}
                  <path
                    d={`M${getXPosition(1)},${getYPosition(
                      chartData[0]?.min
                    )} ${chartData
                      .map(
                        (data) =>
                          `L${getXPosition(data.week)},${getYPosition(
                            data.min
                          )}`
                      )
                      .join(" ")}`}
                    fill="none"
                    stroke="green"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Max recommended line */}
                  <path
                    d={`M${getXPosition(1)},${getYPosition(
                      chartData[0]?.max
                    )} ${chartData
                      .map(
                        (data) =>
                          `L${getXPosition(data.week)},${getYPosition(
                            data.max
                          )}`
                      )
                      .join(" ")}`}
                    fill="none"
                    stroke="green"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Current weight point */}
                  <circle
                    cx={getXPosition(currentWeek)}
                    cy={getYPosition(currentWeight)}
                    r="6"
                    fill="red"
                    stroke="white"
                    strokeWidth="2"
                  />

                  {/* Week indicator line */}
                  <line
                    x1={getXPosition(currentWeek)}
                    y1="50"
                    x2={getXPosition(currentWeek)}
                    y2="250"
                    stroke="red"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                  />

                  {/* Weight indicator line */}
                  <line
                    x1="50"
                    y1={getYPosition(currentWeight)}
                    x2={getXPosition(currentWeek)}
                    y2={getYPosition(currentWeight)}
                    stroke="red"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                  />

                  {/* Current weight label */}
                  <text
                    x={getXPosition(currentWeek) + 10}
                    y={getYPosition(currentWeight) - 10}
                    className="weight-label"
                  >
                    {currentWeight} kg
                  </text>
                </svg>
              </div>
            </div>

            <div className={`status ${status.status}`}>{status.text}</div>

            <div className="notes">
              <h3>Points To Be Noted</h3>
              <ul>
                <li>
                  The red dot represents your weight gain and the green area
                  represents the ideal range of weight at your pregnancy week.
                </li>
                <li>
                  <strong>Overweight</strong> - If your red dot is above the
                  green area.
                </li>
                <li>
                  <strong>Underweight</strong> - If your red dot is below the
                  green area.
                </li>
                <li>
                  <strong>Normal Weight</strong> - If your red dot is within the
                  green area.
                </li>
              </ul>
            </div>
          </div>

          
        </div>
      </div>

      <style jsx>{`
        .container {
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          width: 100%;
          // max-width: ;
          overflow: hidden;
          // margin: 20px auto;
        }

        header {
          background: #f89d88;
          color: white;
          padding: 20px;
          text-align: center;
        }

        h1 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .subtitle {
          font-size: 14px;
          opacity: 0.9;
        }

        .content {
          padding: 25px;
        }

        .chart-container {
          background: #fde9e6;
          border-radius: 10px;
          
          margin-bottom: 25px;
          border: 1px solid #e1e8ed;
        }

        .chart-title {
          text-align: center;
          margin-bottom: 15px;
          font-size: 18px;
          color: #2c3e50;
          padding: 20px;
          font-weight: 600;
        }

        .custom-chart {
          width: full;
          overflow-x: auto;
        }

        .axis-label {
          font-size: 18px;
          fill: #666;
        }

        .weight-label {
          font-size: 18px;
          fill: red;
          font-weight: bold;
        }

        .notes {
          background: #fff9e6;
          border-left: 4px solid #ffcc00;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .notes h3 {
          color: #e67e22;
          margin-bottom: 15px;
          font-size: 18px;
        }

        .notes ul {
          padding-left: 20px;
        }

        .notes li {
          margin-bottom: 10px;
          line-height: 1.5;
        }

        .status {
          margin-top: 20px;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
        }

        .normal {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .underweight {
          background: #fff3e0;
          color: #ef6c00;
        }

        .overweight {
          background: #ffebee;
          color: #c62828;
        }

        @media (max-width: 768px) {
          .weight-input {
            flex-direction: column;
          }

          button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
