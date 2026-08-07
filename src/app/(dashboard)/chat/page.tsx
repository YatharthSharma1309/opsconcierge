import { Header } from "@/components/layout/header";
import { ChatPanelLoader } from "@/components/chat/chat-panel-loader";
import { requireOrgMembershipOrRedirect } from "@/lib/auth";
import { db } from "@/lib/db";
import { getAgentSettings } from "@/lib/settings";

export default async function ChatPage() {
  const { organization } = await requireOrgMembershipOrRedirect();
  const [readyDocuments, settings] = await Promise.all([
    db.document.count({
      where: { organizationId: organization.id, status: "READY" },
    }),
    getAgentSettings(organization.id),
  ]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <Header
        title="AI Chatbot"
        description="Ask from your knowledge base — answers stream with sources."
      />
      <main
        id="main-content"
        className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-3 sm:px-4 sm:py-4 lg:px-6"
      >
        <ChatPanelLoader
          hasDocuments={readyDocuments > 0}
          welcomeMessage={settings.greeting}
        />
      </main>
    </div>
  );
}
