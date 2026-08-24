# Security Findings

## P0: Client-side Admin Authentication Bypass [F-001]
- **Exploit Path**: An attacker opens browser DevTools and sets `sessionStorage.setItem('zyntral_admin_authed', 'true')` to bypass the lock screen.
- **Impact**: Complete compromise of the admin portal, allowing unauthorized access to waitlist, contacts, and system settings.
- **Fix**: Move authentication to the Convex backend and use HTTP-only cookies or proper JWT session handling.
- **Effort**: Medium

## P0: Missing Backend Authorization Checks [F-002]
- **Exploit Path**: An attacker bypasses the frontend and directly invokes Convex mutations (e.g., `api.settings.resetAll`) using the exposed Convex URL.
- **Impact**: Total data loss (wiping DB) or unauthorized data manipulation.
- **Fix**: Implement `auth.getUserIdentity()` checks in all Convex mutations to verify administrative privileges before executing destructive actions.
- **Effort**: High