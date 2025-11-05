import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface BusinessOperationsProps {
  onNext: () => void;
  onBack: () => void;
}

export default function BusinessOperations({ onNext, onBack }: BusinessOperationsProps) {
  const [formData, setFormData] = useState({
    businessSector: "",
    businessOverview: "",
    managementOverview: "",
    operatingCountries: "",
    targetMarkets: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = () => {
    return (
      formData.businessSector &&
      formData.businessOverview &&
      formData.operatingCountries &&
      formData.targetMarkets
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <SectionHeader
        title="Business Operations"
        subtitle="Describe your business activities, management structure, and geographical scope."
      />
      <form className="space-y-4">
        <div>
          <Label htmlFor="business-sector">Business Sector / Industry *</Label>
          <Input
            id="business-sector"
            value={formData.businessSector}
            onChange={(e) => handleChange("businessSector", e.target.value)}
            placeholder="e.g., Technology, Financial Services, Manufacturing"
            className="mt-1"
            data-testid="input-business-sector"
          />
        </div>

        <div>
          <Label htmlFor="business-overview">Detailed Overview of Business Operations *</Label>
          <Textarea
            id="business-overview"
            value={formData.businessOverview}
            onChange={(e) => handleChange("businessOverview", e.target.value)}
            placeholder="Provide a comprehensive description of your business activities, products, and services"
            className="mt-1"
            rows={4}
            data-testid="input-business-overview"
          />
        </div>

        <div>
          <Label htmlFor="management-overview">Overview of Management Team & Technical Team</Label>
          <Textarea
            id="management-overview"
            value={formData.managementOverview}
            onChange={(e) => handleChange("managementOverview", e.target.value)}
            placeholder="Describe key personnel, their roles, and relevant experience"
            className="mt-1"
            rows={3}
            data-testid="input-management-overview"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="operating-countries">Countries You Operate From *</Label>
            <Input
              id="operating-countries"
              value={formData.operatingCountries}
              onChange={(e) => handleChange("operatingCountries", e.target.value)}
              placeholder="e.g., United States, United Kingdom"
              className="mt-1"
              data-testid="input-operating-countries"
            />
          </div>

          <div>
            <Label htmlFor="target-markets">Countries You Deal With / Target Markets *</Label>
            <Input
              id="target-markets"
              value={formData.targetMarkets}
              onChange={(e) => handleChange("targetMarkets", e.target.value)}
              placeholder="e.g., European Union, Asia-Pacific"
              className="mt-1"
              data-testid="input-target-markets"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={onBack} data-testid="button-back">
            Back
          </Button>
          <Button type="button" onClick={onNext} disabled={!isValid()} data-testid="button-next">
            Continue to Next Step
          </Button>
        </div>
      </form>
    </div>
  );
}
