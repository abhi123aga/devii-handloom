<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Git and Deployment Control Rule
- Do NOT run git commits, pushes, or Vercel CLI deployments unless the user explicitly requests them. All code changes must remain local to the development environment until the user approves or asks to push/deploy.

