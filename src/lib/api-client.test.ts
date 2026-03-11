/* eslint-disable @typescript-eslint/require-await */

import { apiClient } from "./api-client";

const originalFetch = global.fetch;

describe("api-client", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("Should return the data in case of success", async () => {
    const mockData = {
      id: "1",
      name: "John Doe",
      email: "john@email.com",
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    const result = await apiClient("/api/test");

    expect(global.fetch).toHaveBeenCalledWith("/api/test", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(result).toEqual({ data: mockData, status: 200 });
  });

  it("Should return API errors", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: ["Test error"] }),
    });

    const result = await apiClient("/api/test");

    expect(result).toEqual({
      error: ["Test error"],
      status: 400,
    });
  });

  it("Should return error 500 with generic message in case of network failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error(""));

    const result = await apiClient("/api/test");

    expect(result).toEqual({
      error: ["Erro de conexão com o servidor"],
      status: 500,
    });
  });
});
