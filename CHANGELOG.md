# Changelog

All notable changes made as a sequence of focused edits (one per commit):

11. Fix `utils/logger.js` so error logging no longer crashes.
12. Validate environment variables before app startup and preserve explicit CORS origins.
13. Add explicit missing-field checks to auth validators and separate login validation from signup strength rules.
14. Harden bearer token parsing in `src/middlewares/auth.middleware.js`.
15. Route 5xx middleware logging through the shared logger.
16. Log full async handler errors instead of only the message.
17. Use the shared logger for MongoDB connection output.
18. Centralize pagination and filter parsing in the artifact query validator.
19. Expand the README with setup, env, and endpoint documentation.

1. Add README.md with project overview and quick start.
2. Add helpful `scripts` to `package.json` (`dev`, `start:prod`, `lint`, `test`).
3. Add `utils/logger.js` — small timestamped logger.
4. Use logger in `server.js` for startup/shutdown messages.
5. Enhance `src/utils/async-handler.js` to log unhandled async errors.
6. Add JSDoc comments to `src/controllers/auth.controller.js` handlers.
7. Add `missingFields` helper to `src/utils/validators.js`.
8. Add `.gitignore` with common Node entries.
9. Add header docs to `src/routes/auth.routes.js` describing endpoints.
10. Add this `CHANGELOG.md` summarizing the above commits.
