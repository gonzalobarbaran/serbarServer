import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Producto } from "../models/producto"


@Injectable()
export class ProductosService {

  resourceURL: string;
  constructor(private httpClient: HttpClient) { 
    this.resourceURL = 'https://pymesbackend.azurewebsites.net/api/productos/';
  }

  get() {
    return this.httpClient.get(this.resourceURL);
  }

  getById(ProductoID: number) {
    return this.httpClient.get(this.resourceURL + ProductoID);
  }

  post(obj: Producto) {
    return this.httpClient.post(this.resourceURL, obj);
  }

  put(ProductoID: number, obj: Producto) {
    return this.httpClient.put(this.resourceURL + ProductoID, obj);
  }

  delete(ProductoID) {
    return this.httpClient.delete(this.resourceURL + ProductoID);
  }

}