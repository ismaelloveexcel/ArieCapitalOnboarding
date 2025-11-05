import ConfettiCelebration from '../ConfettiCelebration';

export default function ConfettiCelebrationExample() {
  return (
    <div className="relative h-96 bg-background overflow-hidden">
      <ConfettiCelebration />
      <div className="relative z-10 flex items-center justify-center h-full">
        <p className="text-lg font-semibold">Confetti Effect</p>
      </div>
    </div>
  );
}
