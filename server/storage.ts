import type { InsertApplication, Application, InsertAgentMessage, AgentMessage } from "@shared/schema";

export interface IStorage {
  // Applications
  createApplication(data: InsertApplication): Promise<Application>;
  getApplicationById(id: string): Promise<Application | undefined>;
  getApplicationByReference(referenceNumber: string): Promise<Application | undefined>;
  updateApplication(id: string, data: Partial<InsertApplication>): Promise<Application>;
  getAllApplications(): Promise<Application[]>;

  // Agent Messages
  createAgentMessage(data: InsertAgentMessage): Promise<AgentMessage>;
  getMessagesByApplication(applicationId: string): Promise<AgentMessage[]>;
}

export class MemStorage implements IStorage {
  private applications: Map<string, Application> = new Map();
  private agentMessages: Map<string, AgentMessage> = new Map();

  async createApplication(data: InsertApplication): Promise<Application> {
    const id = crypto.randomUUID();
    const now = new Date();
    const application: Application = {
      id,
      referenceNumber: data.referenceNumber,
      currentStage: data.currentStage ?? 0,
      status: data.status ?? "in_progress",
      createdAt: now,
      updatedAt: now,
      submittedAt: data.submittedAt || null,
      complianceScore: data.complianceScore || null,
      entityData: data.entityData || null,
      governanceData: data.governanceData || null,
      businessData: data.businessData || null,
      financialData: data.financialData || null,
      documentationData: data.documentationData || null,
    };
    this.applications.set(id, application);
    return application;
  }

  async getApplicationById(id: string): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async getApplicationByReference(referenceNumber: string): Promise<Application | undefined> {
    return Array.from(this.applications.values()).find(
      (app) => app.referenceNumber === referenceNumber
    );
  }

  async updateApplication(id: string, data: Partial<InsertApplication>): Promise<Application> {
    const existing = this.applications.get(id);
    if (!existing) {
      throw new Error("Application not found");
    }
    const updated: Application = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };
    this.applications.set(id, updated);
    return updated;
  }

  async getAllApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }

  async createAgentMessage(data: InsertAgentMessage): Promise<AgentMessage> {
    const id = crypto.randomUUID();
    const message: AgentMessage = {
      id,
      ...data,
      createdAt: new Date(),
      stage: data.stage || null,
      metadata: data.metadata || null,
    };
    this.agentMessages.set(id, message);
    return message;
  }

  async getMessagesByApplication(applicationId: string): Promise<AgentMessage[]> {
    return Array.from(this.agentMessages.values())
      .filter((msg) => msg.applicationId === applicationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

export const storage = new MemStorage();
