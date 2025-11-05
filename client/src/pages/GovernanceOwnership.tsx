import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import UploadBox from "@/components/UploadBox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface GovernanceOwnershipProps {
  onNext: () => void;
  onBack: () => void;
}

export default function GovernanceOwnership({ onNext, onBack }: GovernanceOwnershipProps) {
  const [directors, setDirectors] = useState([{ firstName: "", lastName: "" }]);
  const [ubos, setUbos] = useState([{ firstName: "", lastName: "" }]);

  const addDirector = () => {
    setDirectors([...directors, { firstName: "", lastName: "" }]);
  };

  const addUBO = () => {
    setUbos([...ubos, { firstName: "", lastName: "" }]);
  };

  const updateDirector = (index: number, field: string, value: string) => {
    const updated = [...directors];
    updated[index] = { ...updated[index], [field]: value };
    setDirectors(updated);
  };

  const updateUBO = (index: number, field: string, value: string) => {
    const updated = [...ubos];
    updated[index] = { ...updated[index], [field]: value };
    setUbos(updated);
  };

  const isValid = () => {
    return (
      directors.every((d) => d.firstName && d.lastName) &&
      ubos.every((u) => u.firstName && u.lastName)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <SectionHeader
        title="Governance & Ownership"
        subtitle="Provide details of directors and ultimate beneficial owners (UBOs)."
      />
      <div className="space-y-8">
        <div>
          <Label className="text-base font-semibold text-foreground mb-3 block">
            Directors of the Company
          </Label>
          {directors.map((director, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-3">
              <Input
                placeholder="First Name *"
                value={director.firstName}
                onChange={(e) => updateDirector(index, "firstName", e.target.value)}
                data-testid={`input-director-${index}-first`}
              />
              <Input
                placeholder="Last Name *"
                value={director.lastName}
                onChange={(e) => updateDirector(index, "lastName", e.target.value)}
                data-testid={`input-director-${index}-last`}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addDirector}
            data-testid="button-add-director"
          >
            + Add Another Director
          </Button>
        </div>

        <div>
          <Label className="text-base font-semibold text-foreground mb-3 block">
            Ultimate Beneficial Owner(s)
          </Label>
          {ubos.map((ubo, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-3">
              <Input
                placeholder="First Name *"
                value={ubo.firstName}
                onChange={(e) => updateUBO(index, "firstName", e.target.value)}
                data-testid={`input-ubo-${index}-first`}
              />
              <Input
                placeholder="Last Name *"
                value={ubo.lastName}
                onChange={(e) => updateUBO(index, "lastName", e.target.value)}
                data-testid={`input-ubo-${index}-last`}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addUBO}
            data-testid="button-add-ubo"
          >
            + Add Another UBO
          </Button>
        </div>

        <div className="border-t pt-6">
          <Label className="text-base font-semibold text-foreground mb-4 block">
            Supporting Documents
          </Label>
          <div className="space-y-4">
            <UploadBox
              label="Director Identification Documents"
              accept=".pdf,.jpg,.png"
              onUpload={(file) => console.log("Director ID:", file.name)}
            />
            <UploadBox
              label="UBO Identification Documents"
              accept=".pdf,.jpg,.png"
              onUpload={(file) => console.log("UBO ID:", file.name)}
            />
            <UploadBox
              label="Proof of Address (Directors/UBOs)"
              accept=".pdf,.jpg,.png"
              onUpload={(file) => console.log("Address proof:", file.name)}
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
      </div>
    </div>
  );
}
