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

// Mock data for demo
const mockEntities = [
  {
    id: "1",
    name: "Acme Corporation",
    country: "United States",
    status: "verified" as const,
    riskScore: 95,
    aiConfidence: 98,
    date: "2025-01-15",
  },
  {
    id: "2",
    name: "Global Tech Solutions",
    country: "United Kingdom",
    status: "warning" as const,
    riskScore: 72,
    aiConfidence: 85,
    date: "2025-01-14",
  },
  {
    id: "3",
    name: "Innovation Labs Inc",
    country: "Singapore",
    status: "pending" as const,
    riskScore: 0,
    aiConfidence: 0,
    date: "2025-01-16",
  },
  {
    id: "4",
    name: "Sunrise Ventures",
    country: "Canada",
    status: "rejected" as const,
    riskScore: 45,
    aiConfidence: 92,
    date: "2025-01-13",
  },
  {
    id: "5",
    name: "NextGen Industries",
    country: "Australia",
    status: "verified" as const,
    riskScore: 88,
    aiConfidence: 96,
    date: "2025-01-15",
  },
];

export default function Admin() {
  const [filter, setFilter] = useState<"all" | "verified" | "pending" | "rejected">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntities = mockEntities.filter((entity) => {
    const matchesFilter = filter === "all" || entity.status === filter;
    const matchesSearch = entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entity.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: mockEntities.length,
    verified: mockEntities.filter((e) => e.status === "verified").length,
    pending: mockEntities.filter((e) => e.status === "pending").length,
    failed: mockEntities.filter((e) => e.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-admin-title">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage corporate onboarding applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entities</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-stat-total">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-cyan" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan" data-testid="text-stat-verified">{stats.verified}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.verified / stats.total) * 100)}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-stat-pending">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
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
              <CardTitle>Entity Applications</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search entities..."
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
                    Verified
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
                    Failed
                  </Button>
                </div>
                <Button data-testid="button-export-all">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entity Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>AI Confidence</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntities.map((entity) => (
                  <TableRow key={entity.id} data-testid={`row-entity-${entity.id}`}>
                    <TableCell className="font-medium" data-testid={`text-name-${entity.id}`}>
                      {entity.name}
                    </TableCell>
                    <TableCell>{entity.country}</TableCell>
                    <TableCell className="text-muted-foreground">{entity.date}</TableCell>
                    <TableCell>
                      <StatusChip status={entity.status} />
                    </TableCell>
                    <TableCell>
                      {entity.riskScore > 0 ? (
                        <Badge
                          variant="outline"
                          className={
                            entity.riskScore >= 80
                              ? "bg-cyan/10 text-cyan border-cyan"
                              : entity.riskScore >= 60
                              ? "bg-amber-500/10 text-amber-500 border-amber-500"
                              : "bg-destructive/10 text-destructive border-destructive"
                          }
                        >
                          {entity.riskScore}%
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {entity.aiConfidence > 0 ? (
                        <span className="text-sm font-medium">{entity.aiConfidence}%</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        data-testid={`button-view-${entity.id}`}
                      >
                        View Details
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
