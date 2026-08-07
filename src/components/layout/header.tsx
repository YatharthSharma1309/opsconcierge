import { WorkspaceStatusBadge } from "@/components/layout/workspace-status-badge";

type HeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  readyDocuments?: number;
  aiConfigured?: boolean;
};

export function Header({
  title,
  description,
  action,
  readyDocuments,
  aiConfigured,
}: HeaderProps) {
  const showStatus =
    readyDocuments !== undefined && aiConfigured !== undefined;

  return (
    <div className="border-b border-border px-4 py-5 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              {description}
            </p>
          ) : null}
        </div>

        {showStatus || action ? (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {showStatus ? (
              <WorkspaceStatusBadge
                readyDocuments={readyDocuments}
                aiConfigured={aiConfigured}
              />
            ) : null}
            {action}
          </div>
        ) : null}
      </div>
    </div>
  );
}
