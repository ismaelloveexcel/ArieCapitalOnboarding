import { CheckCircle2 } from "lucide-react";

interface ProgressTabsProps {
  steps: string[];
  activeStep: number;
  onStepClick: (step: number) => void;
  completedSteps?: number[];
}

export default function ProgressTabs({
  steps,
  activeStep,
  onStepClick,
  completedSteps = [],
}: ProgressTabsProps) {
  return (
    <nav className="flex bg-white rounded-md shadow-sm overflow-hidden border" data-testid="progress-tabs">
      {steps.map((label, index) => {
        const isActive = activeStep === index;
        const isCompleted = completedSteps.includes(index);
        const isClickable = isCompleted || index <= activeStep;

        return (
          <button
            key={label}
            onClick={() => isClickable && onStepClick(index)}
            disabled={!isClickable}
            className={`flex-1 px-3 py-3 text-sm border-r last:border-0 transition-colors ${
              isActive
                ? "bg-navy text-white font-medium"
                : isCompleted
                ? "bg-cyan/10 text-cyan hover:bg-cyan/20 cursor-pointer"
                : "bg-background text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
            data-testid={`tab-step-${index + 1}`}
          >
            <div className="flex items-center justify-center gap-1 text-xs opacity-75 mb-0.5">
              {isCompleted && !isActive ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : null}
              <span>Step {index + 1}</span>
            </div>
            <div className="mt-0.5 truncate">{label}</div>
          </button>
        );
      })}
    </nav>
  );
}
