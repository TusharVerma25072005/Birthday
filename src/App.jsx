import { useEffect, useState } from 'react';
import './App.css';
import picture from './assets/priyanshi.jpg';
import icon from './assets/heart.png';
import heart from './assets/red-heart-balloon.png';
import Confetti from "react-confetti";

function App() {
  return (
    <div className='app-container'>
      <FloatingHearts />
      <ConfettiBackground />
      <div className='half-div half-div-up animate-shrink'>
        <HeartPop />
      </div>
      <div className='half-div half-div-down animate-expand'>
        <ProfilePicture />
        <Wishes />
      </div>
    </div>
  );
}


function ConfettiBackground() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Delay confetti effect by 7 seconds
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return showConfetti ? (
    <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={100} />
  ) : null; // Show confetti only after 7 seconds
}

function ProfilePicture() {
  return (
    <div className="picture-container animate-down">
      <img src={picture} alt="picture" className='main-picture' />
    </div>
  );
}

function Wishes() {
  return (
    <div className="wishes-container animate-up">
      <h1>
        {"Wishing You a Very    Happy Birthday!".split("" ).map((char, index) => (
          <span
            key={index}
            style={{ animationDelay: `${6.5 + index * 0.1}s` }}
            className="letter"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
      <h3>
        {"May you receive everything you desire  and  all your dreams come true.".split("").map((char, index) => (
          <span
            key={index}
            style={{ animationDelay: `${6.5 + 4 + index * 0.05}s` }}
            className="letter"
          >
            {char === " " ? "\u00A0" : char} 
          </span>
        ))}
      </h3>
    </div>
  );
}

function HeartPop() {
  return (
    <div className='heart-container'>
      <img src={icon} alt="icon" className='heart-icon heart-bounce' />
    </div>
  );
}

function FloatingHearts() {
  const [startFloating, setStartFloating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartFloating(true);
    }, 7000); // 7-second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='floating-hearts-background'>
      {startFloating && Array.from({ length: 10 }).map((_, index) => (
        <img
          key={index}
          src={heart}
          alt="floating-heart"
          className='floating-heart'
          style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}
        />
      ))}
    </div>
  );
}

export default App;
