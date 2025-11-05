import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  getComplianceAgentResponse,
  analyzeStageCompletion,
  generateDueDiligenceSummary,
} from "./compliance-agent";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new application
  app.post("/api/applications", async (req, res) => {
    try {
      const referenceNumber = `APP-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 9999)
      ).padStart(4, "0")}`;

      const application = await storage.createApplication({
        referenceNumber,
        currentStage: 0,
        status: "in_progress",
      });

      // Create initial welcome message
      const welcomeMessage = await getComplianceAgentResponse(
        "I'm starting a new corporate account application",
        [],
        { stage: 0 }
      );

      await storage.createAgentMessage({
        applicationId: application.id,
        role: "assistant",
        content: welcomeMessage,
        stage: 0,
      });

      res.json({ application, welcomeMessage });
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(500).json({ error: "Failed to create application" });
    }
  });

  // Get application by ID
  app.get("/api/applications/:id", async (req, res) => {
    try {
      const application = await storage.getApplicationById(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).json({ error: "Failed to fetch application" });
    }
  });

  // Update application stage data
  app.patch("/api/applications/:id/stage", async (req, res) => {
    try {
      const { stage, data } = req.body;
      const application = await storage.getApplicationById(req.params.id);

      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }

      const stageFields = [
        "entityData",
        "governanceData",
        "businessData",
        "financialData",
        "documentationData",
      ];

      const updateData: any = {
        currentStage: stage,
        [stageFields[stage]]: data,
      };

      const updatedApplication = await storage.updateApplication(
        req.params.id,
        updateData
      );

      // Analyze stage completion
      const analysis = await analyzeStageCompletion(stage, data);

      // Create agent message with analysis
      await storage.createAgentMessage({
        applicationId: application.id,
        role: "assistant",
        content: analysis.message,
        stage,
        metadata: { status: analysis.status, score: analysis.score },
      });

      res.json({ application: updatedApplication, analysis });
    } catch (error) {
      console.error("Error updating application stage:", error);
      res.status(500).json({ error: "Failed to update application stage" });
    }
  });

  // Submit application
  app.post("/api/applications/:id/submit", async (req, res) => {
    try {
      const application = await storage.getApplicationById(req.params.id);

      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }

      const { authRepName, authRepRole } = req.body;

      // Generate Due Diligence Summary
      const summary = await generateDueDiligenceSummary({
        entity: application.entityData,
        governance: application.governanceData,
        business: application.businessData,
        financial: application.financialData,
        documentation: application.documentationData,
        authRepName,
        authRepRole,
      });

      // Calculate overall compliance score
      const messages = await storage.getMessagesByApplication(application.id);
      const scores = messages
        .filter((m) => m.metadata && (m.metadata as any).score)
        .map((m) => (m.metadata as any).score);
      const averageScore = scores.length > 0
        ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length)
        : 0;

      const updatedApplication = await storage.updateApplication(
        req.params.id,
        {
          status: "submitted",
          submittedAt: new Date(),
          complianceScore: averageScore,
        }
      );

      // Create final agent message
      const finalMessage = `Application submitted successfully. Your reference number is ${application.referenceNumber}.

Our compliance team will review your application and supporting documents. You will receive a confirmation email with further instructions within 24 hours. The typical review timeline is 3-5 business days.

${summary}`;

      await storage.createAgentMessage({
        applicationId: application.id,
        role: "assistant",
        content: finalMessage,
        stage: 5,
        metadata: { dueDiligenceSummary: summary },
      });

      res.json({
        application: updatedApplication,
        summary,
        finalMessage,
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ error: "Failed to submit application" });
    }
  });

  // Get agent messages for an application
  app.get("/api/applications/:id/messages", async (req, res) => {
    try {
      const messages = await storage.getMessagesByApplication(req.params.id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send message to agent
  app.post("/api/applications/:id/chat", async (req, res) => {
    try {
      const { message } = req.body;
      const application = await storage.getApplicationById(req.params.id);

      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }

      // Save user message
      await storage.createAgentMessage({
        applicationId: application.id,
        role: "user",
        content: message,
        stage: application.currentStage,
      });

      // Get conversation history
      const history = await storage.getMessagesByApplication(application.id);
      const conversationHistory = history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

      // Get agent response
      const response = await getComplianceAgentResponse(message, conversationHistory, {
        stage: application.currentStage,
        applicationData: {
          entity: application.entityData,
          governance: application.governanceData,
          business: application.businessData,
          financial: application.financialData,
          documentation: application.documentationData,
        },
      });

      // Save agent response
      const agentMessage = await storage.createAgentMessage({
        applicationId: application.id,
        role: "assistant",
        content: response,
        stage: application.currentStage,
      });

      res.json({ message: agentMessage });
    } catch (error) {
      console.error("Error in chat:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // Get all applications (for admin dashboard)
  app.get("/api/applications", async (req, res) => {
    try {
      const applications = await storage.getAllApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
