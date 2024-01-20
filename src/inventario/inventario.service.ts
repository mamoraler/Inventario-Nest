import { Injectable, Logger } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventario } from './entities/inventario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventarioService {

  private readonly logger = new Logger('InventarioService')

  constructor(
    @InjectRepository(Inventario)
    private readonly InventarioRepository: Repository<Inventario>
    
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

  update(id: number, updateInventarioDto: UpdateInventarioDto) {
    return `This action updates a #${id} inventario`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventario`;
  }
}
