import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Confetti {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
}

export default function ConfettiCelebration() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const colors = ["#00a0df", "#002b5c", "#b3c0c9", "#FFD700", "#FF69B4"];
    const pieces: Confetti[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" data-testid="confetti-celebration">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: "-10%",
            backgroundColor: piece.color,
          }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: "120vh",
            rotate: 360 * 3,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
