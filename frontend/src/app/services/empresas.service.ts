import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { of } from 'rxjs';
import { Empresas } from "../models/empresas";

@Injectable()
export class EmpresasService {
  resourceURL: string;
  constructor(private httpClient: HttpClient) { 
    this.resourceURL = 'https://pav2.azurewebsites.net/api/empresas';
  }

  get() {
    return this.httpClient.get(this.resourceURL);
  }

  getById(IdEmpresa: number) {
    return this.httpClient.get(this.resourceURL + IdEmpresa);
  }

  post(obj: Empresas) {
    return this.httpClient.post(this.resourceURL, obj);
  }

  put(IdEmpresa: number, obj: Empresas) {
    return this.httpClient.put(this.resourceURL + IdEmpresa, obj);
  }

  delete(IdEmpresa) {
    return this.httpClient.delete(this.resourceURL + IdEmpresa);
  }

}