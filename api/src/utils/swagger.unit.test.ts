import swagger from "./swagger";

describe("The swagger module", () => {
  test("exports the generated swagger config", () => {
    const config: any = swagger;
    expect(config.definitions).toBeDefined();
    expect(config.paths).toBeDefined();
    expect(config.info.title).toBe("Menu Builder");
  });
});
