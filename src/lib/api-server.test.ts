/* eslint-disable @typescript-eslint/require-await */

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getAccessToken } from "./cookies";
import { apiServer, requireAdminRole } from "./api-server";
import { redirect } from "next/navigation";

jest.mock("./cookies");

jest.mock("next/navigation", () => ({
  redirect: jest.fn(() => {
    throw new Error("NEXT_REDIRECT");
  }),
}));

jest.mock("next/dist/client/components/redirect-error", () => ({
  isRedirectError: jest.fn(),
}));

const originalFetch = global.fetch;
const originalEnv = process.env;

describe("api-server", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    process.env = {
      ...originalEnv,
      API_URL: "http://localhost:3001",
      ACCESS_TOKEN_COOKIE_NAME: "access-token",
    };
    jest.clearAllMocks();

    (isRedirectError as unknown as jest.Mock).mockImplementation(
      (err) => err instanceof Error && err.message === "NEXT_REDIRECT",
    );
  });

  afterAll(() => {
    global.fetch = originalFetch;
    process.env = originalEnv;
  });

  describe("apiServer", () => {
    it("Should redirect to '/' if dont have 'access-token' cookie", async () => {
      jest.mocked(getAccessToken).mockResolvedValue(undefined);

      await expect(apiServer).rejects.toThrow("NEXT_REDIRECT");

      expect(redirect).toHaveBeenCalledWith("/");
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("Should add 'access-token' in 'Authorization' header", async () => {
      jest.mocked(getAccessToken).mockResolvedValue("test-jwt-token");

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ id: "1" }),
      });

      await apiServer("/api/test");

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/test",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer test-jwt-token",
          },
          cache: "no-store",
        },
      );
    });

    it("Should redirect to '/' if the API retuns 401", async () => {
      jest.mocked(getAccessToken).mockResolvedValue("expired-token-jwt");

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 401,
      });

      await expect(apiServer).rejects.toThrow("NEXT_REDIRECT");

      expect(redirect).toHaveBeenCalledWith("/");
    });
  });

  describe("requireAdminRole", () => {
    it("Should return the user if they have the 'ADMIN' role", async () => {
      jest.mocked(getAccessToken).mockResolvedValue("jwt-access-token");

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => ({
          id: "1",
          name: "John Doe",
          email: "john@email.com",
          roles: [{ name: "ADMIN" }],
        }),
      });

      const user = await requireAdminRole();

      expect(user.roles).toContainEqual({ name: "ADMIN" });
      expect(redirect).not.toHaveBeenCalled();
    });

    it("Should redirect to '/' if the user dont have the 'ADMIN' role", async () => {
      jest.mocked(getAccessToken).mockResolvedValue("jwt-access-token");

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => ({
          id: "1",
          name: "John Doe",
          email: "john@email.com",
          roles: [{ name: "USER" }],
        }),
      });

      await expect(requireAdminRole()).rejects.toThrow("NEXT_REDIRECT");
      expect(redirect).toHaveBeenCalledWith("/");
    });
  });
});
