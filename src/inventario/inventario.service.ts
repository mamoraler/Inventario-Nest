import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventario } from './entities/inventario.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class InventarioService {

  private readonly logger = new Logger('InventarioService')

  constructor(
    @InjectRepository(Inventario)
    private readonly InventarioRepository: Repository<Inventario>,

    private readonly dataSource: DataSource
    
  ) { }

  async createMatPrima(createInventarioDto: CreateInventarioDto) {

    try {
      const MatPrima = this.InventarioRepository.create(createInventarioDto)
      await this.InventarioRepository.save(MatPrima)
      return MatPrima;  
    } catch (error) {
      console.log(error)      
      this.logger.error(error)
    }
    //return 'This action adds a new inventario';
  }

  async findAllInventario() {
   
    try {
      const inventarioAll= await this.InventarioRepository.find()
      return inventarioAll;
    } catch (error) {
      
      this.logger.error(error)
    }
  }

  async findStock() {
    
    const arrayMateriaPrima = ["alambre", "caucho", "colorante"]
    try {

      const arrayStock = await Promise.all( arrayMateriaPrima.map( mp => {
          const Stock= this.InventarioRepository.sum("cantidad", {materiaPrima: mp})
          return Stock;
      })    
      )
      return {"alambre": arrayStock[0]?? 0, "caucho": arrayStock[1]?? 0 , "colorante": arrayStock[2] ?? 0 };

    } catch (error) {
     
      this.logger.error(error)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} inventario`;
  }

  async updateMatPrima(id: string, updateInventarioDto: UpdateInventarioDto) {

    const mp = await this.InventarioRepository.preload({
      id, 
      ...updateInventarioDto, 
      updatedAt: new Date()
    })

    if (!mp)
      throw new NotFoundException(`Not found record with this id ${id}`)

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      await queryRunner.manager.save(mp)

      await queryRunner.commitTransaction();

      await queryRunner.release();

      return mp;

    } catch (error) {
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      this.logger.error(error)
    }

  }

  remove(id: number) {
    return `This action removes a #${id} inventario`;
  }
}
