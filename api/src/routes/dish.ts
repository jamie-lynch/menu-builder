import { Response } from "express";
import LoggerRequest from "../types/LoggerRequest";
import { getRepository } from "typeorm";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";
import { Dish } from "../entities/Dish";
import express from "express";

const router = express.Router();

/**
 * @swagger
 *
 * /dish:
 *   get:
 *     description: Get all dishes
 *     tags:
 *       - Dishes
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
 *     responses:
 *       200:
 *         description: Returns a list of dishes
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Dish'
 */
router.get("/", (req: LoggerRequest, res: Response) => {
  const repo = getRepository(Dish);

  const page = req.query.page ? parseInt(req.query.page as string, 10) : 0;
  const results = req.query.results
    ? parseInt(req.query.results as string, 10)
    : 15;

  repo
    .find({ take: results, skip: page * results })
    .then((dishes) => res.json(dishes))
    .catch((err) => res.status(500).send(err.message));
});

/**
 * @swagger
 *
 * /dish/{id}:
 *   get:
 *     description: Get a single dish by id
 *     tags:
 *       - Dishes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: The id of the dish to return
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Returns a single dish
 *         schema:
 *           $ref: '#/definitions/Dish'
 */
router.get("/:id", (req: LoggerRequest, res: Response) => {
  const repo = getRepository(Dish);

  repo
    .findOneOrFail(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => {
      if (err instanceof EntityNotFoundError) {
        return res.status(404).send("No dish was found with that id");
      } else {
        return res.status(500).send(err.message);
      }
    });
});

/**
 * @swagger
 *
 * /dish:
 *   post:
 *     description: Create a new dish
 *     tags:
 *       - Dishes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: The name of the new dish
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns the newly created dish
 *         schema:
 *           $ref: '#/definitions/Dish'
 */
router.post("/", (req: LoggerRequest, res: Response) => {
  const repo = getRepository(Dish);

  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Please provide a name value");
  }

  const dish = new Dish();
  dish.name = name;

  repo
    .save(dish)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
});

/**
 * @swagger
 *
 * /dish/{id}:
 *   put:
 *     description: Edit a dish
 *     tags:
 *       - Dishes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: The new name of the dish
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns the newly updated dish
 *         schema:
 *           $ref: '#/definitions/Dish'
 */
router.put("/:id", (req: LoggerRequest, res: Response) => {
  const repo = getRepository(Dish);

  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Please provide a name value");
  }

  repo
    .findOneOrFail(req.params.id)
    .then((dish) => {
      dish.name = name;
      return repo.save(dish);
    })
    .then((result) => res.json(result))
    .catch((err) => {
      if (err instanceof EntityNotFoundError) {
        return res.status(404).send("No dish was found with that id");
      } else {
        return res.status(500).send(err.message);
      }
    });
});

/**
 * @swagger
 *
 * /dish/{id}:
 *   delete:
 *     description: Delete a dish
 *     tags:
 *       - Dishes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns confirmation
 */
router.delete("/:id", (req: LoggerRequest, res: Response) => {
  const repo = getRepository(Dish);

  repo.delete(req.params.id).then((result) => {
    if (result.affected > 0) {
      return res.send("ok");
    } else {
      return res.status(404).send("No dish was found with that id");
    }
  });
});

export default router;
