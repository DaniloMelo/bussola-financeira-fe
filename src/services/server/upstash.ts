import { apiServer } from "@/lib/api-server";

export interface GetLastEmailDateOutput {
  last_email_date: string;
  days_remaining: number;
}

export interface updateEmailDateOutput {
  message: string;
}

export async function getLastEmailDate(): Promise<
  GetLastEmailDateOutput | string[]
> {
  const response = await apiServer<GetLastEmailDateOutput>(
    "/v1/admin/application",
  );

  if (response.error) {
    return response.error;
  }

  return {
    last_email_date: response.data.last_email_date,
    days_remaining: response.data.days_remaining,
  };
}

// export async function updateEmailDate(): Promise<
//   updateEmailDateOutput | string[]
// > {
//   const response = await apiServer<updateEmailDateOutput>(
//     "/v1/admin/application",
//     {
//       method: "POST",
//     },
//   );

//   if (response.error) {
//     return response.error;
//   }

//   return {
//     message: response.data.message,
//   };
// }

// export async function updateEmailDate() {
//   const response = await fetch("/api/admin/application/upstash", {
//     method: "POST",
//   });

//   const body = await response.json();

//   if (!response.ok) {
//     return {
//       error: body.errors,
//       status: response.status,
//     };
//   }

//   return {
//     data: body,
//     status: response.status,
//   };
// }
