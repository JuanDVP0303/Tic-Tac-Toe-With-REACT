import { Square } from "./Square";
export function WinModal({ winner, resetGame }) {
  const result = winner ? (
    <Square>{winner}</Square>
  ) : (
    <span style={{ padding: "12px" }}>Ha sido un empate!</span>
  );
  const winText = winner == false ? "Empate" : "Ganó:";

  const removeSection = () =>{
    document.getElementById("winner-section").style.display = "none"
  }

  return (
    <section id="winner-section" className="winner">
      <button className="remove" onClick={removeSection}>X</button>
      <div className="text">
        <h2>{winText}</h2>

        <header className="win">{result}</header>
        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
