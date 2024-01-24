import { Injectable, Logger, PreconditionFailedException } from '@nestjs/common';
import { CreateNeumaticoDto } from './dto/create-neumatico.dto';
import { UpdateNeumaticoDto } from './dto/update-neumatico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Neumatico } from './entities/neumatico.entity';
import { User } from 'src/user/entities/user.entity';
import { Cantidad } from './entities/cantidad.entity';
import { ValidMatPrimas } from 'src/user/interfaces/valid-materiasPrimas';
import { InventarioService } from 'src/inventario/inventario.service';

@Injectable()
export class NeumaticoService {

  private readonly logger = new Logger('Neumatico')

  constructor(
    private readonly inventarioService: InventarioService,
    @InjectRepository(Neumatico)
    private readonly NeumaticoRepository: Repository<Neumatico>,
    
    @InjectRepository(Cantidad)
    private readonly CantidadRepository: Repository<Cantidad>         
    
  ) { }  

  async createNeumatico(createNeumaticoDto: CreateNeumaticoDto,user: User) {

    try {

      //Consulto el stock de materias primas
      const {tipoNeumatico, cantidad} = createNeumaticoDto;
      const arrayStock = await this.inventarioService.findStock();

      //Consulta de cantidades necesarias
      const arrayMatPrima= await this.CantidadRepository.find({
        select: { tipoMatPrima: true, cantidad: true},
        where: { tipoNeumatico: tipoNeumatico  },
      })
      
      //Valida existencias
      const okAlambre  = arrayMatPrima.some( obj => obj.tipoMatPrima === ValidMatPrimas.ALAMBRE   && (obj.cantidad * cantidad ) <=  arrayStock.alambre   )
      const okCaucho   = arrayMatPrima.some( obj => obj.tipoMatPrima === ValidMatPrimas.CAUCHO    && (obj.cantidad * cantidad ) <=  arrayStock.caucho    )
      const okColorante= arrayMatPrima.some( obj => obj.tipoMatPrima === ValidMatPrimas.COLORANTE && (obj.cantidad * cantidad ) <=  arrayStock.colorante )

      if ( !okAlambre || !okCaucho || !okColorante )
        return(`Stock insuficiente`)

      const neumatico = this.NeumaticoRepository.create({
        ...createNeumaticoDto,
        user
      })
      await this.NeumaticoRepository.save(neumatico)
      return neumatico;  

    } catch (error) {
      console.log(error)      
      this.logger.error(error)
    }    
    
    //return 'This action adds a new neumatico';
  }

  async findAllneumaticos() {

    try {
      const neumaticos= await this.NeumaticoRepository.find()
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
          const Stock= this.NeumaticoRepository.sum("cantidad", {tipoNeumatico: neu})
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
