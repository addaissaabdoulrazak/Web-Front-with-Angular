import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  //Get All

  getAllProducts():Observable<Product[]>{

    /*return this.http.get("http://localhost:3000/products") */

    /*the best way to proceed is to put this url in the environment file*/
    let host = environment.host

    return this.http.get<Product[]>(host + "/products")

  }

  //get Selected
  getSelectedProduct()
  {
    let host = environment.host
    return this.http.get(host +"/products?selected=true")
  }

  //get Available 
  getAvailableProduct(){
    let host=environment.host
    return this.http.get(host + "/products?Available=true")
  }
}
