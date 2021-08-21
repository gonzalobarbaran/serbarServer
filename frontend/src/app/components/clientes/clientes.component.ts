import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Cliente } from '../../models/cliente';
import { ClientesService } from '../../services/clientes.service';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  Titulo = 'Clientes';
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

  Items: Cliente[] = null;
  RegistrosTotal: number;
  Pagina = 1; // inicia pagina 1
  submitted: boolean = false;

  FormBusqueda: FormGroup;
  FormRegistro: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormBusqueda = this.formBuilder.group({
      RazonSocial: [null]
    });
    
    this.FormRegistro = this.formBuilder.group({
      _id: [null],
      CUIT: [null, [Validators.required, Validators.pattern('^\\d{1,10}$')]],
      razonSocial: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(55)]
      ],
      domicilio: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(55)]
      ],
      localidad: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(55)]
      ],
      provincia: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(55)]
      ],
      condIVA: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(55)]
      ],
      telefono: [
        null,
        [Validators.required, Validators.pattern('^\\d{1,12}$')]
      ],
      email: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(55)]
      ]
    });
  }

  Agregar() {
    this.AccionABMC = 'A';
    this.FormRegistro.reset({ Activo: true, IdCliente: 0 });
    this.submitted = false;
    this.FormRegistro.markAsUntouched();
  }

  // Buscar segun los filtros, establecidos en FormRegistro
  Buscar() {
    //this.modalDialogService.BloquearPantalla();
    if (this.FormBusqueda.value.RazonSocial == "" || this.FormBusqueda.value.RazonSocial == null){
    this.clientesService
      .getTodos()
      .subscribe((res: any) => {
        this.Items = res;
      });}
    else{
      this.clientesService.get(
        this.FormBusqueda.value.RazonSocial
      )
      .subscribe((res:any) => {
        this.Items = res;
      })
    }
  }

  // Obtengo un registro especifico según el Id
  BuscarPorId(Dto, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll

    this.clientesService.get(Dto._id).subscribe((res: any) => {
      const itemCopy = { ...res }; // hacemos copia para no modificar el array original del mock

      this.FormRegistro.patchValue(itemCopy);
      this.AccionABMC = AccionABMC;
    });
  }

  Consultar(Dto) {
    this.BuscarPorId(Dto, 'C');
  }

  // comienza la modificacion, luego la confirma con el metodo Grabar
  Modificar(Dto) {
    this.submitted = false;
    this.FormRegistro.markAsUntouched();
    this.BuscarPorId(Dto, 'M');
  }

  // grabar tanto altas como modificaciones
  Grabar() {
    this.submitted = true;
    if (this.FormRegistro.invalid) {
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormRegistro.value };

    // agregar post
    if (this.AccionABMC == 'A') {
      //this.modalDialogService.BloquearPantalla();
      this.clientesService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
        //this.modalDialogService.DesbloquearPantalla();
      });
    } else {
      // modificar put
      //this.modalDialogService.BloquearPantalla();
      this.clientesService.put(itemCopy, itemCopy._id).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro modificado correctamente.');
        this.Buscar();
        //this.modalDialogService.DesbloquearPantalla();
      });
    }
  }

  // representa la baja logica
  ActivarDesactivar(Dto) {
    this.modalDialogService.Confirm(
      'Esta seguro de borrar este registro?',
      undefined,
      'SI',
      'NO',
      () =>
        this.clientesService
          .delete(Dto._id)
          .subscribe((res: any) => this.Buscar())
    );
  }

  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionABMC = 'L';
  }

  ImprimirListado() {
    this.modalDialogService.Alert('Sin desarrollar...');
  }
}
