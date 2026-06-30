import { describe, expect, it } from "vitest";
import {
  formatLibraryPrice,
  getCategoryIcon,
} from "../src/components/library/library.utils";

describe("formatLibraryPrice", () => {
  it("devuelve 'Not set' cuando el precio es null", () => {
    expect(formatLibraryPrice(null)).toBe("Not set");
  });

  it("formatea el precio como moneda USD", () => {
    expect(formatLibraryPrice(59.99)).toBe("$59.99");
  });

  it("formatea correctamente el precio cero (distinto de 'Not set')", () => {
    expect(formatLibraryPrice(0)).toBe("$0.00");
  });
});

describe("getCategoryIcon", () => {
  it("mapea categorías de rol a 'star'", () => {
    expect(getCategoryIcon("RPG")).toBe("star");
    expect(getCategoryIcon("Role-Playing")).toBe("star");
  });

  it("mapea acción/shooter/aventura a 'play'", () => {
    expect(getCategoryIcon("Action")).toBe("play");
    expect(getCategoryIcon("Shooter")).toBe("play");
    expect(getCategoryIcon("Adventure")).toBe("play");
  });

  it("mapea estrategia/simulación a 'filter'", () => {
    expect(getCategoryIcon("Strategy")).toBe("filter");
    expect(getCategoryIcon("Simulation")).toBe("filter");
  });

  it("mapea carreras/deportes a 'trending'", () => {
    expect(getCategoryIcon("Racing")).toBe("trending");
    expect(getCategoryIcon("Sports")).toBe("trending");
  });

  it("mapea indie/puzzle a 'offer'", () => {
    expect(getCategoryIcon("Indie")).toBe("offer");
    expect(getCategoryIcon("Puzzle")).toBe("offer");
  });

  it("es insensible a mayúsculas/minúsculas", () => {
    expect(getCategoryIcon("aCtIoN")).toBe("play");
  });

  it("usa 'library' como ícono por defecto para categorías desconocidas", () => {
    expect(getCategoryIcon("Visual Novel")).toBe("library");
    expect(getCategoryIcon("")).toBe("library");
  });
});
