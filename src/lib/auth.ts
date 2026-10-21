export {
  assertAuthBypassNotInProduction,
  isAuthBypassEnabled,
} from "@/lib/auth/bypass";

export {
  generateWidgetPublicKey,
  getDemoOrganizationContext,
} from "@/lib/auth/demo";

export {
  authErrorResponse,
  getOrgMembershipContext,
  requireOrgMembership,
  requireOrgMembershipOrRedirect,
  type OrgMembershipContext,
  AuthError,
} from "@/lib/auth/session";

export {
  getWidgetKeyFromRequest,
  resolveWidgetOrganization,
  widgetAuthErrorResponse,
  WidgetAuthError,
} from "@/lib/auth/widget";

export {
  withAdminMembership,
  withOrgMembership,
} from "@/lib/auth/api";
