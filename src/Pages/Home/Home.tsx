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
    <div className="home-container">
      <div className="home-content">
        <div className="home-main">
          <div className="chat-grid">
            {activeChats.map((chat, index) => (
              <div key={index} className="chat-card">
                <h3>{chat.title}</h3>
                <p>{chat.lastMessage}</p>
              </div>
            ))}
          </div>

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

        <section className="follow-up">
          <h2>Kako funkcioniše</h2>
          <p>
            Identifikujte problem, glasajte za izazove, predložite rešenje i
            sarađujte sa mentorima da stvorite stvarni uticaj.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
