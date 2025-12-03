import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";
import TiltedCard from "../../Components/Cards/TItledCard";

const statsData = [
  {
    title: "Ukupno prijava",
    value: "112",
    imageSrc: "/public/submissions.png",
    overlayContent: "Prijave problema",
  },
  {
    title: "Ukupno glasova",
    value: "237",
    imageSrc: "/public/votes.jpg",
    overlayContent: "Glasovi korisnika",
  },
  {
    title: "Aktivni konkursi",
    value: "5",
    imageSrc: "/public/competitions.png",
    overlayContent: "Ongoing competitions",
  },
  {
    title: "Nagrade / Finansiranje",
    value: "3 projekta",
    imageSrc: "/public/funding.png",
    overlayContent: "Podrška najboljim idejama",
  },
];

// Example data for submissions per day (Monday–Sunday)
const lineData = [
  { name: "Pon", prijave: 12, glasovi: 34 },
  { name: "Uto", prijave: 20, glasovi: 42 },
  { name: "Sre", prijave: 18, glasovi: 28 },
  { name: "Čet", prijave: 25, glasovi: 50 },
  { name: "Pet", prijave: 22, glasovi: 48 },
  { name: "Sub", prijave: 15, glasovi: 20 },
  { name: "Ned", prijave: 10, glasovi: 15 },
];

// Example data for top problem categories (Pie)
const pieData = [
  { name: "Zagađenje", value: 30 },
  { name: "Transport", value: 25 },
  { name: "Turizam", value: 20 },
  { name: "Tehnologija", value: 15 },
  { name: "Obrazovanje", value: 10 },
];

const COLORS = ["#4e9eff", "#00C49F", "#FFBB28", "#FF8042", "#A8B5C7"];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard Inovacija</h1>

      <div className="charts-container">
        {/* Line Chart */}
        <div className="chart-card">
          <h2>Prijave problema i glasovi po danima</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="prijave"
                stroke="#4e9eff"
                name="Prijave"
              />
              <Line
                type="monotone"
                dataKey="glasovi"
                stroke="#00C49F"
                name="Glasovi"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-card">
          <h2>Top kategorije problema</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        {statsData.map((stat, index) => (
          <TiltedCard
            key={index}
            imageSrc={stat.imageSrc}
            captionText={`${stat.title}: ${stat.value}`}
            containerWidth="14rem"
            containerHeight="14rem"
            imageWidth="14rem"
            imageHeight="14rem"
            scaleOnHover={1.05}
            rotateAmplitude={10}
            displayOverlayContent={true}
            overlayContent={
              <div
                style={{
                  padding: "0.5rem",
                  fontWeight: "bold",
                  color: "#1d1919ff",
                }}
              >
                {stat.overlayContent}
              </div>
            }
            showMobileWarning={false}
          />
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
