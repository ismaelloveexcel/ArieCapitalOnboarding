import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import ProgressTabs from "@/components/ProgressTabs";
import ComplianceAgentChat from "@/components/ComplianceAgentChat";
import EntityInformation from "./EntityInformation";
import GovernanceOwnership from "./GovernanceOwnership";
import BusinessOperations from "./BusinessOperations";
import AccountFinancialDetails from "./AccountFinancialDetails";
import DocumentationCompliance from "./DocumentationCompliance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Application } from "@shared/schema";

export default function Journey() {
  const [activeStep, setActiveStep] = useState(0);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  const steps = [
    "Entity Information",
    "Governance & Ownership",
    "Business Operations",
    "Account & Financial Details",
    "Documentation & Compliance",
  ];

  const createApplicationMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/applications", {});
      const result = await response.json();
      return result;
    },
    onSuccess: (data: any) => {
      setApplicationId(data.application.id);
    },
  });

  // Create application on mount
  useEffect(() => {
    if (!hasInitialized.current && !applicationId) {
      hasInitialized.current = true;
      createApplicationMutation.mutate();
    }
  }, []);

  const { data: application, isLoading: isLoadingApplication } = useQuery<Application>({
    queryKey: ["/api/applications", applicationId],
    enabled: !!applicationId,
  });

  const updateStageMutation = useMutation({
    mutationFn: async ({ stage, data }: { stage: number; data: any }) => {
      const response = await apiRequest("PATCH", `/api/applications/${applicationId}/stage`, {
        stage,
        data,
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/applications", applicationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["/api/applications", applicationId, "messages"],
      });
    },
  });

  const submitApplicationMutation = useMutation({
    mutationFn: async (data: { authRepName: string; authRepRole: string }) => {
      const response = await apiRequest("POST", `/api/applications/${applicationId}/submit`, data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/applications", applicationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["/api/applications", applicationId, "messages"],
      });
    },
  });

  const handleNext = (stageData: any) => {
    if (applicationId) {
      updateStageMutation.mutate(
        { stage: activeStep, data: stageData },
        {
          onSuccess: () => {
            if (activeStep < steps.length - 1) {
              setActiveStep(activeStep + 1);
            }
          },
        }
      );
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = (data: { authRepName: string; authRepRole: string }) => {
    if (applicationId) {
      submitApplicationMutation.mutate(data);
    }
  };

  if (!applicationId || (isLoadingApplication && !application)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy/5 via-background to-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Initializing application...</p>
        </div>
      </div>
    );
  }

  // Safeguard: if application data isn't loaded yet, show loading
  if (!application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy/5 via-background to-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading application data...</p>
        </div>
      </div>
    );
  }

  if (application.status === "submitted") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy/5 via-background to-background py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-cyan/30 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 bg-cyan rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-navy" data-testid="text-application-submitted">
                Application Submitted Successfully
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Your corporate account application has been received and is under review
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Application Reference</span>
                  <span className="text-sm font-mono font-medium" data-testid="text-reference">
                    {application.referenceNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Submission Date</span>
                  <span className="text-sm font-medium">
                    {application.submittedAt ? new Date(application.submittedAt).toLocaleDateString() : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Compliance Score</span>
                  <span className="text-sm font-medium text-cyan">
                    {application.complianceScore || 0}/100
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Review Timeline</span>
                  <span className="text-sm font-medium text-cyan" data-testid="text-timeline">
                    3-5 Business Days
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Next Steps:</strong> Our compliance team will review your application and
                  supporting documents. You will receive a confirmation email with further
                  instructions within 24 hours.
                </p>
              </div>

              <Button className="w-full" size="lg" data-testid="button-download-summary">
                <Download className="w-4 h-4 mr-2" />
                Download Application Summary
              </Button>
            </CardContent>
          </Card>

          <footer className="text-center text-xs text-muted-foreground mt-8">
            Confidentiality Notice: Information provided in this application is strictly
            confidential and will be used only for regulatory and compliance verification.
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy/5 via-background to-background">
      <header className="border-b bg-white shadow-sm p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-navy" data-testid="text-title">
            Corporate Account Application
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            All information is collected for due diligence and compliance purposes
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Reference:</span>
            <span className="text-xs font-mono font-medium">{application.referenceNumber}</span>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProgressTabs steps={steps} activeStep={activeStep} onStepClick={setActiveStep} />

            <div>
              {activeStep === 0 && <EntityInformation onNext={handleNext} />}
              {activeStep === 1 && (
                <GovernanceOwnership onNext={handleNext} onBack={handleBack} />
              )}
              {activeStep === 2 && (
                <BusinessOperations onNext={handleNext} onBack={handleBack} />
              )}
              {activeStep === 3 && (
                <AccountFinancialDetails onNext={handleNext} onBack={handleBack} />
              )}
              {activeStep === 4 && (
                <DocumentationCompliance onSubmit={handleSubmit} onBack={handleBack} />
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <ComplianceAgentChat applicationId={applicationId} className="h-[calc(100vh-12rem)]" />
          </div>
        </div>
      </main>

      <footer className="border-t bg-white text-xs text-muted-foreground text-center p-4 mt-8">
        Confidentiality Notice: Information provided in this application is strictly confidential
        and will be used only for regulatory and compliance verification.
      </footer>
    </div>
  );
}
