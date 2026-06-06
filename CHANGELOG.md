# Changelog

All notable changes made as a sequence of focused edits (one per commit):

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
