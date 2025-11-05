import { CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export type StatusType = "verified" | "warning" | "rejected" | "pending";

interface StatusChipProps {
  status: StatusType;
}

const statusConfig = {
  verified: {
    icon: CheckCircle2,
    label: "Verified",
    className: "bg-cyan text-white border-cyan",
  },
  warning: {
    icon: AlertTriangle,
    label: "Check",
    className: "bg-amber-500 text-navy border-amber-500",
  },
  rejected: {
    icon: XCircle,
    label: "Invalid",
    className: "bg-destructive text-destructive-foreground border-destructive",
  },
  pending: {
    icon: Clock,
    label: "Pending",
    className: "bg-muted text-muted-foreground border-muted",
  },
};

export default function StatusChip({ status }: StatusChipProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      data-testid={`status-chip-${status}`}
    >
      <Badge className={`flex items-center gap-1 text-xs font-medium ${config.className}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    </motion.div>
  );
}
