import { useState } from "react";
import ProgressTabs from "@/components/ProgressTabs";
import EntityInformation from "./EntityInformation";
import GovernanceOwnership from "./GovernanceOwnership";
import BusinessOperations from "./BusinessOperations";
import AccountFinancialDetails from "./AccountFinancialDetails";
import DocumentationCompliance from "./DocumentationCompliance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Journey() {
  const [activeStep, setActiveStep] = useState(0);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<{ authRepName: string; authRepRole: string } | null>(null);

  const steps = [
    "Entity Information",
    "Governance & Ownership",
    "Business Operations",
    "Account & Financial Details",
    "Documentation & Compliance",
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = (data: { authRepName: string; authRepRole: string }) => {
    setSubmissionData(data);
    setApplicationSubmitted(true);
  };

  if (applicationSubmitted) {
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
                    APP-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 9999)).padStart(4, "0")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Submitted By</span>
                  <span className="text-sm font-medium">{submissionData?.authRepName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <span className="text-sm font-medium">{submissionData?.authRepRole}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Submission Date</span>
                  <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Review Timeline</span>
                  <span className="text-sm font-medium text-cyan" data-testid="text-timeline">3-5 Business Days</span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Next Steps:</strong> Our compliance team will review your application and supporting documents. 
                  You will receive a confirmation email with further instructions within 24 hours.
                </p>
              </div>

              <Button className="w-full" size="lg" data-testid="button-download-summary">
                <Download className="w-4 h-4 mr-2" />
                Download Application Summary
              </Button>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setApplicationSubmitted(false);
                    setActiveStep(0);
                    setSubmissionData(null);
                  }}
                  data-testid="button-new-application"
                >
                  Submit New Application
                </Button>
              </div>
            </CardContent>
          </Card>

          <footer className="text-center text-xs text-muted-foreground mt-8">
            Confidentiality Notice: Information provided in this application is strictly confidential
            and will be used only for regulatory and compliance verification.
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
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <ProgressTabs steps={steps} activeStep={activeStep} onStepClick={setActiveStep} />

        <div className="mt-8">
          {activeStep === 0 && <EntityInformation onNext={handleNext} />}
          {activeStep === 1 && <GovernanceOwnership onNext={handleNext} onBack={handleBack} />}
          {activeStep === 2 && <BusinessOperations onNext={handleNext} onBack={handleBack} />}
          {activeStep === 3 && <AccountFinancialDetails onNext={handleNext} onBack={handleBack} />}
          {activeStep === 4 && <DocumentationCompliance onSubmit={handleSubmit} onBack={handleBack} />}
        </div>
      </main>

      <footer className="border-t bg-white text-xs text-muted-foreground text-center p-4 mt-8">
        Confidentiality Notice: Information provided in this application is strictly confidential
        and will be used only for regulatory and compliance verification.
      </footer>
    </div>
  );
}
