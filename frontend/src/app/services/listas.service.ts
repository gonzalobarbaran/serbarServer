import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Lista } from '../models/lista'
import { identifierModuleUrl } from '@angular/compiler';

@Injectable()
export class ListaService {
  resourceURL: string;
  constructor(private httpClient: HttpClient) {
    this.resourceURL = 'http://147.182.203.128:3000/api/listas/';
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

  post(obj: Lista) {
    return this.httpClient.post(this.resourceURL, obj);
  }

  put(obj: Lista, id) {
    return this.httpClient.put(this.resourceURL + id, obj);
  }

  delete(id) {
    return this.httpClient.delete(this.resourceURL + id);
  }
}