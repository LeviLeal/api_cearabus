import { PrimaryColumn, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Curso {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: "varchar", length: 255 })
    nome: string
}