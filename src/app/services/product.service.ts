import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, delay, shareReplay, tap, map } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://retoolapi.dev/U1A9pK/products/'

  products$: Observable<Product[]>

  constructor(private http: HttpClient) {
    this.initProducts()
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }

  insertProduct(newProduct: Product): Observable<Product> {
    newProduct.modifiedDate = new Date();
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  getProductById(id: number) {
    return this
              .products$
              .pipe(
                map(list => list.find(product => product.id == id))
              )
  }

  initProducts() {

    let url:string = this.baseUrl + '?_sort=modifiedDate&_order=desc';

    this.products$ = this
                        .http
                        .get<Product[]>(url)
                        .pipe(
                          tap(console.table),
                          delay(1500), // Just for the "loading data" demo!!!
                          shareReplay()
                        )
  }

  resetList() {
    this.initProducts();
  }

}