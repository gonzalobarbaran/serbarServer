import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Producto } from '../../models/producto';
import { ProductosService } from '../../services/productos.service';
import { Categoria } from '../../models/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { ModalDialogService } from '../../services/modal-dialog.service';
import { Precio } from 'src/app/models/precio';
import { Lista } from 'src/app/models/lista';
import { ListaService } from 'src/app/services/listas.service';

@Component({
  selector: 'app-listas-de-precio',
  templateUrl: './listas-de-precios.component.html',
  styleUrls: ['./listas-de-precios.component.css']
})
export class ListasDePreciosComponent implements OnInit {
  Titulo = 'Listas de Precios';
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

  Listas: Lista[] = null;
  Items: Producto[] = null;
  Cats: Categoria[] = null;
  Precios: Precio[] =null;
  submitted: boolean = false;
  listaSelec: string;
  idListaSelec: string;

  FormBusqueda: FormGroup;
  FormRegistro: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private listaService: ListaService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormBusqueda = this.formBuilder.group({
      lista_id: [Lista],
      nuevaLista: [null],
    });
    this.FormRegistro = this.formBuilder.group({
      _id: [null],
      descripcion: [
        null],
      
      codigo: [
        null,
      ],


      categoria_id:[
        null
      ],
      nuevaCat: [null],
      stock: [null],
      precios: [Precio],
      precio: [null],

      
    });
    this.BuscarListas();
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
    var precio = document.getElementById("precioTabla");
    var boton = document.getElementById('btnAgregarLista');
    boton.style.display = "block";
    
  }

  // Obtengo un registro especifico según el Id
  BuscarPorId(Dto, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll

    this.productosService.get(Dto._id).subscribe((res: any) => {
      const itemCopy = { ...res }; 

      this.FormRegistro.patchValue(itemCopy);
      this.FormRegistro.controls['categoria_id'].setValue(itemCopy.categoria_id.nombre);
      this.FormRegistro.controls['precio'].setValue(this.detPrecio(itemCopy));
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
    const itemCopy = { ...this.FormRegistro.value };
    itemCopy.categoria_id = this.FormRegistro.value.categoria_id;
    var nuevaLista = new Lista();
    var nuevoPrecio = new Precio();

    nuevaLista.nombre = this.listaSelec.substring(3);
    for (let item of this.Listas){
      if(nuevaLista.nombre == item.nombre){
        nuevaLista._id = item._id;
      }
    }
    nuevoPrecio.lista_id = nuevaLista;
    nuevoPrecio.precio = this.FormRegistro.value.precio;
    this.productosService.get(this.FormRegistro.value.descripcion).subscribe((res: any) =>{
      var producto = {...res}; 
      console.log(producto);
      if (this.AccionABMC == 'M'){  
        producto.precios = producto.precios.filter(item => item.lista_id.nombre != this.listaSelec.substring(3));
      }
      if(producto.precios == null){
        producto.precios = [];
      }
      producto.precios.push(nuevoPrecio);
      console.log(producto.precios);
      this.productosService
      .put(producto)
      .subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Agregado correctamente');
        this.Buscar();
        //this.modalDialogService.DesbloquearPantalla();
      });
    });
    
    

      // modificar put
      //this.modalDialogService.BloquearPantalla();

    
  }

  // representa la baja logica
  Eliminar(Dto) {
    Dto.precios = Dto.precios.filter(item => item.lista_id.nombre != this.listaSelec.substring(3));
    this.modalDialogService.Confirm(
      'Esta seguro de eliminar este registro?',
      undefined,
      'SI',
      'NO',
      () =>
        this.productosService
          .put(Dto)
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

  BuscarListas() {
    window.scroll(0, 0); // ir al incio del scroll

    this.listaService.getTodos().subscribe((res: any) => {
      this.Listas = res;
    });
  }

  AgregarLista(){
    var element = document.getElementById('nuevaLista');
    element.style.display = "block";
    var boton = document.getElementById('btnConfLista');
    boton.style.display = "block";
  }

  ConfirmarLista(){
    var lista = new Lista();
    lista.nombre = this.FormBusqueda.value.nuevaLista;
    this.listaService.post(lista).subscribe((res: any) =>{
      this.FormBusqueda.reset();
      var element = document.getElementById('nuevaLista');
      element.style.display = "none";
      var boton = document.getElementById('btnConfLista');
      boton.style.display = "none";
      var boton2 = document.getElementById('btnAgregarLista')
      boton2.style.display = "none";
      this.BuscarListas();
      this.modalDialogService.Alert('Agregado correctamente');
    });
  }

  detPrecio(item){
    for(let precio of item.precios){
      var lista = (<HTMLInputElement>document.getElementById("lista_id")).value;
      if (precio.lista_id.nombre == lista.substring(3)){
        return precio.precio;
        }
    };
  }

  detProducto(item){
    var lista = (<HTMLInputElement>document.getElementById("lista_id")).value;
    this.Precios = item.precios
    for(let precio of this.Precios){
      if (precio.lista_id.nombre == lista.substring(3)){
        return true;
      }
    }
    return false;
  }

  ActLista(){
    this.listaSelec = (<HTMLInputElement> document.getElementById('lista_id')).value;
    console.log(this.listaSelec);
  }
  
}