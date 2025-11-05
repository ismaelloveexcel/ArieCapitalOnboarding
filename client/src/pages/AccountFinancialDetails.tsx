import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AccountFinancialDetailsProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function AccountFinancialDetails({ onNext, onBack }: AccountFinancialDetailsProps) {
  const [formData, setFormData] = useState({
    accountPurpose: "",
    otherBankAccounts: "NO",
    otherBankDetails: "",
    currencies: "",
    sourceOfWealth: "",
    initialFunds: "",
    regularFunds: "",
    inflowsTransactionsMin: "",
    inflowsTransactionsMax: "",
    inflowsAmountsMin: "",
    inflowsAmountsMax: "",
    outflowsTransactionsMin: "",
    outflowsTransactionsMax: "",
    outflowsAmountsMin: "",
    outflowsAmountsMax: "",
    year1Revenue: "",
    year2Revenue: "",
    year3Revenue: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = () => {
    return (
      formData.accountPurpose &&
      formData.currencies &&
      formData.sourceOfWealth &&
      formData.initialFunds
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <SectionHeader
        title="Account & Financial Details"
        subtitle="Provide information about account requirements, funding sources, and financial projections."
      />
      <form className="space-y-6">
        <div>
          <Label htmlFor="account-purpose">Purpose of Opening Account *</Label>
          <Textarea
            id="account-purpose"
            value={formData.accountPurpose}
            onChange={(e) => handleChange("accountPurpose", e.target.value)}
            placeholder="Explain the intended use of this account"
            className="mt-1"
            rows={2}
            data-testid="input-account-purpose"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="other-accounts">Maintain Account(s) with Other Bank(s)?</Label>
            <Select
              value={formData.otherBankAccounts}
              onValueChange={(value) => handleChange("otherBankAccounts", value)}
            >
              <SelectTrigger className="mt-1" data-testid="select-other-accounts">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="YES">Yes</SelectItem>
                <SelectItem value="NO">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.otherBankAccounts === "YES" && (
            <div>
              <Label htmlFor="other-bank-details">Bank Name and Country</Label>
              <Input
                id="other-bank-details"
                value={formData.otherBankDetails}
                onChange={(e) => handleChange("otherBankDetails", e.target.value)}
                placeholder="e.g., HSBC, United Kingdom"
                className="mt-1"
                data-testid="input-other-bank-details"
              />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="currencies">Currencies of Accounts Needed *</Label>
          <Input
            id="currencies"
            value={formData.currencies}
            onChange={(e) => handleChange("currencies", e.target.value)}
            placeholder="e.g., USD, EUR, GBP"
            className="mt-1"
            data-testid="input-currencies"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="source-wealth">Source of Wealth *</Label>
            <Textarea
              id="source-wealth"
              value={formData.sourceOfWealth}
              onChange={(e) => handleChange("sourceOfWealth", e.target.value)}
              placeholder="Describe wealth origin"
              className="mt-1"
              rows={2}
              data-testid="input-source-wealth"
            />
          </div>

          <div>
            <Label htmlFor="initial-funds">Initial Source of Fund(s) *</Label>
            <Textarea
              id="initial-funds"
              value={formData.initialFunds}
              onChange={(e) => handleChange("initialFunds", e.target.value)}
              placeholder="Source of initial deposit"
              className="mt-1"
              rows={2}
              data-testid="input-initial-funds"
            />
          </div>

          <div>
            <Label htmlFor="regular-funds">Source of Regular Fund(s)</Label>
            <Textarea
              id="regular-funds"
              value={formData.regularFunds}
              onChange={(e) => handleChange("regularFunds", e.target.value)}
              placeholder="Ongoing funding sources"
              className="mt-1"
              rows={2}
              data-testid="input-regular-funds"
            />
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <Label className="text-base font-semibold">Estimated Monthly Activity</Label>
          
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-2">Inflows</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="inflows-transactions-min" className="text-xs">Number of Transactions (Min)</Label>
                <Input
                  id="inflows-transactions-min"
                  type="number"
                  value={formData.inflowsTransactionsMin}
                  onChange={(e) => handleChange("inflowsTransactionsMin", e.target.value)}
                  className="mt-1"
                  data-testid="input-inflows-transactions-min"
                />
              </div>
              <div>
                <Label htmlFor="inflows-transactions-max" className="text-xs">Maximum</Label>
                <Input
                  id="inflows-transactions-max"
                  type="number"
                  value={formData.inflowsTransactionsMax}
                  onChange={(e) => handleChange("inflowsTransactionsMax", e.target.value)}
                  className="mt-1"
                  data-testid="input-inflows-transactions-max"
                />
              </div>
              <div>
                <Label htmlFor="inflows-amounts-min" className="text-xs">Amounts in USD (Min)</Label>
                <Input
                  id="inflows-amounts-min"
                  type="number"
                  value={formData.inflowsAmountsMin}
                  onChange={(e) => handleChange("inflowsAmountsMin", e.target.value)}
                  className="mt-1"
                  data-testid="input-inflows-amounts-min"
                />
              </div>
              <div>
                <Label htmlFor="inflows-amounts-max" className="text-xs">Maximum</Label>
                <Input
                  id="inflows-amounts-max"
                  type="number"
                  value={formData.inflowsAmountsMax}
                  onChange={(e) => handleChange("inflowsAmountsMax", e.target.value)}
                  className="mt-1"
                  data-testid="input-inflows-amounts-max"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-muted-foreground mb-2">Outflows</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="outflows-transactions-min" className="text-xs">Number of Transactions (Min)</Label>
                <Input
                  id="outflows-transactions-min"
                  type="number"
                  value={formData.outflowsTransactionsMin}
                  onChange={(e) => handleChange("outflowsTransactionsMin", e.target.value)}
                  className="mt-1"
                  data-testid="input-outflows-transactions-min"
                />
              </div>
              <div>
                <Label htmlFor="outflows-transactions-max" className="text-xs">Maximum</Label>
                <Input
                  id="outflows-transactions-max"
                  type="number"
                  value={formData.outflowsTransactionsMax}
                  onChange={(e) => handleChange("outflowsTransactionsMax", e.target.value)}
                  className="mt-1"
                  data-testid="input-outflows-transactions-max"
                />
              </div>
              <div>
                <Label htmlFor="outflows-amounts-min" className="text-xs">Amounts in USD (Min)</Label>
                <Input
                  id="outflows-amounts-min"
                  type="number"
                  value={formData.outflowsAmountsMin}
                  onChange={(e) => handleChange("outflowsAmountsMin", e.target.value)}
                  className="mt-1"
                  data-testid="input-outflows-amounts-min"
                />
              </div>
              <div>
                <Label htmlFor="outflows-amounts-max" className="text-xs">Maximum</Label>
                <Input
                  id="outflows-amounts-max"
                  type="number"
                  value={formData.outflowsAmountsMax}
                  onChange={(e) => handleChange("outflowsAmountsMax", e.target.value)}
                  className="mt-1"
                  data-testid="input-outflows-amounts-max"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <Label className="text-base font-semibold mb-3 block">Financial Forecast (USD)</Label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="year1-revenue" className="text-sm">Year 1 Revenue</Label>
              <Input
                id="year1-revenue"
                type="number"
                value={formData.year1Revenue}
                onChange={(e) => handleChange("year1Revenue", e.target.value)}
                className="mt-1"
                data-testid="input-year1-revenue"
              />
            </div>
            <div>
              <Label htmlFor="year2-revenue" className="text-sm">Year 2 Revenue</Label>
              <Input
                id="year2-revenue"
                type="number"
                value={formData.year2Revenue}
                onChange={(e) => handleChange("year2Revenue", e.target.value)}
                className="mt-1"
                data-testid="input-year2-revenue"
              />
            </div>
            <div>
              <Label htmlFor="year3-revenue" className="text-sm">Year 3 Revenue</Label>
              <Input
                id="year3-revenue"
                type="number"
                value={formData.year3Revenue}
                onChange={(e) => handleChange("year3Revenue", e.target.value)}
                className="mt-1"
                data-testid="input-year3-revenue"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={onBack} data-testid="button-back">
            Back
          </Button>
          <Button
            type="button"
            onClick={() => onNext(formData)}
            disabled={!isValid()}
            data-testid="button-next"
          >
            Continue to Next Step
          </Button>
        </div>
      </form>
    </div>
  );
}
