import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  addProduct(data: any): Observable<any> { 
    return this.http.post(`${Globals.API_ENDPOINT}/product/add`, data)
  }
}
