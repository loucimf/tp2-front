import { describe, expect, it } from "vitest";
import type { RawgGame } from "../src/hooks/useGames";
import {
  buildGameSummary,
  buildPageItems,
  getPlatformIcons,
  splitAccentTitle,
} from "../src/components/explore/explore.utils";

// Builder de un RawgGame mínimo. Solo nos importan los campos que usa la
// lógica bajo prueba (genres, parent_platforms, name); el resto va con
// valores por defecto para no acoplar los tests a datos irrelevantes.
const makeGame = (overrides: Partial<RawgGame> = {}): RawgGame => ({
  id: 1,
  name: "Test Game",
  background_image: null,
  genres: [],
  metacritic: null,
  parent_platforms: [],
  playtime: 0,
  rating: 0,
  ratings_count: 0,
  rating_top: 0,
  released: null,
  slug: "test-game",
  ...overrides,
});

const genre = (name: string, slug = name.toLowerCase()) => ({
  id: name.length,
  name,
  slug,
});

const platform = (name: string, slug: string) => ({
  platform: { id: slug.length, name, slug },
});

describe("buildPageItems", () => {
  it("devuelve todas las páginas sin ellipsis cuando hay 5 o menos", () => {
    expect(buildPageItems(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(buildPageItems(2, 3)).toEqual([1, 2, 3]);
  });

  it("no agrega ellipsis inicial cuando la página está al comienzo", () => {
    // page=3 de 10: ventana 2..4 pegada al 1, sin ellipsis a la izquierda.
    expect(buildPageItems(3, 10)).toEqual([1, 2, 3, 4, "...", 10]);
  });

  it("agrega ellipsis a ambos lados cuando la página está en el medio", () => {
    expect(buildPageItems(5, 10)).toEqual([1, "...", 4, 5, 6, "...", 10]);
  });

  it("no agrega ellipsis final cuando la página está al final", () => {
    expect(buildPageItems(10, 10)).toEqual([1, "...", 9, 10]);
  });

  it("siempre incluye la primera y la última página", () => {
    const items = buildPageItems(6, 20);
    expect(items[0]).toBe(1);
    expect(items.at(-1)).toBe(20);
  });
});

describe("getPlatformIcons", () => {
  it("traduce los slugs de plataforma a sus iconos", () => {
    const game = makeGame({
      parent_platforms: [
        platform("PC", "pc"),
        platform("PlayStation", "playstation"),
        platform("Xbox", "xbox"),
      ],
    });

    expect(getPlatformIcons(game)).toEqual(["windows", "playstation", "xbox"]);
  });

  it("descarta plataformas sin icono conocido (ej. Nintendo, Mac)", () => {
    const game = makeGame({
      parent_platforms: [
        platform("Nintendo Switch", "nintendo"),
        platform("PC", "pc"),
        platform("macOS", "mac"),
      ],
    });

    expect(getPlatformIcons(game)).toEqual(["windows"]);
  });

  it("nunca devuelve más de 3 iconos", () => {
    const game = makeGame({
      parent_platforms: [
        platform("PC", "pc"),
        platform("PlayStation", "playstation"),
        platform("Xbox", "xbox"),
        platform("PC 2", "pc-2"),
      ],
    });

    expect(getPlatformIcons(game)).toHaveLength(3);
  });
});

describe("buildGameSummary", () => {
  it("combina géneros y plataforma cuando hay ambos", () => {
    const game = makeGame({
      genres: [genre("RPG"), genre("Action")],
      parent_platforms: [platform("PlayStation", "playstation")],
    });

    expect(buildGameSummary(game)).toBe(
      "RPG / Action built for PlayStation and beyond.",
    );
  });

  it("usa el mensaje de comunidad cuando solo hay géneros", () => {
    const game = makeGame({ genres: [genre("Indie")] });

    expect(buildGameSummary(game)).toBe(
      "Indie with a strong community following.",
    );
  });

  it("lista las plataformas cuando solo hay plataformas", () => {
    const game = makeGame({
      parent_platforms: [platform("PC", "pc"), platform("Xbox", "xbox")],
    });

    expect(buildGameSummary(game)).toBe("Available on PC, Xbox.");
  });

  it("cae al texto genérico cuando no hay géneros ni plataformas", () => {
    expect(buildGameSummary(makeGame())).toBe(
      "Discover one of the most talked-about games in the catalog.",
    );
  });
});

describe("splitAccentTitle", () => {
  it("separa la última palabra como acento", () => {
    expect(splitAccentTitle("Cyberpunk 2077")).toEqual({
      lead: "Cyberpunk",
      accent: "2077",
    });
  });

  it("deja el acento vacío cuando hay una sola palabra", () => {
    expect(splitAccentTitle("Hades")).toEqual({ lead: "Hades", accent: "" });
  });

  it("ignora los espacios sobrantes entre palabras", () => {
    expect(splitAccentTitle("  The   Last   of   Us  ")).toEqual({
      lead: "The Last of",
      accent: "Us",
    });
  });
});
