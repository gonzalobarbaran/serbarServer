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
     this.resourceURL = 'https://pav2.azurewebsites.net/api/Ventas/';
   }

   get() {
    return this.httpClient.get(this.resourceURL);
  }

  getById(IdCliente: number) {
    return this.httpClient.get(this.resourceURL + IdCliente);
  }

  post(obj: Venta) {
    return this.httpClient.post(this.resourceURL, obj);
  }

  put(IdCliente: number, obj: Venta) {
    return this.httpClient.put(this.resourceURL + IdCliente, obj);
  }

  delete(IdVenta) {
    return this.httpClient.delete(this.resourceURL + IdVenta);
  }

}