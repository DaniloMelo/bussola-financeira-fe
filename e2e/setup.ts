// import { test as setup } from "@playwright/test";

// const API_URL = process.env.API_URL || "http://localhost:3001";

// setup("API warmup", async ({ request }) => {
//   console.log(`Starting API warmup on ${API_URL}`);

//   const maxAttempts = 3;
//   let success = false;

//   for (let attempt = 1; attempt <= maxAttempts; attempt++) {
//     try {
//       console.log(`Attempt #${attempt}`);
//       const response = await request.get(`${API_URL}/v1/health`, {
//         timeout: 60 * 1000,
//       });

//       if (response.ok()) {
//         console.log("API successfully warmed up");
//         success = true;
//         break;
//       }
//     } catch (error) {
//       console.log(`Still warming up... (${(error as Error).message})`);
//       if (attempt < maxAttempts) {
//         await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
//       }
//     }
//   }

//   if (!success) {
//     throw new Error(`Failure to warmup the API after ${maxAttempts} attempts`);
//   }
// });

import { request } from "@playwright/test";

const API_URL = process.env.API_URL || "http://localhost:3001";
const MAX_ATTEMPTS = 3;
const ATTEMPT_DELAY = 5 * 1000;
const REQUEST_TIMEOUT = 60 * 1000;

export default async function globalSetup() {
  console.log(`\nStarting API warmup on ${API_URL}\n`);

  let success = false;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      console.log(`Attempt #${attempt}`);

      const apiRequest = await request.newContext();
      const response = await apiRequest.get(`${API_URL}/v1/health`, {
        timeout: REQUEST_TIMEOUT,
      });

      if (response.ok()) {
        console.log("API successfully warmed up");

        success = true;
        await apiRequest.dispose();
        break;
      }

      await apiRequest.dispose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      console.log(`Still warming up... (${errorMessage})`);

      if (attempt < MAX_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, ATTEMPT_DELAY));
      }
    }
  }

  if (!success) {
    throw new Error(`Failure to warmup the API after ${MAX_ATTEMPTS} attempts`);
  }
}
