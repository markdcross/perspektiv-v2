# Dependency security cleanup

Use Node.js 22.12 or newer. Install and verify both dependency trees:

```sh
npm ci
npm test
npm audit
cd client
npm ci
npm test
npm audit
npm run build
```

The frontend now uses Vite and writes to `client/build`, preserving the server's static-file path. Run the client with `npm start` from `client`; it listens on localhost port 3000 and proxies `/api` to port 5000. The legacy React dependency tree uses the checked-in `.npmrc` when installing.

Generated builds are no longer versioned: rebuilding avoids retaining vulnerable JavaScript from the old dependency tree. Before production builds, provide the existing public `REACT_APP_MAPBOX_TOKEN` configuration. Keep database, SMTP and JWT secrets in the server environment; never put them in a `REACT_APP_` variable.

Server upgrades include Mongoose 8, JSON Web Token 9, Multer 2, patched HTTP/email dependencies, removal of unused packages, modern database connection/deletion APIs, and preservation of mural-post cascade deletion. The `qs` override selects a patched compatible 6.x parser.

Verification: all three accessible npm dependency trees reported zero audit findings on 2026-09-10; server unit checks and frontend tests/build passed. These checks do not establish absence of all security bugs. Live MongoDB, SMTP, geocoding and deployment integration have not been tested. Before restarting a deployment, verify those services and upgrade compatibility in a non-production environment.

Weekly Dependabot updates cover both package directories. Alerts only close after fixes reach the repository's default branch and GitHub rescans it.
