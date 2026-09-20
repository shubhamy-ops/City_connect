# Archived / unused code

## python_backend/

This is a second, unused implementation of the same API (auth, issues, stats)
written in FastAPI. It is not imported by the frontend, not referenced in any
npm script, and not wired into the Vite dev proxy (which points at the Node
backend on port 5000).

Nothing currently depends on it. I moved it here rather than deleting it so
you can:
- confirm it's genuinely dead before removing it for good, or
- salvage any logic from it if you intended to migrate to Python at some point.

If you don't need it, delete this whole `unused/` folder before your final
submission — a repo with two competing backends for the same routes reads as
unfinished/confused to judges.
