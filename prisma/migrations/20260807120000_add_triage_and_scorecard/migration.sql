-- Escalation operator brief on tickets
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "triage" JSONB;

-- Interactive interview scorecard on candidates
ALTER TABLE "Candidate" ADD COLUMN IF NOT EXISTS "interviewScorecard" JSONB;