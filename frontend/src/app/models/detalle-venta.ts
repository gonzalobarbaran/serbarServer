import { Producto } from "./producto";

export class DetalleVenta{
    _id: string;
    producto: Producto;
    cantidad: number;
    precioUnit: number;
}