import { CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type VerificationStatus = "Verified" | "Pending" | "Rejected" | "Warning";

interface VerificationBadgeProps {
  status: VerificationStatus;
}

const statusConfig = {
  Verified: {
    icon: CheckCircle2,
    className: "bg-cyan/10 text-cyan border-cyan",
  },
  Pending: {
    icon: Clock,
    className: "bg-amber-500/10 text-amber-700 border-amber-400",
  },
  Rejected: {
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive",
  },
  Warning: {
    icon: AlertTriangle,
    className: "bg-amber-500/10 text-amber-700 border-amber-400",
  },
};

export default function VerificationBadge({ status }: VerificationBadgeProps) {
  const config = statusConfig[status] || statusConfig.Pending;
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center gap-1 text-xs ${config.className}`}
      data-testid={`badge-${status.toLowerCase()}`}
    >
      <Icon className="w-3 h-3" />
      {status}
    </Badge>
  );
}
