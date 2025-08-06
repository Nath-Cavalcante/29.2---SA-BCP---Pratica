import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";


@Entity({name: "tb_produto"})
export class Produto {

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    descricao: string

    @OneToMany(() => Categoria, (categoria) => categoria.Produto,{
        onDelete: "CASCADE"})
    Categoria: Categoria[]
    }
    