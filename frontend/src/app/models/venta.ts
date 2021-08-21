import { Cliente } from "./cliente";
import { DetalleVenta } from "./detalle-venta";

export class Venta {
  _id: string;
  cliente: Cliente;
  fecha: string;
  condVenta: string;
  venicimiento: string;
  remito: number;
  detalles: DetalleVenta[];
  subtotal: number;
  porcIVA: number;
  porcIIBB: string;
  total: number;
}
