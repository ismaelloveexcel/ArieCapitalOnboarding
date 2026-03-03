import SectionHeader from "@/components/SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormPersistence } from "@/hooks/use-form-persistence";

interface EntityInformationProps {
  onNext: (data: any) => void;
  isSaving?: boolean;
}

const INITIAL_STATE = {
  registeredName: "",
  tradingName: "",
  contactFirstName: "",
  contactLastName: "",
  email: "",
  mobile: "",
  registeredAddress: "",
  businessAddress: "",
  website: "",
  incorporationCountry: "",
  incorporationDate: "",
  incorporationNumber: "",
  licenses: "",
};

export default function EntityInformation({ onNext, isSaving = false }: EntityInformationProps) {
  const [formData, updateFormData] = useFormPersistence("entity-info", INITIAL_STATE);

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  const isValid = () => {
    return (
      formData.registeredName &&
      formData.contactFirstName &&
      formData.contactLastName &&
      formData.email &&
      formData.registeredAddress &&
      formData.incorporationCountry &&
      formData.incorporationDate
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <SectionHeader
        title="Entity Information"
        subtitle="Provide registered and trading names, contact details, and incorporation information."
      />
      <form className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="registered-name">Registered Entity Name *</Label>
          <Input
            id="registered-name"
            value={formData.registeredName}
            onChange={(e) => handleChange("registeredName", e.target.value)}
            className="mt-1"
            data-testid="input-registered-name"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="trading-name">Trading Name</Label>
          <Input
            id="trading-name"
            value={formData.tradingName}
            onChange={(e) => handleChange("tradingName", e.target.value)}
            className="mt-1"
            data-testid="input-trading-name"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="contact-first">Contact First Name *</Label>
          <Input
            id="contact-first"
            value={formData.contactFirstName}
            onChange={(e) => handleChange("contactFirstName", e.target.value)}
            className="mt-1"
            data-testid="input-contact-first"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="contact-last">Contact Last Name *</Label>
          <Input
            id="contact-last"
            value={formData.contactLastName}
            onChange={(e) => handleChange("contactLastName", e.target.value)}
            className="mt-1"
            data-testid="input-contact-last"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="mt-1"
            data-testid="input-email"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="mobile">Mobile</Label>
          <Input
            id="mobile"
            type="tel"
            value={formData.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            className="mt-1"
            data-testid="input-mobile"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="registered-address">Registered Office Address *</Label>
          <Textarea
            id="registered-address"
            value={formData.registeredAddress}
            onChange={(e) => handleChange("registeredAddress", e.target.value)}
            className="mt-1"
            rows={2}
            data-testid="input-registered-address"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="business-address">Business / Head Office Address</Label>
          <Textarea
            id="business-address"
            value={formData.businessAddress}
            onChange={(e) => handleChange("businessAddress", e.target.value)}
            className="mt-1"
            rows={2}
            data-testid="input-business-address"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
            className="mt-1"
            data-testid="input-website"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="incorporation-country">Incorporation Country *</Label>
          <Input
            id="incorporation-country"
            value={formData.incorporationCountry}
            onChange={(e) => handleChange("incorporationCountry", e.target.value)}
            className="mt-1"
            data-testid="input-incorporation-country"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="incorporation-date">Incorporation Date *</Label>
          <Input
            id="incorporation-date"
            type="date"
            value={formData.incorporationDate}
            onChange={(e) => handleChange("incorporationDate", e.target.value)}
            className="mt-1"
            data-testid="input-incorporation-date"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="incorporation-number">Incorporation Number</Label>
          <Input
            id="incorporation-number"
            value={formData.incorporationNumber}
            onChange={(e) => handleChange("incorporationNumber", e.target.value)}
            className="mt-1"
            data-testid="input-incorporation-number"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="licenses">Licenses Held</Label>
          <Input
            id="licenses"
            value={formData.licenses}
            onChange={(e) => handleChange("licenses", e.target.value)}
            className="mt-1"
            data-testid="input-licenses"
          />
        </div>

        <div className="col-span-2 flex justify-end mt-4">
          <Button
            type="button"
            onClick={() => onNext(formData)}
            disabled={!isValid() || isSaving}
            data-testid="button-next"
          >
            {isSaving ? "Saving…" : "Continue to Next Step"}
          </Button>
        </div>
      </form>
    </div>
  );
}
