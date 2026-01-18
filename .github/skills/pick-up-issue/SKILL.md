---
name: pick-up-issue
description: This skill should be used when the user asks to "pick up an issue", "work on issue #X", "claim issue", "start working on issue", "take this issue", "I'll work on this", or needs to take ownership of a GitHub issue before starting work.
---

# Pick Up a GitHub Issue

This skill ensures proper issue ownership before starting work, avoiding duplicate effort and conflicts.

## Workflow

### 1. Check Issue Status

Run the following command to check if the issue is already claimed:

```bash
gh issue view <issue-number> --json assignees,labels
```

Inspect the output for:
- **Assignees**: Any assigned user indicates the issue is claimed
- **Labels**: A "work in progress" label indicates active work

### 2. Handle Conflicts

If the issue has assignees or a "work in progress" label, warn the user:

> ⚠️ This issue appears to already be in progress (assigned to @username or labeled "work in progress"). Are you sure you want to continue?

Wait for explicit user confirmation before proceeding.

### 3. Claim the Issue

If the issue is available, claim it by running:

```bash
gh issue edit <issue-number> --add-label "work in progress" --add-assignee @me
```

This command:
- Adds the "work in progress" label to signal active work
- Assigns the issue to the current user

### 4. Proceed with Work

After claiming, proceed with the actual work:
- To create a sample → use the `create-devproxy-sample` skill
- To fix a bug → investigate and implement the fix
- To update docs → make the necessary changes

## Quick Reference

| Command | Purpose |
|---------|---------|
| `gh issue view <n> --json assignees,labels` | Check if issue is claimed |
| `gh issue edit <n> --add-label "work in progress"` | Mark as in progress |
| `gh issue edit <n> --add-assignee @me` | Assign to current user |
| `gh issue edit <n> --remove-label "work in progress"` | Remove label when done |

## After Completing Work

When the PR is merged, the issue closes automatically if the PR description includes "Fixes #123". Remove the "work in progress" label at that point.
