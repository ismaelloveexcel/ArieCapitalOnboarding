import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import UploadBox from "@/components/UploadBox";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DocumentationComplianceProps {
  onSubmit: (data: { authRepName: string; authRepRole: string }) => void;
  onBack: () => void;
  isSaving?: boolean;
}

export default function DocumentationCompliance({ onSubmit, onBack, isSaving = false }: DocumentationComplianceProps) {
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);
  const [declarationConsent, setDeclarationConsent] = useState(false);
  const [authRepName, setAuthRepName] = useState("");
  const [authRepRole, setAuthRepRole] = useState("");

  // Only the declaration consent and authorized representative fields are required
  const isValid = () => {
    return declarationConsent && authRepName && authRepRole;
  };

  const handleSubmit = () => {
    if (isValid()) {
      onSubmit({ authRepName, authRepRole });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <SectionHeader
        title="Documentation & Compliance"
        subtitle="Upload required documents and provide regulatory consent."
      />
      <div className="space-y-6">
        <div className="border rounded-lg p-4 space-y-4">
          <Label className="text-base font-semibold">Required Documents</Label>
          <UploadBox
            label="Certificate of Incorporation *"
            accept=".pdf,.jpg,.png"
            onUpload={(file) => console.log("Certificate:", file.name)}
          />
          <UploadBox
            label="Memorandum & Articles of Association"
            accept=".pdf"
            onUpload={(file) => console.log("Articles:", file.name)}
          />
          <UploadBox
            label="Register of Directors"
            accept=".pdf"
            onUpload={(file) => console.log("Directors register:", file.name)}
          />
          <UploadBox
            label="Register of Shareholders / UBO Register"
            accept=".pdf"
            onUpload={(file) => console.log("Shareholders register:", file.name)}
          />
          <UploadBox
            label="Financial Statements (Latest 2 Years)"
            accept=".pdf"
            onUpload={(file) => console.log("Financials:", file.name)}
          />
          <UploadBox
            label="Business Plan / Pitch Deck"
            accept=".pdf,.ppt,.pptx"
            onUpload={(file) => console.log("Business plan:", file.name)}
          />
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <Label className="text-base font-semibold">Marketing Preferences <span className="text-xs font-normal text-muted-foreground">(optional)</span></Label>
          <div className="flex items-start gap-3">
            <Checkbox
              id="marketing-consent"
              checked={marketingConsent}
              onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
              data-testid="checkbox-marketing-consent"
            />
            <label htmlFor="marketing-consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I agree that my personal information may be used for marketing purposes.
            </label>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="email-consent"
              checked={emailConsent}
              onCheckedChange={(checked) => setEmailConsent(checked as boolean)}
              data-testid="checkbox-email-consent"
            />
            <label htmlFor="email-consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I agree to receive emails from ACBM and understand that I may opt out at any time. For more information, please refer to the{" "}
              <a href="https://acbm.mu/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-cyan underline">
                Privacy Policy
              </a>.
            </label>
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <Label className="text-base font-semibold">Declaration *</Label>
          <p className="text-sm text-muted-foreground">
            I, the undersigned, duly authorized representative of this entity, declare that the above information is correct to the best of my knowledge.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="auth-rep-name">Name of Authorized Representative *</Label>
              <Input
                id="auth-rep-name"
                value={authRepName}
                onChange={(e) => setAuthRepName(e.target.value)}
                placeholder="Full name"
                className="mt-1"
                data-testid="input-auth-rep-name"
              />
            </div>
            <div>
              <Label htmlFor="auth-rep-role">Role *</Label>
              <Input
                id="auth-rep-role"
                value={authRepRole}
                onChange={(e) => setAuthRepRole(e.target.value)}
                placeholder="e.g., Director, CEO"
                className="mt-1"
                data-testid="input-auth-rep-role"
              />
            </div>
          </div>
          <div className="flex items-start gap-3 pt-2">
            <Checkbox
              id="declaration-consent"
              checked={declarationConsent}
              onCheckedChange={(checked) => setDeclarationConsent(checked as boolean)}
              data-testid="checkbox-declaration-consent"
            />
            <label htmlFor="declaration-consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I confirm that the information provided in this application is accurate and complete to the best of my knowledge. *
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={onBack} data-testid="button-back">
            Back
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid() || isSaving}
            data-testid="button-submit-application"
          >
            {isSaving ? "Submitting…" : "Submit Application"}
          </Button>
        </div>
      </div>
    </div>
  );
}
