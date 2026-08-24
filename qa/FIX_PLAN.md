# Remediation Fix Plan

## Phase 0 – STOP THE BLEED
**Goal**: Secure the admin portal and prevent unauthorized data access/destruction.
**Exit Criteria**: Admin portal requires backend authentication; all mutations are protected.
- **Task 1**: Implement proper backend authentication (e.g., Clerk or Convex Auth) and remove `sessionStorage` bypass [F-001].
- **Task 2**: Add authorization checks to all mutating Convex endpoints [F-002].

## Phase 1 – STABILITY
**Goal**: Improve resilience and error visibility.
**Exit Criteria**: No swallowed errors; proper feedback to users.
- **Task 3**: Add global error boundaries and structured error logging for Convex mutations [F-003].

## Phase 2 – HARDENING
**Goal**: Performance and resilience improvements.
**Exit Criteria**: Rate limits on public forms.
- **Task 4**: Add rate-limiting to contact and waitlist submission forms.

## Phase 3 — QUALITY & DEBT
**Goal**: Clean up technical debt and linting errors.
**Exit Criteria**: Zero lint errors, strict typing.
- **Task 5**: Fix React state mutation in `Workspace.tsx` [F-004].
- **Task 6**: Replace all `any` types with proper TypeScript interfaces [F-005].