import OpenAI from "openai";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are the Compliance Verification Agent for Arie Finance.
Your task is to guide corporate applicants through the "Corporate Account Application" process and perform automated checks on submitted documents.

Tone: Professional, clear, direct — as if you were a senior compliance associate welcoming a client. Avoid jargon or marketing tone.

When interacting:
- Clearly state what the applicant must do at each step
- Provide status feedback for document uploads (e.g., "Digitally verified", "Pending review", "Re-upload required")
- Escalate anomalies or mismatches to manual review with a concise explanation
- Use brand consistent language: "Corporate Account Application", "Application Review Dashboard", "Compliance Score", "Due Diligence Summary"

Your workflow:
1. Applicant fills stage 1 (Entity Information) → you confirm receipt & check registration details
2. Applicant completes stage 2 (Governance & Ownership) → you verify IDs, UBOs, etc.
3. Applicant completes stage 3 (Business Operations) → you review business overview, operating jurisdictions
4. Applicant completes stage 4 (Account & Financial Details) → you assess account purpose, currencies, financial forecasts
5. Applicant completes stage 5 (Documentation & Compliance) → you review all uploads and generate the Due Diligence Summary
6. Final step: Notify applicant of submission completion and expected review timeline

Be precise, professional, supportive. End each message with the next actionable item for the applicant unless the application is complete.

When analyzing data:
- For entity information: Verify completeness of registration details, check incorporation date is reasonable
- For governance: Ensure all directors and UBOs are properly documented
- For business operations: Assess clarity of business description and jurisdictional scope
- For financial details: Evaluate reasonableness of projections and transaction volumes
- For documentation: Confirm all required documents are present

Provide a compliance score (0-100) based on:
- Completeness of information: 40 points
- Quality of documentation: 30 points
- Risk assessment: 30 points

When a stage is completed, acknowledge it and guide them to the next step.`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function getComplianceAgentResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = [],
  context?: {
    stage?: number;
    applicationData?: any;
  }
): Promise<string> {
  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...conversationHistory,
  ];

  // Add context information if provided
  if (context) {
    let contextMessage = "";
    if (context.stage !== undefined) {
      const stageNames = [
        "Entity Information",
        "Governance & Ownership",
        "Business Operations",
        "Account & Financial Details",
        "Documentation & Compliance",
      ];
      contextMessage += `Current stage: ${context.stage + 1} - ${stageNames[context.stage]}\n`;
    }
    if (context.applicationData) {
      contextMessage += `Application data: ${JSON.stringify(context.applicationData, null, 2)}\n`;
    }
    if (contextMessage) {
      messages.push({
        role: "system",
        content: `Context:\n${contextMessage}`,
      });
    }
  }

  messages.push({ role: "user", content: userMessage });

  const response = await openai.chat.completions.create({
    model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    messages,
    max_completion_tokens: 1024,
    temperature: 1,
  });

  return response.choices[0]?.message?.content || "I apologize, but I'm unable to process your request at this moment. Please try again.";
}

export async function analyzeStageCompletion(
  stage: number,
  data: any
): Promise<{
  status: "verified" | "pending" | "warning";
  message: string;
  score: number;
}> {
  const stageNames = [
    "Entity Information",
    "Governance & Ownership",
    "Business Operations",
    "Account & Financial Details",
    "Documentation & Compliance",
  ];

  const prompt = `Analyze the following ${stageNames[stage]} data for completeness and quality.
Provide a brief status message and a compliance score (0-100) for this stage.

Data: ${JSON.stringify(data, null, 2)}

Respond in JSON format:
{
  "status": "verified" | "pending" | "warning",
  "message": "brief professional message",
  "score": number (0-100)
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    max_completion_tokens: 512,
    temperature: 1,
  });

  const result = JSON.parse(response.choices[0]?.message?.content || "{}");
  return {
    status: result.status || "pending",
    message: result.message || "Stage completed. Proceeding to next step.",
    score: result.score || 0,
  };
}

export async function generateDueDiligenceSummary(
  applicationData: any
): Promise<string> {
  const prompt = `Generate a comprehensive Due Diligence Summary for this corporate account application.
Include: entity overview, governance structure, business operations assessment, financial viability, and overall compliance recommendation.

Application Data: ${JSON.stringify(applicationData, null, 2)}

Format the summary professionally with clear sections.`;

  const response = await openai.chat.completions.create({
    model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    max_completion_tokens: 2048,
    temperature: 1,
  });

  return response.choices[0]?.message?.content || "Unable to generate summary at this time.";
}
