import React, { useEffect, useState } from "react";
import "./CountdownToNewYear.css";

const CountdownToNewYear = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [newYearMessage, setNewYearMessage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("black");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextYear = now.getFullYear() + 1;
      const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
      const difference = newYear - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
        setNewYearMessage("");
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setNewYearMessage("Sretna Nova 2025!");
        startBackgroundColorChange();
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const startBackgroundColorChange = () => {
    let changes = 0;
    const interval = setInterval(() => {
      setBackgroundColor(getRandomColor());
      changes++;
      if (changes >= 5) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="countdown-container" style={{ backgroundColor }}>
      {newYearMessage ? (
        <div className="new-year-message">{newYearMessage}</div>
      ) : (
        <>
          <div className="countdown-item">
            <div className="countdown-label">Dana</div>
            <div className="countdown-value">{timeLeft.days}</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-label">Sati</div>
            <div className="countdown-value">{timeLeft.hours}</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-label">Minuta</div>
            <div className="countdown-value">{timeLeft.minutes}</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-label">Sekundi</div>
            <div className="countdown-value">{timeLeft.seconds}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default CountdownToNewYear;
