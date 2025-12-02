import React, { useState } from "react";
import "./Problems.css";

interface Problem {
  title: string;
  votes: number;
  category: string;
  status: string;
}

const allProblems: Problem[] = [
  {
    title: "Zagušenja u Podgorici",
    votes: 120,
    category: "Saobraćaj",
    status: "U toku",
  },
  {
    title: "Školske tehnološke nadogradnje",
    votes: 95,
    category: "Obrazovanje",
    status: "U toku",
  },
  {
    title: "Rešenja za otpad",
    votes: 85,
    category: "Životna sredina",
    status: "U toku",
  },
  {
    title: "Parking problemi",
    votes: 70,
    category: "Saobraćaj",
    status: "U toku",
  },
  {
    title: "Digitalizacija biblioteka",
    votes: 60,
    category: "Tehnologija",
    status: "U toku",
  },
  {
    title: "Solarni paneli u školama",
    votes: 50,
    category: "Obrazovanje",
    status: "U toku",
  },
  {
    title: "Pametni semafori",
    votes: 45,
    category: "Saobraćaj",
    status: "U toku",
  },
  {
    title: "Reciklaža plastike",
    votes: 35,
    category: "Životna sredina",
    status: "U toku",
  },
  {
    title: "Aplikacija za prijavu problema",
    votes: 30,
    category: "Tehnologija",
    status: "U toku",
  },
];

const Problems = () => {
  const [filter, setFilter] = useState<string>("Sve");

  const filteredProblems =
    filter === "Sve"
      ? allProblems
      : allProblems.filter((p) => p.category === filter);

  return (
    <div className="problems-page">
      <header className="problems-header">
        <h1>Pregled problema</h1>
        <p>
          Otkrijte najvažnije izazove i glasajte za one koje želite da se reše.
        </p>
      </header>

      {/* Leaderboard */}
      <section className="leaderboard">
        <h2>Top Problemi</h2>
        <div className="leaderboard-grid">
          {allProblems
            .sort((a, b) => b.votes - a.votes)
            .slice(0, 5)
            .map((p, index) => (
              <div key={index} className={`leader-card top-${index + 1}`}>
                <h3>{p.title}</h3>
                <p>Kategorija: {p.category}</p>
                <p>Glasovi: {p.votes}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Filter */}
      <section className="filter-section">
        <button onClick={() => setFilter("Sve")}>Sve</button>
        <button onClick={() => setFilter("Saobraćaj")}>Saobraćaj</button>
        <button onClick={() => setFilter("Tehnologija")}>Tehnologija</button>
        <button onClick={() => setFilter("Životna sredina")}>
          Životna sredina
        </button>
        <button onClick={() => setFilter("Obrazovanje")}>Obrazovanje</button>
      </section>

      {/* Problem list */}
      <section className="problem-list">
        {filteredProblems.map((p, index) => (
          <div key={index} className="problem-card">
            <h3>{p.title}</h3>
            <p>Kategorija: {p.category}</p>
            <p>Status: {p.status}</p>
            <p>Glasovi: {p.votes}</p>
          </div>
        ))}
      </section>

      {/* Scroll filler / follow-up section */}
      <section className="problems-follow-up">
        <h2>Vaš glas menja stvari</h2>
        <p>
          Aktivno učestvujte i predložite rešenja za probleme u vašoj zajednici.
          Najpopularniji problemi idu u mentorski program i konkretne akcije.
        </p>
      </section>
    </div>
  );
};

export default Problems;
