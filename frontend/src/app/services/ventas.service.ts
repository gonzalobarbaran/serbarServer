import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { of } from 'rxjs';
import { Venta } from "../models/venta";

@Injectable()
export class VentasService {
  resourceURL: string;
  constructor(private httpClient: HttpClient) {
     this.resourceURL = 'http://localhost:3000/api/ventas/';
   }

   getTodos() {
    return this.httpClient.get(this.resourceURL);
  }

  get(IdCliente: string) {
    return this.httpClient.get(this.resourceURL + IdCliente);
  }

  post(obj: Venta) {
    return this.httpClient.post(this.resourceURL, obj);
  }

  put(IdCliente: string, obj: Venta) {
    return this.httpClient.put(this.resourceURL + IdCliente, obj);
  }

  delete(IdVenta) {
    return this.httpClient.delete(this.resourceURL + IdVenta);
  }

}