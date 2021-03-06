import { getRepository } from "typeorm";
import { Dish } from "../../src/entities/Dish";
import { Ingredient } from "../../src/entities/Ingredient";
import faker from "faker";

export const dish = async (
  num: number,
  params: any[] = []
): Promise<Dish[]> => {
  const repo = getRepository(Dish);
  const dishes = [];

  const defaults = {
    name: faker.commerce.productName(),
  };

  for (let i = 0; i < num; i++) {
    const d = new Dish();
    const p = { ...defaults, ...params[i] };

    d.name = p.name;

    const _d = await repo.save(d);
    dishes.push(_d);
  }
  return dishes;
};

export const ingredient = async (
  num: number,
  params: any[] = []
): Promise<Ingredient[]> => {
  const repo = getRepository(Ingredient);
  const ingredients = [];

  const defaults = {
    name: faker.commerce.productName(),
    description: faker.company.catchPhrase(),
  };

  for (let i = 0; i < num; i++) {
    const d = new Ingredient();
    const p = { ...defaults, ...params[i] };

    d.name = p.name;

    const _d = await repo.save(d);
    ingredients.push(_d);
  }
  return ingredients;
};
