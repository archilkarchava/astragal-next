import sanityClient from "@sanity/client"
import type { ClientConfig } from "@sanity/client"

const options = {
  // Find your project ID and dataset in `sanity.json` in your studio project
  dataset: "production",
  projectId: process.env.NEXT_PUBLIC_ASTRAGAL_SANITY_PROJECT_ID,
  useCdn: false,
  // useCdn: process.env.NODE_ENV === "production",
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
} as ClientConfig

const client = sanityClient(options)

export const previewClient = sanityClient({
  ...options,
  useCdn: false,
  token: process.env.ASTRAGAL_SANITY_API_TOKEN,
} as ClientConfig)

export default client
