import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Cliente } from '../models/cliente'
import { identifierModuleUrl } from '@angular/compiler';

@Injectable()
export class ClientesService {
  resourceURL: string;
  constructor(private httpClient: HttpClient) {
    this.resourceURL = 'http://localhost:3000/api/clientes/';
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

  post(obj: Cliente) {
    return this.httpClient.post(this.resourceURL, obj);
  }

  put(obj: Cliente, id) {
    return this.httpClient.put(this.resourceURL + id, obj);
  }

  delete(id) {
    return this.httpClient.delete(this.resourceURL + id);
  }
}