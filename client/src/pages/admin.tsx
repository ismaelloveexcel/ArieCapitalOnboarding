import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VerificationBadge, { type VerificationStatus } from "@/components/VerificationBadge";
import { Download, Search, Building2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Application } from "@shared/schema";
import { useState } from "react";

export default function Admin() {
  const [filter, setFilter] = useState<"all" | "submitted" | "in_progress">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: applications = [], isLoading } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  const filteredApplications = applications.filter((app) => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch =
      app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.entityData &&
        JSON.stringify(app.entityData).toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: applications.length,
    submitted: applications.filter((e) => e.status === "submitted").length,
    inProgress: applications.filter((e) => e.status === "in_progress").length,
  };

  const getVerificationStatus = (app: Application): VerificationStatus => {
    if (app.status === "submitted") {
      if ((app.complianceScore ?? 0) >= 80) return "Verified";
      if ((app.complianceScore ?? 0) >= 60) return "Warning";
      return "Pending";
    }
    return "Pending";
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-admin-title">
            Application Review Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage corporate account applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-stat-total">
                {stats.total}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-cyan" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan" data-testid="text-stat-submitted">
                {stats.submitted}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.submitted / stats.total) * 100) : 0}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-stat-in-progress">
                {stats.inProgress}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>Application Records</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
                    className="pl-9 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("all")}
                    data-testid="button-filter-all"
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === "submitted" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("submitted")}
                    data-testid="button-filter-submitted"
                  >
                    Submitted
                  </Button>
                  <Button
                    variant={filter === "in_progress" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("in_progress")}
                    data-testid="button-filter-in-progress"
                  >
                    In Progress
                  </Button>
                </div>
                <Button data-testid="button-export-all">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <p className="text-muted-foreground">Loading applications...</p>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="flex items-center justify-center h-48">
                <p className="text-muted-foreground">No applications found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference Number</TableHead>
                    <TableHead>Current Stage</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Compliance Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id} data-testid={`row-application-${app.id}`}>
                      <TableCell
                        className="font-mono text-xs"
                        data-testid={`text-id-${app.id}`}
                      >
                        {app.referenceNumber}
                      </TableCell>
                      <TableCell>
                        Stage {app.currentStage + 1}/5
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {app.submittedAt
                          ? new Date(app.submittedAt).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell>
                        <VerificationBadge status={getVerificationStatus(app)} />
                      </TableCell>
                      <TableCell>
                        {app.complianceScore ? (
                          <Badge
                            variant="outline"
                            className={
                              app.complianceScore >= 80
                                ? "bg-cyan/10 text-cyan border-cyan"
                                : app.complianceScore >= 60
                                ? "bg-amber-500/10 text-amber-500 border-amber-500"
                                : "bg-destructive/10 text-destructive border-destructive"
                            }
                          >
                            {app.complianceScore}%
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">Pending</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          data-testid={`button-view-${app.id}`}
                        >
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
