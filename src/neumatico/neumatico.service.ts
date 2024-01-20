import { Injectable, Logger } from '@nestjs/common';
import { CreateNeumaticoDto } from './dto/create-neumatico.dto';
import { UpdateNeumaticoDto } from './dto/update-neumatico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Neumatico } from './entities/neumatico.entity';

@Injectable()
export class NeumaticoService {

  private readonly logger = new Logger('Neumatico')

  constructor(
    @InjectRepository(Neumatico)
    private readonly InventarioRepository: Repository<Neumatico>
    
  ) { }  

  async createNeumatico(createNeumaticoDto: CreateNeumaticoDto) {

    try {
      const neumatico = this.InventarioRepository.create(createNeumaticoDto)
      await this.InventarioRepository.save(neumatico)
      return neumatico;  
    } catch (error) {
      console.log(error)      
      this.logger.error(error)
    }    
    
    //return 'This action adds a new neumatico';
  }

  async findAllneumaticos() {

    try {
      const neumaticos= await this.InventarioRepository.find()
      return neumaticos;
    } catch (error) {
      
      this.logger.error(error)
    }    
    //return `This action returns all neumatico`;
  }


  async findStock() {
    
    const arrayNeumaticos = ["Moto","Auto","Camion","tractor"]
    try {

      const arrayStock = await Promise.all( arrayNeumaticos.map( neu => {
          const Stock= this.InventarioRepository.sum("cantidad", {tipoNeumatico: neu})
          return Stock;
      })    
      )
      return {"Moto": arrayStock[0]?? 0, "Auto": arrayStock[1]?? 0 , "Camion": arrayStock[2] ?? 0 ,"tractor": arrayStock[2] ?? 0 };

    } catch (error) {
     
      this.logger.error(error)
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} neumatico`;
  }

  update(id: number, updateNeumaticoDto: UpdateNeumaticoDto) {
    return `This action updates a #${id} neumatico`;
  }

  remove(id: number) {
    return `This action removes a #${id} neumatico`;
  }
}
