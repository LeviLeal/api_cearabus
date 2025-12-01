import { PrimaryColumn, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reclamacao {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: "varchar", length: 255 })
    mensagem: string
    @Column({ type: "varchar", length: 255 })
    telefone: string
}