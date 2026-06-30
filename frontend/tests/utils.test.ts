import { describe, expect, it } from "vitest";
import { buildPageItems } from "../src/components/explore/explore.utils";
import { formatLibraryPrice } from "../src/components/library/library.utils";

describe("buildPageItems", () => {
  it("devuelve todas las páginas cuando hay 5 o menos", () => {
    expect(buildPageItems(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("formatLibraryPrice", () => {
  it("devuelve 'Not set' cuando el precio es null", () => {
    expect(formatLibraryPrice(null)).toBe("Not set");
  });

  it("formatea correctamente un precio", () => {
    expect(formatLibraryPrice(59.99)).toContain("$");
  });
});