import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Producto } from '../models/producto'
import { identifierModuleUrl } from '@angular/compiler';

@Injectable()
export class ProductosService {
  resourceURL: string;
  constructor(private httpClient: HttpClient) {
    this.resourceURL = 'http://147.182.203.128:3000/api/productos/';
  }

  getTodos(){
    return this.httpClient.get(this.resourceURL);
  }
  
  get(id) {
    return this.httpClient.get(
      this.resourceURL + id
    );
  }

  getByName(Nombre: string) {
    return this.httpClient.get(
      this.resourceURL + 'buscarUno/' + Nombre
    );
  }

  post(obj: Producto) {
    return this.httpClient.post(this.resourceURL, obj);
  }

  put(obj: Producto) {
    return this.httpClient.put(this.resourceURL + obj._id, obj);
  }

  delete(id) {
    return this.httpClient.delete(this.resourceURL + id);
  }
}