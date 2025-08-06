import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private CategoriaRepository: Repository<Categoria>
    ) { }

    async findAll(): Promise<Categoria[]> {
        return await this.CategoriaRepository.find({
            relations:{
                Produto: true
            }
        });
    }

    async findById(id: number): Promise<Categoria> {
        const categoria = await this.CategoriaRepository.findOne({
            where: {
                id
            },
            relations:{
                Produto:true
            }
        });

        if (!categoria)
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
        return categoria;
    }

    async findAllByGenero(genero: string): Promise<Categoria[]>{
        return await this.CategoriaRepository.find({
            where:{
                genero: ILike(`%${genero}%`)
            },
            relations:{
                Produto: true
            }
        })
    }

    async create(categoria: Categoria): Promise<Categoria>{
        return await this.CategoriaRepository.save(categoria);
    }

    async update(categoria: Categoria): Promise<Categoria>{
        await this.findById(categoria.id)
        return await this.CategoriaRepository.save(categoria);
    }

    async delete(id:number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.CategoriaRepository.delete(id)
    }


}