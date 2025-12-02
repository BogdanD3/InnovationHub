import React from "react";
import "./Home.css";

const activeChats = [
  {
    title: "Zagušenja u saobraćaju u Podgorici",
    lastMessage: "Diskusija u toku...",
  },
  {
    title: "Nadogradnja tehnološke opreme u školama",
    lastMessage: "Prijave ideja u toku...",
  },
  {
    title: "Rešenja za upravljanje otpadom",
    lastMessage: "Čekamo povratne informacije...",
  },
];

const Home = () => {
  return (
    <div className="home">
      {/* Header */}
      <header className="home-header">
        <h1>Cross-Border Innovation Hub</h1>
        <p>
          Platforma gde građani identifikuju lokalne probleme i sarađuju na
          inovativnim rešenjima.
        </p>
      </header>

      {/* Grid + Form */}
      <div className="home-main">
        {/* Active chats */}
        <div className="chat-grid">
          {activeChats.map((chat, index) => (
            <div key={index} className="chat-card">
              <h3>{chat.title}</h3>
              <p>{chat.lastMessage}</p>
            </div>
          ))}
        </div>

        {/* Problem submission form */}
        <div className="problem-form">
          <h3>Predložite problem</h3>
          <input type="text" placeholder="Naslov problema" />
          <textarea placeholder="Opis problema"></textarea>
          <select>
            <option>Kategorija</option>
            <option>Saobraćaj</option>
            <option>Tehnologija</option>
            <option>Životna sredina</option>
            <option>Obrazovanje</option>
          </select>
          <button>Pošalji</button>
        </div>
      </div>

      {/* Follow-up section */}
      <section className="follow-up">
        <h2>Kako funkcioniše</h2>
        <p>
          Identifikujte problem, glasajte za najvažnije izazove, predložite
          svoje rešenje i sarađujte sa mentorima kako biste napravili stvarni
          uticaj u svojoj zajednici.
        </p>
      </section>
    </div>
  );
};

export default Home;
