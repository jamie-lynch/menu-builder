import { getRepository } from "typeorm";
import { Dish } from "../../src/entities/Dish";
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
