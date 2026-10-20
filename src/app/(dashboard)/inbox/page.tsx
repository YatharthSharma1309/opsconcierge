import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { requireOrgMembershipOrRedirect } from "@/lib/auth";
import { customerConversationWhere } from "@/lib/conversations/filters";
import { db } from "@/lib/db";
import { RelativeTime } from "@/components/ui/relative-time";
import { EmptyState } from "@/components/ui/empty-state";
import { Inbox } from "lucide-react";

export default async function InboxPage() {
  const { organization } = await requireOrgMembershipOrRedirect();

  const conversations = await db.conversation.findMany({
    where: customerConversationWhere(organization.id),
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      tickets: {
        select: { id: true, status: true },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <>
      <Header
        title="Inbox"
        description="Shared threads from the website chat. Open one, or pick up a case the assistant handed to you."
      />

      <main id="main-content" className="flex-1 px-4 py-6 sm:p-6 lg:p-8">
        {conversations.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No threads yet"
            description="Threads show up here once someone uses the website chat."
          />
        ) : (
          <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {conversations.map((conversation) => {
              const lastMessage = conversation.messages[0];
              const linkedTicket = conversation.tickets[0];
              const waitingOnYou =
                !linkedTicket && lastMessage?.role === "USER";
              const label = linkedTicket
                ? "With you"
                : waitingOnYou
                  ? "Waiting"
                  : "Answered";
              const tone = linkedTicket
                ? "warning"
                : waitingOnYou
                  ? "info"
                  : "success";
              const preview = lastMessage
                ? lastMessage.content
                : "No messages yet";

              return (
                <li key={conversation.id}>
                  <div className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50">
                    <Link href={`/inbox/${conversation.id}`} className="min-w-0 flex-1">
                      <p className="truncate font-medium text-slate-900">
                        {conversation.title ?? "Support chat"}
                      </p>
                      <p className="mt-1 line-clamp-1 text-sm text-slate-600">{preview}</p>
                    </Link>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span className="text-xs text-slate-500">
                        <RelativeTime date={conversation.updatedAt} />
                      </span>
                      <Badge tone={tone}>{label}</Badge>
                      {linkedTicket ? (
                        <Link
                          href={`/tickets/${linkedTicket.id}`}
                          className="text-xs font-medium text-slate-500 hover:text-slate-800"
                        >
                          Open case
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}
