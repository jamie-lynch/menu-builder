import { Response } from "express";
import LoggerRequest from "../types/LoggerRequest";
import { getRepository } from "typeorm";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";
import { Ingredient } from "../entities/Ingredient";
import express from "express";
import { getOrderObject, getWhereObject } from "../utils/queryParser";

const router = express.Router();

/**
 * @swagger
 *
 * /ingredient:
 *   get:
 *     description: Get all ingredients
 *     tags:
 *       - Ingredients
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: The page of results to return
 *         in: query
 *         required: false
 *         type: number
 *         default: 0
 *       - name: results
 *         description: The number of results to return
 *         in: query
 *         required: false
 *         type: number
 *         default: 15
 *       - name: search
 *         description: An object of keys and values to filter by
 *         in: query
 *         required: false
 *         type: object
 *       - name: order
 *         description: An object of keys and orders to sort by
 *         in: query
 *         required: false
 *         type: object
 *     responses:
 *       200:
 *         description: Returns a list of ingredients
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Ingredient'
 */
router.get("/", (req: LoggerRequest, res: Response) => {
  const repo = getRepository(Ingredient);

  const page = req.query.page ? parseInt(req.query.page as string, 10) : 0;
  const results = req.query.results
    ? parseInt(req.query.results as string, 10)
    : 15;

  const order = getOrderObject(req.query.order as object, Ingredient.sortableKeys)
  const where = getWhereObject(req.query.search as object, Ingredient.filterObject)

  repo
    .find({ take: results, skip: page * results, order, where })
    .then((dishes) => res.json(dishes))
    .catch((err) => res.status(500).send(err.message));
});

/**
 * @swagger
 *
 * /ingredient/{id}:
 *   get:
 *     description: Get a single ingredient by id
 *     tags:
 *       - Dishes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: The id of the ingredient to return
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Returns a single ingredient
 *         schema:
 *           $ref: '#/definitions/Ingredient'
 */
router.get("/:id", (req: LoggerRequest, res: Response) => {
  const repo = getRepository(Ingredient);

  repo
    .findOneOrFail(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => {
      if (err instanceof EntityNotFoundError) {
        return res.status(404).send("No ingredient was found with that id");
      } else {
        return res.status(500).send(err.message);
      }
    });
});

/**
 * @swagger
 *
 * /ingredient:
 *   post:
 *     description: Create a new ingredient
 *     tags:
 *       - Ingredients
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: The name of the new ingredient
 *         in: body
 *         required: true
 *         type: string
 *       - name: description
 *         description: A description of the ingredient
 *         in: body
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Returns the newly created ingredient
 *         schema:
 *           $ref: '#/definitions/Ingredient'
 */
router.post("/", (req: LoggerRequest, res: Response) => {
  const repo = getRepository(Ingredient);

  const { name, description } = req.body;

  if (!name) {
    return res.status(400).send("Please provide a name value");
  }

  const ingredient = new Ingredient();
  ingredient.name = name;
  ingredient.description = description

  repo
    .save(ingredient)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
});

/**
 * @swagger
 *
 * /ingredient/{id}:
 *   put:
 *     description: Edit an ingredient
 *     tags:
 *       - Ingredients
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: The new name of the ingredient
 *         in: body
 *         required: true
 *         type: string
 *       - name: description
 *         description: A description of the ingredient
 *         in: body
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Returns the newly updated ingredient
 *         schema:
 *           $ref: '#/definitions/Ingredient'
 */
router.put("/:id", (req: LoggerRequest, res: Response) => {
  const repo = getRepository(Ingredient);

  const { name, description } = req.body;

  if (!name) {
    return res.status(400).send("Please provide a name value");
  }

  repo
    .findOneOrFail(req.params.id)
    .then((ingredient) => {
      ingredient.name = name;
      ingredient.description = description
      return repo.save(ingredient);
    })
    .then((result) => res.json(result))
    .catch((err) => {
      if (err instanceof EntityNotFoundError) {
        return res.status(404).send("No ingredient was found with that id");
      } else {
        return res.status(500).send(err.message);
      }
    });
});

/**
 * @swagger
 *
 * /ingredient/{id}:
 *   delete:
 *     description: Delete a ingredient
 *     tags:
 *       - Ingredients
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns confirmation
 */
router.delete("/:id", (req: LoggerRequest, res: Response) => {
  const repo = getRepository(Ingredient);

  repo.delete(req.params.id).then((result) => {
    if (result.affected > 0) {
      return res.send("ok");
    } else {
      return res.status(404).send("No ingredient was found with that id");
    }
  });
});

export default router;
