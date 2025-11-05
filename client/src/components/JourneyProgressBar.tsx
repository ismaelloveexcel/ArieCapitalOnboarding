import { motion } from "framer-motion";

interface JourneyProgressBarProps {
  progress: number;
}

export default function JourneyProgressBar({ progress }: JourneyProgressBarProps) {
  return (
    <div className="w-full bg-border rounded-full h-2 overflow-hidden" data-testid="journey-progress-bar">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan to-primary relative"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
}
