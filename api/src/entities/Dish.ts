import { whereTypes } from "../utils/queryParser";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * @swagger
 *
 * definitions:
 *   Dish:
 *     type: object
 *     required:
 *       - id
 *       - name
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 */
@Entity()
export class Dish {

  static sortableKeys: string[] = [
    "id",
    "name"
  ]

  static filterObject: {[key: string]: whereTypes} = {
    id: whereTypes.EQUALS,
    name: whereTypes.LIKE
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
