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
    
    //-->let host = environment.host//
    //-->let host = environment.unreachableHost//
         //Simulation of two possible scenarios with a probability test
             //*you can change the probability 0.2 to 0.8 if you wan to test it
    let host =Math.random()>0.2?environment.host:environment.unreachableHost;

    return this.http.get<Product[]>(host + "/products")

  }

  //get Selected
  getSelectedProduct():Observable<Product[]>
  {
    let host = environment.host
    return this.http.get<Product[]>(host +"/products?selected=true")
  }

  //get Available 
  getAvailableProduct(): Observable<Product[]>{
    let host=environment.host
    return this.http.get<Product[]>(host + "/products?available=true")
  }
}
