import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  addProduct(data: any): Observable<any> {
    return this.http.post(`${Globals.API_ENDPOINT}/product/add`, data);
  }
  removeProduct(id: number): Observable<any> {
    return this.http.post(`${Globals.API_ENDPOINT}/product/remove/${id}`, null);
  }
  editProduct(id: number, data: any): Observable<any> {
    return this.http.post(`${Globals.API_ENDPOINT}/product/edit/${id}`, data);
  }
  getProductsList() {
    return this.http.get(`${Globals.API_ENDPOINT}/product/list`);
  }
}
