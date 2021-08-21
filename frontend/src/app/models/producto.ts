import { Categoria } from "./categoria";
import { Precio } from "./precio";

export class Producto {
  _id: string;
  codigo: string;
  descripcion:string;
  categoria_id: Categoria;
  stock: number;
  precios: Precio[];
}