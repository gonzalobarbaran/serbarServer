import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import { Venta } from '../../models/venta'
import { VentasService } from '../../services/ventas.service'
import { ModalDialogService } from '../../services/modal-dialog.service';
import { DetalleVenta } from 'src/app/models/detalle-venta';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto';
import { Lista } from 'src/app/models/lista';
import { Precio } from 'src/app/models/precio';
import { DiagnosticCategory } from 'typescript';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

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
  Detalles: DetalleVenta[] = null;
  DetallesNuevos: DetalleVenta[] = [];
  porcIVA = '';
  porcIIBB = '';
  Productos: Producto[] = null;
  Listas: Lista[] = null;
  Precios: Precio[] = null;
  submitted: boolean = false;
  TempProducto: Producto = new Producto();
  Clientes: Cliente[] = null;

  FormBusqueda: FormGroup;
  FormRegistro: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private ventasService: VentasService,
    private productosService: ProductosService,
    private clientesService: ClientesService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormRegistro = this.formBuilder.group({
      _id: [null],
      cliente: [null],
      razonSocial: [null],
      CUIT:[null],
      fecha: [
        null
      ],
      condVenta: [null,
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      vencimiento: [
        null
      ],
      remito:[null],
      productos: [null],
      listas: [null],
      precio:[null],
      cantidad:[null],
      detalles: [DetalleVenta],
      subtotal: [null],
      subIVA: [null],
      subIIBB: [null],
      total: [null],
    });
  }

    Agregar() {
      this.AccionABMC = 'A';
      this.clientesService.getTodos().subscribe((res: any) => {
        this.Clientes = res;
      });
      this.FormRegistro.reset({ IdVenta: 0 });
      this.FormRegistro.controls['subIVA'].setValue('21');
      this.FormRegistro.controls['subIIBB'].setValue('3.5');
      this.submitted = false;
      this.FormRegistro.markAsUntouched();
    }
  
    // Buscar segun los filtros, establecidos en FormRegistro
    Buscar() {
      this.ventasService.getTodos().subscribe((res: any) => {
          this.Items = res;
        });
        
        
    }
  
    // Obtengo un registro especifico según el Id
    BuscarPorId(Dto, AccionABMC) {
      window.scroll(0, 0); // ir al incio del scroll
  
      this.ventasService.get(Dto._id).subscribe((res: any) => {

        this.FormRegistro.patchValue(res);
        this.FormRegistro.controls['total'].setValue(this.calcularTotal(Dto));
        this.AccionABMC = AccionABMC;
      });
    }
  
    Consultar(Dto) {
      this.BuscarPorId(Dto, 'C');
      this.FormRegistro.controls['razonSocial'].setValue(Dto.cliente.razonSocial);
      this.FormRegistro.controls['CUIT'].setValue(Dto.cliente.CUIT);
      this.FormRegistro.controls['subIVA'].setValue(this.calcIVA(Dto));
      this.FormRegistro.controls['subIIBB'].setValue(this.calcIIBB(Dto));
      this.porcIVA = Dto.porcIVA;
      this.porcIIBB = Dto.porcIIBB;
      
      this.Detalles = Dto.detalles;
    }
  
    // Volver desde Agregar/Modificar
    Volver() {
      this.AccionABMC = 'L';
      this.Buscar();
      this.DetallesNuevos = [];
    }

    detSubtotal(item){
      return item.cantidad*item.precioUnit;
    }

    calcularTotal(item){
      var subtotal = 0;

      for(let detalle of item.detalles){
        subtotal = subtotal + this.detSubtotal(detalle);
      }
      var iva = subtotal*item.porcIVA/100;
      var iibb = subtotal*item.porcIIBB/100;
      return subtotal + iva + iibb;
    }

    calcIVA(item){
      var subtotal = 0;
      for(let detalle of item.detalles){
        subtotal = subtotal + this.detSubtotal(detalle);
      }
      return subtotal*item.porcIVA/100;
    }

    calcIIBB(item){
      var subtotal = 0;
      for(let detalle of item.detalles){
        subtotal = subtotal + this.detSubtotal(detalle);
      }
      return subtotal*item.porcIIBB/100;
    }

    AgregarDetalle(){
      var label =  (<HTMLInputElement>document.getElementById("lblProducto"));
      label.style.display = "block";
      var select =  (<HTMLInputElement>document.getElementById("selectProducto"));
      select.style.display = "block";
      this.productosService.getTodos().subscribe((res: any) => {
        this.Productos = res
      });
    }

    BuscarListas(){
      var label =  (<HTMLInputElement>document.getElementById("lblLista"));
      label.style.display = "block";
      var select =  (<HTMLInputElement>document.getElementById("selectLista"));
      select.style.display = "block";
      var selectProducto = (<HTMLInputElement>document.getElementById("selectProducto")).value;
      this.productosService.get(selectProducto.substring(3)).subscribe((res: any) =>{
        this.Precios = res.precios;
      })
    }
  
    MostrarPrecio(){
      var label =  (<HTMLInputElement>document.getElementById("lblPrecio"));
      label.style.display = "block";
      var input =  (<HTMLInputElement>document.getElementById("inputPrecio"));
      input.style.display = "block";      
      input.value = ((<HTMLInputElement>document.getElementById("selectLista")).value).substring(3);
      var label =  (<HTMLInputElement>document.getElementById("lblCantidad"));
      label.style.display = "block";
      var input =  (<HTMLInputElement>document.getElementById("inputCantidad"));
      input.style.display = "block";   
      var boton =  (document.getElementById("btnDetalle"));
      boton.style.display = "block"; 
    }

    AgregarATabla(){
      var newRow = (<HTMLTableElement>document.getElementById('tablaDetalles')).insertRow();
      var ditail = new DetalleVenta();
      
      var newCell = newRow.insertCell();
      var selectProducto = (<HTMLInputElement>document.getElementById("selectProducto")).value;
      var cantidad = (<HTMLInputElement>document.getElementById("inputCantidad")).value;
      ditail.cantidad = parseInt(cantidad, 10);
      var precio =  (<HTMLInputElement>document.getElementById("inputPrecio")).value;
      ditail.precioUnit = parseInt(precio, 10);
      
      this.productosService.get(selectProducto.substring(3)).subscribe((res: any) =>{

        ditail.producto = res;
        var prod = ditail.producto.descripcion.toUpperCase();
        newCell.innerHTML="<tr><td class='text-uppercase'>"+ prod +"</td></tr>";
        newCell = newRow.insertCell();
        newCell.innerHTML="<tr><td>"+ ditail.cantidad +"</td></tr>";
  
        newCell = newRow.insertCell();
        newCell.innerHTML="<tr><td>"+ ditail.precioUnit +"</td></tr>";
  
        newCell = newRow.insertCell();
        newCell.innerHTML="<tr><td>"+ this.detSubtotal(ditail) +"</td></tr>";
        this.DetallesNuevos.push(ditail);
        this.FormRegistro.controls['total'].setValue(this.calcularTotalParcial());
      })



    }

    calcularTotalParcial(){
      var subtotal = 0;

      for(let detalle of this.DetallesNuevos){
        subtotal = subtotal + this.detSubtotal(detalle);
      }
      console.log(subtotal);
      var porcIVA = parseInt(this.FormRegistro.value.subIVA, 10);
      console.log(porcIVA);
      var porcIIBB = parseFloat(this.FormRegistro.value.subIIBB);
      console.log(porcIIBB);
      var iva = subtotal*porcIVA/100;
      var iibb = subtotal*porcIIBB/100;
      return subtotal + iva + iibb;
    }

    AgregarNuevaVenta(){
      var venta = new Venta();
      var cliente = new Cliente();
      venta.cliente = cliente;
      venta.detalles = this.DetallesNuevos;
      venta.cliente._id = (<HTMLInputElement>document.getElementById("selectCliente")).value.substring(3);
      var subtotal = 0;
      for(let detalle of venta.detalles){
        subtotal = subtotal + this.detSubtotal(detalle);
      }
      venta.subtotal = subtotal;
      venta.porcIVA = this.FormRegistro.value.subIVA;
      venta.porcIIBB = this.FormRegistro.value.subIIBB;
      venta.fecha = this.FormRegistro.value.fecha;
      venta.condVenta = this.FormRegistro.value.condVenta;
      venta.venicimiento = this.FormRegistro.value.vencimiento;
      venta.remito = this.FormRegistro.value.remito;
      this.ventasService.post(venta).subscribe((res: any) => {
        this.DetallesNuevos =[];
        this.Volver();
        this.modalDialogService.Alert('Agregado correctamente');
        this.Buscar();
      });
    }

}