import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity("Cliente")
@Unique(["email"])
export class Cliente {

    @PrimaryGeneratedColumn({ type: "int" })
    idCliente!: number;

    @Column({ type: "varchar", length: 45, nullable: false })
    nome!: string;

    @Column({ type: "date", nullable: false })
    dataNasc!: Date;

    @Column({ type: "varchar", length: 45, nullable: false, unique: true })
    email!: string;

    constructor(nome: string, dataNasc: Date, email: string) {
        this.nome = nome;
        this.dataNasc = dataNasc;
        this.email = email;
    }
}
