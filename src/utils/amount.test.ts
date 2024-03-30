import { describe, it, expect } from "vitest";
import { getTotalAmount } from "./amount";

describe("getTotalAmount", () => {
  it("should return the total amount", () => {
    expect(getTotalAmount("8,000円", "79:45")).toEqual({
      rate: 8000,
      time: 79.75,
      total: 638000,
    });
  });
});
