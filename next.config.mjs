/** @type {import('next').NextConfig} */
// Keep framework behavior explicit here as deployment-specific options are introduced.
const nextConfig = {
  // Prevent a parent-directory lockfile from changing Turbopack's workspace boundary.
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
