import { motion } from "framer-motion";
import { CheckCircle2, Circle, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type StageStatus = "pending" | "active" | "completed";

interface CardStageProps {
  title: string;
  icon: LucideIcon;
  status: StageStatus;
  number: number;
  children?: React.ReactNode;
}

export default function CardStage({
  title,
  icon: Icon,
  status,
  number,
  children,
}: CardStageProps) {
  const isActive = status === "active";
  const isCompleted = status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{
        opacity: 1,
        rotateY: 0,
        scale: isActive ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="h-full"
      data-testid={`card-stage-${number}`}
    >
      <Card
        className={`h-full transition-all ${
          isActive
            ? "ring-2 ring-cyan shadow-lg shadow-cyan/20"
            : isCompleted
            ? "border-cyan/50"
            : ""
        }`}
      >
        <CardHeader className="space-y-0 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isCompleted
                    ? "bg-cyan text-white"
                    : isActive
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Step {number}
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
              </div>
            </div>
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-cyan" data-testid="icon-completed" />
            ) : (
              <Circle className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive || isCompleted ? 1 : 0.5, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {children}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
