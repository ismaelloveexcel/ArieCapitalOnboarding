interface ProgressTabsProps {
  steps: string[];
  activeStep: number;
  onStepClick: (step: number) => void;
}

export default function ProgressTabs({ steps, activeStep, onStepClick }: ProgressTabsProps) {
  return (
    <nav className="flex bg-white rounded-md shadow-sm overflow-hidden border" data-testid="progress-tabs">
      {steps.map((label, index) => (
        <button
          key={label}
          onClick={() => onStepClick(index)}
          className={`flex-1 px-4 py-3 text-sm border-r last:border-0 transition-colors ${
            activeStep === index
              ? "bg-navy text-white font-medium"
              : "bg-background text-muted-foreground hover:bg-muted"
          }`}
          data-testid={`tab-step-${index + 1}`}
        >
          <div className="text-xs opacity-75">Step {index + 1}</div>
          <div className="mt-0.5">{label}</div>
        </button>
      ))}
    </nav>
  );
}
