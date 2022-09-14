import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

export const Timer: React.FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1);
  }

  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1);
  }

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const callback = currentPlayer?.color === Colors.WHITE
      ? decrementWhiteTimer
      : decrementBlackTimer;

    timer.current = setInterval(callback, 1000);
  }

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  const handleRestart = () => {
    setBlackTime(300);
    setWhiteTime(300);
    restart();
  };

  return (
    <div>
      <div>
        <button type="button" onClick={handleRestart}>Restart game</button>
      </div>
      <h2>{`Black - ${blackTime}`}</h2>
      <h2>{`White - ${whiteTime}`}</h2>
    </div>
  );
};
