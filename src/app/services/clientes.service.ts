import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Cliente } from '../models/cliente'

@Injectable()
export class ClientesService {
  resourceURL: string;
  constructor(private httpClient: HttpClient) {
    this.resourceURL = 'http://localhost:8080/Servar/api/Clientes/';
  }

  getTodos(){
    return this.httpClient.get(this.resourceURL + 'todos');
  }
  
  get(Consulta: string) {
    return this.httpClient.get(
      this.resourceURL + 'buscar' + '/' + Consulta
    );
  }

  getByName(Nombre: string) {
    return this.httpClient.get(
      this.resourceURL + 'buscarUno/' + Nombre
    );
  }

  post(obj) {
    return this.httpClient.get(this.resourceURL + 'agregar/' + obj.CUIT + '/' + obj.razonSocial + '/' + obj.domicilio + '/' + obj.localidad + '/' + obj.provincia + '/' + obj.condIVA + '/' + obj.telefono + '/' + obj.email);
  }

  put(obj) {
    return this.httpClient.get(this.resourceURL + 'modificar/' + obj.idCliente + '/' + + obj.CUIT + '/' + obj.razonSocial + '/' + obj.domicilio + '/' +  obj.localidad + '/' + obj.provincia + '/' + obj.condIVA + '/' + obj.telefono + '/' + obj.email);
  }

  delete(id) {
    return this.httpClient.get(this.resourceURL + 'borrar/' + id);
  }
}