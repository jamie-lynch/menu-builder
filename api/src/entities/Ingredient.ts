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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;
}
