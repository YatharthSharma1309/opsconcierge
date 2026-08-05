-- CreateTable
CREATE TABLE "ExecutionRun" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "conversationId" TEXT,
    "userMessageId" TEXT,
    "channel" "ConversationChannel" NOT NULL,
    "trigger" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExecutionRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExecutionLogEntry" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "conversationId" TEXT,
    "userMessageId" TEXT,
    "agent" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "latencyMs" INTEGER,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExecutionLogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExecutionRun_workspaceId_createdAt_idx" ON "ExecutionRun"("workspaceId", "createdAt");
-- CreateIndex
CREATE INDEX "ExecutionRun_conversationId_idx" ON "ExecutionRun"("conversationId");
-- CreateIndex
CREATE INDEX "ExecutionRun_trigger_idx" ON "ExecutionRun"("trigger");

-- CreateIndex
CREATE INDEX "ExecutionLogEntry_workspaceId_createdAt_idx" ON "ExecutionLogEntry"("workspaceId", "createdAt");
-- CreateIndex
CREATE INDEX "ExecutionLogEntry_runId_createdAt_idx" ON "ExecutionLogEntry"("runId", "createdAt");

-- AddForeignKey
ALTER TABLE "ExecutionLogEntry" ADD CONSTRAINT "ExecutionLogEntry_runId_fkey" FOREIGN KEY ("runId") REFERENCES "ExecutionRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

