import { whereTypes } from "../utils/queryParser";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * @swagger
 *
 * definitions:
 *   Ingredient:
 *     type: object
 *     required:
 *       - id
 *       - name
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       description:
 *         type: string
 */
@Entity()
export class Ingredient {
  static sortableKeys: string[] = [
    "id",
    "name",
    "description"
  ]

  static filterObject: {[key: string]: whereTypes} = {
    id: whereTypes.EQUALS,
    name: whereTypes.LIKE,
    description: whereTypes.LIKE
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;
}
