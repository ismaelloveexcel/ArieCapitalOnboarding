import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Users, Globe, DollarSign, FileCheck, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CardStage, { type StageStatus } from "@/components/CardStage";
import UploadBox from "@/components/UploadBox";
import StatusChip from "@/components/StatusChip";
import JourneyProgressBar from "@/components/JourneyProgressBar";
import ProgressRing from "@/components/ProgressRing";
import ConfettiCelebration from "@/components/ConfettiCelebration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function Journey() {
  const [currentStage, setCurrentStage] = useState(0);
  const [applicationComplete, setApplicationComplete] = useState(false);

  // Stage 1: Entity Information
  const [registeredName, setRegisteredName] = useState("");
  const [tradingName, setTradingName] = useState("");
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMobile, setContactMobile] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [incorporationDate, setIncorporationDate] = useState("");
  const [incorporationCountry, setIncorporationCountry] = useState("");
  const [incorporationNumber, setIncorporationNumber] = useState("");
  const [licenses, setLicenses] = useState("");

  // Stage 2: Governance & Ownership
  const [director1FirstName, setDirector1FirstName] = useState("");
  const [director1LastName, setDirector1LastName] = useState("");
  const [ubo1FirstName, setUbo1FirstName] = useState("");
  const [ubo1LastName, setUbo1LastName] = useState("");

  // Stage 3: Business Operations
  const [businessSector, setBusinessSector] = useState("");
  const [businessOverview, setBusinessOverview] = useState("");
  const [managementOverview, setManagementOverview] = useState("");
  const [operatingCountries, setOperatingCountries] = useState("");
  const [targetMarkets, setTargetMarkets] = useState("");

  // Stage 4: Account & Financial Details
  const [accountPurpose, setAccountPurpose] = useState("");
  const [otherBankAccounts, setOtherBankAccounts] = useState("");
  const [currencies, setCurrencies] = useState("");
  const [sourceOfWealth, setSourceOfWealth] = useState("");
  const [initialFunds, setInitialFunds] = useState("");
  const [regularFunds, setRegularFunds] = useState("");
  const [monthlyInflowsMin, setMonthlyInflowsMin] = useState("");
  const [monthlyInflowsMax, setMonthlyInflowsMax] = useState("");
  const [year1Revenue, setYear1Revenue] = useState("");

  // Stage 5: Documentation & Compliance
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);

  const stages = [
    { title: "Entity Information", icon: Building2 },
    { title: "Governance & Ownership", icon: Users },
    { title: "Business Operations", icon: Globe },
    { title: "Account & Financial Details", icon: DollarSign },
    { title: "Documentation & Compliance", icon: FileCheck },
  ];

  const getStageStatus = (index: number): StageStatus => {
    if (index < currentStage) return "completed";
    if (index === currentStage) return "active";
    return "pending";
  };

  const calculateProgress = () => {
    return ((currentStage + 1) / stages.length) * 100;
  };

  const isStage1Valid = () => {
    return registeredName && contactFirstName && contactLastName && contactEmail &&
           registeredAddress && incorporationDate && incorporationCountry;
  };

  const isStage2Valid = () => {
    return director1FirstName && director1LastName && ubo1FirstName && ubo1LastName;
  };

  const isStage3Valid = () => {
    return businessSector && businessOverview && operatingCountries && targetMarkets;
  };

  const isStage4Valid = () => {
    return accountPurpose && currencies && sourceOfWealth && initialFunds;
  };

  const isStage5Valid = () => {
    return marketingConsent && emailConsent;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy/5 via-background to-cyan/5 py-8 px-4">
      <AnimatePresence mode="wait">
        {!applicationComplete ? (
          <motion.div
            key="application"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto"
          >
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                <h1 className="text-4xl font-bold text-foreground mb-2" data-testid="text-title">
                  Corporate Account Application
                </h1>
                <p className="text-muted-foreground">
                  Complete the application form to open your corporate account
                </p>
              </motion.div>

              <div className="flex items-center gap-4 mb-2">
                <JourneyProgressBar progress={calculateProgress()} />
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap" data-testid="text-progress">
                  {Math.round(calculateProgress())}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
              {/* Stage 1: Entity Information */}
              <CardStage
                title={stages[0].title}
                icon={stages[0].icon}
                status={getStageStatus(0)}
                number={1}
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="registered-name">Registered Entity Name *</Label>
                    <Input
                      id="registered-name"
                      value={registeredName}
                      onChange={(e) => setRegisteredName(e.target.value)}
                      placeholder="Enter registered name"
                      disabled={currentStage !== 0}
                      data-testid="input-registered-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="trading-name">Trading Name</Label>
                    <Input
                      id="trading-name"
                      value={tradingName}
                      onChange={(e) => setTradingName(e.target.value)}
                      placeholder="Enter trading name"
                      disabled={currentStage !== 0}
                      data-testid="input-trading-name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="contact-first">Contact First Name *</Label>
                      <Input
                        id="contact-first"
                        value={contactFirstName}
                        onChange={(e) => setContactFirstName(e.target.value)}
                        placeholder="First name"
                        disabled={currentStage !== 0}
                        data-testid="input-contact-first"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-last">Last Name *</Label>
                      <Input
                        id="contact-last"
                        value={contactLastName}
                        onChange={(e) => setContactLastName(e.target.value)}
                        placeholder="Last name"
                        disabled={currentStage !== 0}
                        data-testid="input-contact-last"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="contact@company.com"
                      disabled={currentStage !== 0}
                      data-testid="input-contact-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-mobile">Mobile</Label>
                    <Input
                      id="contact-mobile"
                      value={contactMobile}
                      onChange={(e) => setContactMobile(e.target.value)}
                      placeholder="+1234567890"
                      disabled={currentStage !== 0}
                      data-testid="input-contact-mobile"
                    />
                  </div>
                  <div>
                    <Label htmlFor="registered-address">Registered Office Address *</Label>
                    <Textarea
                      id="registered-address"
                      value={registeredAddress}
                      onChange={(e) => setRegisteredAddress(e.target.value)}
                      placeholder="Enter full registered address"
                      disabled={currentStage !== 0}
                      rows={2}
                      data-testid="input-registered-address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="business-address">Business/Head Office Address</Label>
                    <Textarea
                      id="business-address"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      placeholder="If different from registered address"
                      disabled={currentStage !== 0}
                      rows={2}
                      data-testid="input-business-address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://www.company.com"
                      disabled={currentStage !== 0}
                      data-testid="input-website"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="incorporation-date">Incorporation Date *</Label>
                      <Input
                        id="incorporation-date"
                        type="date"
                        value={incorporationDate}
                        onChange={(e) => setIncorporationDate(e.target.value)}
                        disabled={currentStage !== 0}
                        data-testid="input-incorporation-date"
                      />
                    </div>
                    <div>
                      <Label htmlFor="incorporation-country">Country *</Label>
                      <Input
                        id="incorporation-country"
                        value={incorporationCountry}
                        onChange={(e) => setIncorporationCountry(e.target.value)}
                        placeholder="Country"
                        disabled={currentStage !== 0}
                        data-testid="input-incorporation-country"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="incorporation-number">Incorporation Number</Label>
                    <Input
                      id="incorporation-number"
                      value={incorporationNumber}
                      onChange={(e) => setIncorporationNumber(e.target.value)}
                      placeholder="Registration number"
                      disabled={currentStage !== 0}
                      data-testid="input-incorporation-number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="licenses">Licenses Held</Label>
                    <Textarea
                      id="licenses"
                      value={licenses}
                      onChange={(e) => setLicenses(e.target.value)}
                      placeholder="List all licenses"
                      disabled={currentStage !== 0}
                      rows={2}
                      data-testid="input-licenses"
                    />
                  </div>
                  {currentStage === 0 && (
                    <Button
                      onClick={() => setCurrentStage(1)}
                      className="w-full"
                      disabled={!isStage1Valid()}
                      data-testid="button-stage-1-next"
                    >
                      Continue to Governance & Ownership
                    </Button>
                  )}
                </div>
              </CardStage>

              {/* Stage 2: Governance & Ownership */}
              <CardStage
                title={stages[1].title}
                icon={stages[1].icon}
                status={getStageStatus(1)}
                number={2}
              >
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold">Directors of the Company</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Input
                        placeholder="First name *"
                        value={director1FirstName}
                        onChange={(e) => setDirector1FirstName(e.target.value)}
                        disabled={currentStage !== 1}
                        data-testid="input-director1-first"
                      />
                      <Input
                        placeholder="Last name *"
                        value={director1LastName}
                        onChange={(e) => setDirector1LastName(e.target.value)}
                        disabled={currentStage !== 1}
                        data-testid="input-director1-last"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Ultimate Beneficiary Owner(s)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Input
                        placeholder="First name *"
                        value={ubo1FirstName}
                        onChange={(e) => setUbo1FirstName(e.target.value)}
                        disabled={currentStage !== 1}
                        data-testid="input-ubo1-first"
                      />
                      <Input
                        placeholder="Last name *"
                        value={ubo1LastName}
                        onChange={(e) => setUbo1LastName(e.target.value)}
                        disabled={currentStage !== 1}
                        data-testid="input-ubo1-last"
                      />
                    </div>
                  </div>
                  <UploadBox
                    label="Director ID Documents"
                    accept=".pdf,.jpg,.png"
                    onUpload={(file) => console.log("Director ID uploaded:", file.name)}
                  />
                  <UploadBox
                    label="UBO ID Documents"
                    accept=".pdf,.jpg,.png"
                    onUpload={(file) => console.log("UBO ID uploaded:", file.name)}
                  />
                  {currentStage === 1 && (
                    <Button
                      onClick={() => setCurrentStage(2)}
                      className="w-full"
                      disabled={!isStage2Valid()}
                      data-testid="button-stage-2-next"
                    >
                      Continue to Business Operations
                    </Button>
                  )}
                </div>
              </CardStage>

              {/* Stage 3: Business Operations */}
              <CardStage
                title={stages[2].title}
                icon={stages[2].icon}
                status={getStageStatus(2)}
                number={3}
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="business-sector">Business Sector/Industry *</Label>
                    <Input
                      id="business-sector"
                      value={businessSector}
                      onChange={(e) => setBusinessSector(e.target.value)}
                      placeholder="e.g., Technology, Finance"
                      disabled={currentStage !== 2}
                      data-testid="input-business-sector"
                    />
                  </div>
                  <div>
                    <Label htmlFor="business-overview">Detailed Business Overview *</Label>
                    <Textarea
                      id="business-overview"
                      value={businessOverview}
                      onChange={(e) => setBusinessOverview(e.target.value)}
                      placeholder="Describe business operations"
                      disabled={currentStage !== 2}
                      rows={3}
                      data-testid="input-business-overview"
                    />
                  </div>
                  <div>
                    <Label htmlFor="management-overview">Management & Technical Team</Label>
                    <Textarea
                      id="management-overview"
                      value={managementOverview}
                      onChange={(e) => setManagementOverview(e.target.value)}
                      placeholder="Overview of key personnel"
                      disabled={currentStage !== 2}
                      rows={2}
                      data-testid="input-management-overview"
                    />
                  </div>
                  <div>
                    <Label htmlFor="operating-countries">Countries You Operate From *</Label>
                    <Input
                      id="operating-countries"
                      value={operatingCountries}
                      onChange={(e) => setOperatingCountries(e.target.value)}
                      placeholder="e.g., USA, UK, Singapore"
                      disabled={currentStage !== 2}
                      data-testid="input-operating-countries"
                    />
                  </div>
                  <div>
                    <Label htmlFor="target-markets">Target Markets *</Label>
                    <Input
                      id="target-markets"
                      value={targetMarkets}
                      onChange={(e) => setTargetMarkets(e.target.value)}
                      placeholder="Countries you deal with"
                      disabled={currentStage !== 2}
                      data-testid="input-target-markets"
                    />
                  </div>
                  {currentStage === 2 && (
                    <Button
                      onClick={() => setCurrentStage(3)}
                      className="w-full"
                      disabled={!isStage3Valid()}
                      data-testid="button-stage-3-next"
                    >
                      Continue to Account & Financial Details
                    </Button>
                  )}
                </div>
              </CardStage>

              {/* Stage 4: Account & Financial Details */}
              <CardStage
                title={stages[3].title}
                icon={stages[3].icon}
                status={getStageStatus(3)}
                number={4}
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="account-purpose">Purpose of Opening Account *</Label>
                    <Textarea
                      id="account-purpose"
                      value={accountPurpose}
                      onChange={(e) => setAccountPurpose(e.target.value)}
                      placeholder="Explain the purpose"
                      disabled={currentStage !== 3}
                      rows={2}
                      data-testid="input-account-purpose"
                    />
                  </div>
                  <div>
                    <Label htmlFor="other-banks">Other Bank Accounts</Label>
                    <Input
                      id="other-banks"
                      value={otherBankAccounts}
                      onChange={(e) => setOtherBankAccounts(e.target.value)}
                      placeholder="Bank name and country"
                      disabled={currentStage !== 3}
                      data-testid="input-other-banks"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currencies">Currencies Needed *</Label>
                    <Input
                      id="currencies"
                      value={currencies}
                      onChange={(e) => setCurrencies(e.target.value)}
                      placeholder="e.g., USD, EUR, GBP"
                      disabled={currentStage !== 3}
                      data-testid="input-currencies"
                    />
                  </div>
                  <div>
                    <Label htmlFor="source-wealth">Source of Wealth *</Label>
                    <Textarea
                      id="source-wealth"
                      value={sourceOfWealth}
                      onChange={(e) => setSourceOfWealth(e.target.value)}
                      placeholder="Explain source of wealth"
                      disabled={currentStage !== 3}
                      rows={2}
                      data-testid="input-source-wealth"
                    />
                  </div>
                  <div>
                    <Label htmlFor="initial-funds">Initial Source of Funds *</Label>
                    <Input
                      id="initial-funds"
                      value={initialFunds}
                      onChange={(e) => setInitialFunds(e.target.value)}
                      placeholder="Source of initial deposit"
                      disabled={currentStage !== 3}
                      data-testid="input-initial-funds"
                    />
                  </div>
                  <div>
                    <Label htmlFor="regular-funds">Source of Regular Funds</Label>
                    <Input
                      id="regular-funds"
                      value={regularFunds}
                      onChange={(e) => setRegularFunds(e.target.value)}
                      placeholder="Ongoing funding source"
                      disabled={currentStage !== 3}
                      data-testid="input-regular-funds"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="inflows-min">Monthly Inflows Min (USD)</Label>
                      <Input
                        id="inflows-min"
                        type="number"
                        value={monthlyInflowsMin}
                        onChange={(e) => setMonthlyInflowsMin(e.target.value)}
                        placeholder="0"
                        disabled={currentStage !== 3}
                        data-testid="input-inflows-min"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inflows-max">Max (USD)</Label>
                      <Input
                        id="inflows-max"
                        type="number"
                        value={monthlyInflowsMax}
                        onChange={(e) => setMonthlyInflowsMax(e.target.value)}
                        placeholder="0"
                        disabled={currentStage !== 3}
                        data-testid="input-inflows-max"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="year1-revenue">Year 1 Revenue Forecast (USD)</Label>
                    <Input
                      id="year1-revenue"
                      type="number"
                      value={year1Revenue}
                      onChange={(e) => setYear1Revenue(e.target.value)}
                      placeholder="0"
                      disabled={currentStage !== 3}
                      data-testid="input-year1-revenue"
                    />
                  </div>
                  {currentStage === 3 && (
                    <Button
                      onClick={() => setCurrentStage(4)}
                      className="w-full"
                      disabled={!isStage4Valid()}
                      data-testid="button-stage-4-next"
                    >
                      Continue to Documentation & Compliance
                    </Button>
                  )}
                </div>
              </CardStage>

              {/* Stage 5: Documentation & Compliance */}
              <CardStage
                title={stages[4].title}
                icon={stages[4].icon}
                status={getStageStatus(4)}
                number={5}
              >
                <div className="space-y-4">
                  <UploadBox
                    label="Certificate of Incorporation"
                    accept=".pdf,.jpg,.png"
                    onUpload={(file) => console.log("Certificate uploaded:", file.name)}
                  />
                  <UploadBox
                    label="Business License"
                    accept=".pdf,.jpg,.png"
                    onUpload={(file) => console.log("License uploaded:", file.name)}
                  />
                  <UploadBox
                    label="Financial Statements"
                    accept=".pdf,.jpg,.png"
                    onUpload={(file) => console.log("Financials uploaded:", file.name)}
                  />
                  <div className="border rounded-lg p-4 space-y-3">
                    <Label className="text-sm font-semibold">Explicit Consent for Marketing</Label>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="marketing-consent"
                        checked={marketingConsent}
                        onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
                        disabled={currentStage !== 4}
                        data-testid="checkbox-marketing-consent"
                      />
                      <label htmlFor="marketing-consent" className="text-xs text-muted-foreground">
                        I agree that my personal information may be used for marketing purposes.
                      </label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="email-consent"
                        checked={emailConsent}
                        onCheckedChange={(checked) => setEmailConsent(checked as boolean)}
                        disabled={currentStage !== 4}
                        data-testid="checkbox-email-consent"
                      />
                      <label htmlFor="email-consent" className="text-xs text-muted-foreground">
                        I agree to receive emails from ACBM and understand that I may opt out at any time.
                      </label>
                    </div>
                  </div>
                  {currentStage === 4 && (
                    <Button
                      onClick={() => setApplicationComplete(true)}
                      className="w-full"
                      disabled={!isStage5Valid()}
                      data-testid="button-submit-application"
                    >
                      Submit Application
                    </Button>
                  )}
                </div>
              </CardStage>
            </div>

            <footer className="text-center text-xs text-muted-foreground" data-testid="text-footer">
              All information provided will be treated confidentially in accordance with our Privacy Policy
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto relative"
          >
            <ConfettiCelebration />
            <Card className="relative z-10 border-cyan/50 shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 mx-auto mb-4 bg-cyan rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground" data-testid="text-application-submitted">
                  Application Submitted
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Your corporate account application has been received and is under review
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <ProgressRing progress={100} />
                </div>

                <div className="bg-card rounded-lg p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Entity Name</span>
                    <span className="text-sm font-medium" data-testid="text-summary-entity">{registeredName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Incorporation Country</span>
                    <span className="text-sm font-medium">{incorporationCountry}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Application Status</span>
                    <StatusChip status="verified" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Review Timeline</span>
                    <span className="text-sm font-medium text-cyan" data-testid="text-timeline">3-5 Business Days</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" data-testid="button-download-summary">
                  <Download className="w-4 h-4 mr-2" />
                  Download Application Summary
                </Button>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    You will receive a confirmation email at <span className="font-medium">{contactEmail}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <footer className="text-center text-xs text-muted-foreground mt-8" data-testid="text-footer-complete">
              All information provided will be treated confidentially in accordance with our Privacy Policy
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
