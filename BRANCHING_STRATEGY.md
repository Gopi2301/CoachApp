# Branching Strategy & Git Workflow

## Overview
We follow a simplified **Git Flow** strategy. This ensures a clean history and stability for the main branch.

### Branches

- **`main`**: The production-ready branch. Do not commit directly to `main`.
- **`develop`** (Optional): A staging branch for integration if multiple developers are working simultaneously.
- **`feature/`**: For new features. Examples: `feature/auth-login`, `feature/user-profile`.
- **`bugfix/`**: For bug fixes. Examples: `bugfix/login-error`, `bugfix/header-alignment`.
- **`hotfix/`**: For critical production fixes that need to be merged immediately to `main`.

## Workflow

1.  **Create a Branch**:
    ```bash
    git checkout -b feature/my-new-feature
    ```
2.  **Commit Changes**:
    - Use conventional commits (e.g., `feat: add login page`, `fix: resolve crash on startup`).
    - Keep commits atomic (one logical change per commit).
3.  **Push and PR**:
    - Push your branch: `git push origin feature/my-new-feature`.
    - Open a Pull Request (PR) to `main` (or `develop`).
4.  **Review and Merge**:
    - Ensure CI checks pass (if configured).
    - Merge via "Squash and Merge" to keep a clean history on `main`.

## Monorepo Context

Since this is a monorepo, a feature branch might touch both `backend` and `frontend`.
- **Atomic Commits**: If a backend API change is required for a frontend feature, commit them together if possible, or in sequence within the same PR.
- **Naming**: If a feature is specific to one side, you can prefix it: `feature/fe-login` or `feature/be-api-auth`.
