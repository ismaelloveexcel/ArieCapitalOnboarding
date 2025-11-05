import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusChip from "@/components/StatusChip";
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

// todo: remove mock functionality - Mock data for demo
const mockApplications = [
  {
    id: "APP-2025-001",
    name: "Acme Corporation Ltd",
    country: "United States",
    status: "verified" as const,
    riskScore: 95,
    aiConfidence: 98,
    submissionDate: "2025-01-15",
    reviewDate: "2025-01-18",
  },
  {
    id: "APP-2025-002",
    name: "Global Tech Solutions PLC",
    country: "United Kingdom",
    status: "warning" as const,
    riskScore: 72,
    aiConfidence: 85,
    submissionDate: "2025-01-14",
    reviewDate: null,
  },
  {
    id: "APP-2025-003",
    name: "Innovation Labs Inc",
    country: "Singapore",
    status: "pending" as const,
    riskScore: 0,
    aiConfidence: 0,
    submissionDate: "2025-01-16",
    reviewDate: null,
  },
  {
    id: "APP-2025-004",
    name: "Sunrise Ventures SA",
    country: "Switzerland",
    status: "rejected" as const,
    riskScore: 45,
    aiConfidence: 92,
    submissionDate: "2025-01-13",
    reviewDate: "2025-01-17",
  },
  {
    id: "APP-2025-005",
    name: "NextGen Industries Pty",
    country: "Australia",
    status: "verified" as const,
    riskScore: 88,
    aiConfidence: 96,
    submissionDate: "2025-01-15",
    reviewDate: "2025-01-19",
  },
];

export default function Admin() {
  const [filter, setFilter] = useState<"all" | "verified" | "pending" | "rejected">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApplications = mockApplications.filter((app) => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: mockApplications.length,
    verified: mockApplications.filter((e) => e.status === "verified").length,
    pending: mockApplications.filter((e) => e.status === "pending").length,
    failed: mockApplications.filter((e) => e.status === "rejected").length,
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-stat-total">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-cyan" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan" data-testid="text-stat-verified">{stats.verified}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.verified / stats.total) * 100)}% approval rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-stat-pending">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive" data-testid="text-stat-failed">{stats.failed}</div>
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
                    variant={filter === "verified" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("verified")}
                    data-testid="button-filter-verified"
                  >
                    Approved
                  </Button>
                  <Button
                    variant={filter === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("pending")}
                    data-testid="button-filter-pending"
                  >
                    Pending
                  </Button>
                  <Button
                    variant={filter === "rejected" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("rejected")}
                    data-testid="button-filter-rejected"
                  >
                    Rejected
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Entity Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Compliance Score</TableHead>
                  <TableHead>AI Confidence</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id} data-testid={`row-application-${app.id}`}>
                    <TableCell className="font-mono text-xs" data-testid={`text-id-${app.id}`}>
                      {app.id}
                    </TableCell>
                    <TableCell className="font-medium" data-testid={`text-name-${app.id}`}>
                      {app.name}
                    </TableCell>
                    <TableCell>{app.country}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{app.submissionDate}</TableCell>
                    <TableCell>
                      <StatusChip status={app.status} />
                    </TableCell>
                    <TableCell>
                      {app.riskScore > 0 ? (
                        <Badge
                          variant="outline"
                          className={
                            app.riskScore >= 80
                              ? "bg-cyan/10 text-cyan border-cyan"
                              : app.riskScore >= 60
                              ? "bg-amber-500/10 text-amber-500 border-amber-500"
                              : "bg-destructive/10 text-destructive border-destructive"
                          }
                        >
                          {app.riskScore}%
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">Pending</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {app.aiConfidence > 0 ? (
                        <span className="text-sm font-medium">{app.aiConfidence}%</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
