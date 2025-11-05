import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Users, Briefcase, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CardStage, { type StageStatus } from "@/components/CardStage";
import UploadBox from "@/components/UploadBox";
import StatusChip, { type StatusType } from "@/components/StatusChip";
import JourneyProgressBar from "@/components/JourneyProgressBar";
import ProgressRing from "@/components/ProgressRing";
import ConfettiCelebration from "@/components/ConfettiCelebration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Journey() {
  const [currentStage, setCurrentStage] = useState(0);
  const [journeyComplete, setJourneyComplete] = useState(false);

  // Entity Details State
  const [entityName, setEntityName] = useState("");
  const [country, setCountry] = useState("");
  const [incorporationDate, setIncorporationDate] = useState("");
  const [certificateStatus, setCertificateStatus] = useState<StatusType>("pending");

  // UBO State
  const [uboName, setUboName] = useState("");
  const [uboIdNumber, setUboIdNumber] = useState("");
  const [idDocStatus, setIdDocStatus] = useState<StatusType>("pending");
  const [addressProofStatus, setAddressProofStatus] = useState<StatusType>("pending");

  // Business State
  const [businessSector, setBusinessSector] = useState("");
  const [sourceOfFunds, setSourceOfFunds] = useState("");
  const [businessDocStatus, setBusinessDocStatus] = useState<StatusType>("pending");

  const stages = [
    {
      title: "Entity Details",
      icon: Building2,
      fields: ["entityName", "country", "incorporationDate"],
    },
    {
      title: "Ownership & UBO",
      icon: Users,
      fields: ["uboName", "uboIdNumber"],
    },
    {
      title: "Business & Funds",
      icon: Briefcase,
      fields: ["businessSector", "sourceOfFunds"],
    },
  ];

  const getStageStatus = (index: number): StageStatus => {
    if (index < currentStage) return "completed";
    if (index === currentStage) return "active";
    return "pending";
  };

  const calculateProgress = () => {
    return ((currentStage + 1) / stages.length) * 100;
  };

  const handleStage1Next = () => {
    if (entityName && country && incorporationDate) {
      // Simulate AI verification
      setTimeout(() => setCertificateStatus("verified"), 500);
      setTimeout(() => setCurrentStage(1), 1000);
    }
  };

  const handleStage2Next = () => {
    if (uboName && uboIdNumber) {
      setTimeout(() => setIdDocStatus("verified"), 500);
      setTimeout(() => setAddressProofStatus("verified"), 1000);
      setTimeout(() => setCurrentStage(2), 1500);
    }
  };

  const handleStage3Complete = () => {
    if (businessSector && sourceOfFunds) {
      setTimeout(() => setBusinessDocStatus("verified"), 500);
      setTimeout(() => setJourneyComplete(true), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy/5 via-background to-cyan/5 py-8 px-4">
      <AnimatePresence mode="wait">
        {!journeyComplete ? (
          <motion.div
            key="journey"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                <h1 className="text-4xl font-bold text-foreground mb-2" data-testid="text-title">
                  Arie Capital Onboarding
                </h1>
                <p className="text-muted-foreground">
                  Complete your corporate account opening journey
                </p>
              </motion.div>

              <div className="flex items-center gap-4 mb-2">
                <JourneyProgressBar progress={calculateProgress()} />
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap" data-testid="text-progress">
                  {Math.round(calculateProgress())}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <CardStage
                title={stages[0].title}
                icon={stages[0].icon}
                status={getStageStatus(0)}
                number={1}
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="entity-name">Company Name</Label>
                    <Input
                      id="entity-name"
                      value={entityName}
                      onChange={(e) => setEntityName(e.target.value)}
                      placeholder="Enter company name"
                      disabled={currentStage !== 0}
                      data-testid="input-entity-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country of Incorporation</Label>
                    <Input
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g., United States"
                      disabled={currentStage !== 0}
                      data-testid="input-country"
                    />
                  </div>
                  <div>
                    <Label htmlFor="incorporation-date">Incorporation Date</Label>
                    <Input
                      id="incorporation-date"
                      type="date"
                      value={incorporationDate}
                      onChange={(e) => setIncorporationDate(e.target.value)}
                      disabled={currentStage !== 0}
                      data-testid="input-incorporation-date"
                    />
                  </div>
                  <UploadBox
                    label="Certificate of Incorporation"
                    accept=".pdf,.jpg,.png"
                    status={certificateStatus}
                    onUpload={(file) => {
                      console.log("Certificate uploaded:", file.name);
                      setCertificateStatus("verified");
                    }}
                  />
                  {currentStage === 0 && (
                    <Button
                      onClick={handleStage1Next}
                      className="w-full"
                      disabled={!entityName || !country || !incorporationDate}
                      data-testid="button-stage-1-next"
                    >
                      Continue to UBO Verification
                    </Button>
                  )}
                </div>
              </CardStage>

              <CardStage
                title={stages[1].title}
                icon={stages[1].icon}
                status={getStageStatus(1)}
                number={2}
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ubo-name">UBO Full Name</Label>
                    <Input
                      id="ubo-name"
                      value={uboName}
                      onChange={(e) => setUboName(e.target.value)}
                      placeholder="Enter UBO name"
                      disabled={currentStage !== 1}
                      data-testid="input-ubo-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ubo-id">ID Number</Label>
                    <Input
                      id="ubo-id"
                      value={uboIdNumber}
                      onChange={(e) => setUboIdNumber(e.target.value)}
                      placeholder="Enter ID number"
                      disabled={currentStage !== 1}
                      data-testid="input-ubo-id"
                    />
                  </div>
                  <UploadBox
                    label="Government-issued ID"
                    accept=".pdf,.jpg,.png"
                    status={idDocStatus}
                    onUpload={(file) => {
                      console.log("ID uploaded:", file.name);
                      setIdDocStatus("verified");
                    }}
                  />
                  <UploadBox
                    label="Proof of Address"
                    accept=".pdf,.jpg,.png"
                    status={addressProofStatus}
                    onUpload={(file) => {
                      console.log("Address proof uploaded:", file.name);
                      setAddressProofStatus("verified");
                    }}
                  />
                  {currentStage === 1 && (
                    <Button
                      onClick={handleStage2Next}
                      className="w-full"
                      disabled={!uboName || !uboIdNumber}
                      data-testid="button-stage-2-next"
                    >
                      Continue to Business Validation
                    </Button>
                  )}
                </div>
              </CardStage>

              <CardStage
                title={stages[2].title}
                icon={stages[2].icon}
                status={getStageStatus(2)}
                number={3}
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sector">Business Sector</Label>
                    <Input
                      id="sector"
                      value={businessSector}
                      onChange={(e) => setBusinessSector(e.target.value)}
                      placeholder="e.g., Technology"
                      disabled={currentStage !== 2}
                      data-testid="input-business-sector"
                    />
                  </div>
                  <div>
                    <Label htmlFor="funds">Source of Funds</Label>
                    <Textarea
                      id="funds"
                      value={sourceOfFunds}
                      onChange={(e) => setSourceOfFunds(e.target.value)}
                      placeholder="Describe the source of funds"
                      disabled={currentStage !== 2}
                      className="resize-none"
                      rows={3}
                      data-testid="input-source-of-funds"
                    />
                  </div>
                  <UploadBox
                    label="Business Documentation"
                    accept=".pdf,.jpg,.png"
                    status={businessDocStatus}
                    onUpload={(file) => {
                      console.log("Business doc uploaded:", file.name);
                      setBusinessDocStatus("verified");
                    }}
                  />
                  {currentStage === 2 && (
                    <Button
                      onClick={handleStage3Complete}
                      className="w-full"
                      disabled={!businessSector || !sourceOfFunds}
                      data-testid="button-complete-journey"
                    >
                      Complete Journey
                    </Button>
                  )}
                </div>
              </CardStage>
            </div>

            <footer className="text-center text-sm text-silver italic" data-testid="text-tagline">
              Every Entity Has a Journey
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
                <CardTitle className="text-3xl font-bold text-foreground" data-testid="text-journey-complete">
                  Journey Complete!
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Your onboarding application has been successfully submitted
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <ProgressRing progress={100} />
                </div>

                <div className="bg-card rounded-lg p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Entity Name</span>
                    <span className="text-sm font-medium" data-testid="text-summary-entity">{entityName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">UBO Verified</span>
                    <StatusChip status="verified" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Documents</span>
                    <StatusChip status="verified" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Risk Score</span>
                    <span className="text-sm font-medium text-cyan" data-testid="text-risk-score">Low Risk (95%)</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" data-testid="button-download-report">
                  <Download className="w-4 h-4 mr-2" />
                  Download Due Diligence Report
                </Button>

                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setJourneyComplete(false);
                      setCurrentStage(0);
                      setEntityName("");
                      setCountry("");
                      setIncorporationDate("");
                      setCertificateStatus("pending");
                      setUboName("");
                      setUboIdNumber("");
                      setIdDocStatus("pending");
                      setAddressProofStatus("pending");
                      setBusinessSector("");
                      setSourceOfFunds("");
                      setBusinessDocStatus("pending");
                    }}
                    data-testid="button-start-new-journey"
                  >
                    Start New Journey
                  </Button>
                </div>
              </CardContent>
            </Card>

            <footer className="text-center text-sm text-silver italic mt-8" data-testid="text-tagline-complete">
              Every Entity Has a Journey
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
