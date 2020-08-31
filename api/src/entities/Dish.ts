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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
