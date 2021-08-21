import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Producto } from '../../models/producto';
import { ProductosService } from '../../services/productos.service';
import { Categoria } from '../../models/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { ModalDialogService } from '../../services/modal-dialog.service';
import { Precio } from 'src/app/models/precio';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  Titulo = 'Productos';
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

  Items: Producto[] = null;
  Cats: Categoria[] = null;
  submitted: boolean = false;

  FormBusqueda: FormGroup;
  FormRegistro: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormRegistro = this.formBuilder.group({
      _id: [null],
      descripcion: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
      ],
      
      codigo: [
        null,
        [
          Validators.required, Validators.minLength(5), Validators.maxLength(50)
        ]
      ],


      categoria_id:[
        null
      ],
      nuevaCat: [null],
      stock: [null, [Validators.required, Validators.maxLength(7)]],
      precios: [Precio],

      
    });
  }

  Agregar() {
    this.AccionABMC = 'A';
    this.FormRegistro.reset();
    this.categoriasService.getTodos().subscribe((res:any) => {
      this.Cats = res;
    })
    this.submitted = false;
    this.FormRegistro.markAsUntouched();
  }

  // Buscar segun los filtros, establecidos en FormRegistro
  Buscar() {
    this.productosService.getTodos().subscribe((res: any) => {
        this.Items = res;
      });
  }

  // Obtengo un registro especifico según el Id
  BuscarPorId(Dto, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll

    this.productosService.get(Dto._id).subscribe((res: any) => {
      const itemCopy = { ...res }; 

      this.FormRegistro.patchValue(itemCopy);
      this.FormRegistro.value.categoria_id = itemCopy.categoria_id.nombre;
      this.AccionABMC = AccionABMC;
    });
  }

  Consultar(Dto) {
    this.categoriasService.getTodos().subscribe((res:any) => {
      this.Cats = res;
    })
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
    itemCopy.categoria_id = this.FormRegistro.value.categoria_id;

    // agregar post
    if (this.AccionABMC == 'A') {
      //this.modalDialogService.BloquearPantalla();
      this.productosService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
        //this.modalDialogService.DesbloquearPantalla();
      });
    } else {
      // modificar put
      //this.modalDialogService.BloquearPantalla();
      this.productosService
        .put(itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          this.modalDialogService.Alert('Registro modificado correctamente.');
          this.Buscar();
          //this.modalDialogService.DesbloquearPantalla();
        });
    }
  }

  // representa la baja logica
  Eliminar(Dto) {


    this.modalDialogService.Confirm(
      'Esta seguro de eliminar este registro?',
      undefined,
      'SI',
      'NO',
      () =>
        this.productosService
          .delete(Dto._id)
          .subscribe((res: any) => this.Buscar())
    );
  }

  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionABMC = 'L';
    this.Buscar();
  }

  ImprimirListado() {
    this.modalDialogService.Alert('Sin desarrollar...');
  }

  AgregarCat(){
    var element = document.getElementById('nuevaCat');
    element.style.display = "block";
    var boton = document.getElementById('btnConf');
    boton.style.display = "block";
  }

  ConfirmarCat(){
    var cat = new Categoria();
    cat.nombre = this.FormRegistro.value.nuevaCat;
    this.categoriasService.post(cat).subscribe((res: any) =>{
      this.Volver();
      this.modalDialogService.Alert('Agregado correctamente');
    });
  }
}