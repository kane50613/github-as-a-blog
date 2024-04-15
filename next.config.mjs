/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  // disable the `X-Powered-By` header to improve security
  poweredByHeader: false,
};

export default config;
