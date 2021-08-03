import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import { Venta } from '../../models/venta'
import { VentasService } from '../../services/ventas.service'
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  Titulo = 'Ventas';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)'
  };
  AccionABMC = 'L'; // inicialmente inicia en el listado de articulos (buscar con parametros)
  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...'
  };

  Items: Venta[] = null;
  submitted: boolean = false;

  FormBusqueda: FormGroup;
  FormRegistro: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private ventasService: VentasService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormRegistro = this.formBuilder.group({
      IdCliente: [null],
      IdVenta: [null],
      Fecha: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          )
        ]
      ],
      ClienteNombre: [null,
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      Total: [null, [Validators.required, Validators.pattern('^\\d{1,7}$')]],
    });
  }

    Agregar() {
      this.AccionABMC = 'A';
      this.FormRegistro.reset({ IdVenta: 0 });
      this.submitted = false;
      this.FormRegistro.markAsUntouched();
    }
  
    // Buscar segun los filtros, establecidos en FormRegistro
    Buscar() {
      this.ventasService.get().subscribe((res: any) => {
          this.Items = res.Items;
        });
    }
  
    // Obtengo un registro especifico según el Id
    BuscarPorId(Dto, AccionABMC) {
      window.scroll(0, 0); // ir al incio del scroll
  
      this.ventasService.getById(Dto.IdVenta).subscribe((res: any) => {
        const itemCopy =  res.Items[Dto.IdVenta - 1] ; 
  
        //formatear fecha de  ISO 8061 a string dd/MM/yyyy
        var arrFecha = itemCopy.Fecha.substr(0, 10).split('-');
        itemCopy.Fecha = arrFecha[2] + '/' + arrFecha[1] + '/' + arrFecha[0];
  
        this.FormRegistro.patchValue(itemCopy);
        this.AccionABMC = AccionABMC;
      });
    }
  
    Consultar(Dto) {
      this.BuscarPorId(Dto, 'C');
    }
  
    // Volver desde Agregar/Modificar
    Volver() {
      this.AccionABMC = 'L';
      this.Buscar();
    }
  
  

}