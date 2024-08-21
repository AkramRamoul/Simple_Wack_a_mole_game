import "./App.css";
import mole from "./assets/molehole.png";
import hole from "./assets/mole.png";
import { useEffect, useState } from "react";

function App() {
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState<number>(0);

  const setMole = (index: number, vis: boolean) => {
    setMoles((currentMole) => {
      const newMoles = [...currentMole];
      newMoles[index] = vis;
      return newMoles;
    });
  };

  const wackMole = (index: number) => {
    if (moles[index] === false) return;
    setMole(index, false);
    setScore((prevScore) => prevScore + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMole(randomIndex, true);
      setTimeout(() => {
        setMole(randomIndex, false);
      }, 1000);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Score: {score}</h2>
      <div className="grid">
        {moles.map((isMole, index) => (
          <img
            key={index}
            src={isMole ? mole : hole}
            alt={isMole ? "Mole" : "Hole"}
            onClick={() => {
              wackMole(index);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
