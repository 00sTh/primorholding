# Deferred Items — Phase 02 Public Site

## Pre-existing Build Issue: Turbopack Workspace Root Detection

**Found during:** 02-03 Task 2 verification
**Status:** Pre-existing — confirmed by git stash test; build failed before Plan 02-03 changes
**Scope:** Out-of-scope for 02-03 (not caused by current task changes)

### Issue Description

`pnpm build` fails with Turbopack errors:
```
Module not found: Can't resolve '@prisma/client/runtime/client'
Module not found: Can't resolve '@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs'
```

Root cause: Next.js/Turbopack detects `package-lock.json` at `/home/sth/` as workspace root instead of `/home/sth/PrimorHolding/pnpm-lock.yaml`. This causes module resolution to fail for Prisma 7 generated client.

Warning shown: "Next.js inferred your workspace root... detected multiple lockfiles and selected /home/sth/package-lock.json as root directory."

### Suggested Fix (for deploy/production phase)

Option 1: Set `turbopack.root` in `next.config.ts`:
```typescript
const nextConfig = {
  experimental: {
    turbopack: {
      root: __dirname,
    },
  },
};
```

Option 2: Remove `/home/sth/package-lock.json` if it's not needed (orphaned lockfile from unrelated projects in home directory).

### Notes

- `pnpm type-check` (tsc --noEmit) passes clean — no TypeScript errors
- This is an execution environment issue, not a code correctness issue
- Will block production `pnpm build` — should be addressed in Phase 04 (Deploy)
