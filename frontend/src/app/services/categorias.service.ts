import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Categoria } from '../models/categoria'
import { identifierModuleUrl } from '@angular/compiler';

@Injectable()
export class CategoriasService {
  resourceURL: string;
  constructor(private httpClient: HttpClient) {
    this.resourceURL = 'http://localhost:3000/api/categorias/';
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

  post(obj: Categoria) {
    return this.httpClient.post(this.resourceURL, obj);
  }

  put(obj: Categoria) {
    return this.httpClient.put(this.resourceURL + obj._id, obj);
  }

  delete(id) {
    return this.httpClient.delete(this.resourceURL + id);
  }
}