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


  //search Products
  searchProducts(keyword : string): Observable<Product[]>{
    let host = environment.host;

    //Warning! name_like is required for search
    return this.http.get<Product[]>(host + "/products?name_like="+keyword)
  }


  //Selected Product
  select(product : Product):Observable<Product>{   
    let host = environment.host; 

        // for the put methode i will use 
          //-host représente l'URL du serveur où vous souhaitez envoyer votre requête HTTP.      
          //-product.id représente l'identifiant unique du produit que vous souhaitez mettre à jour sur le serveur.
          //-product est l'objet que vous souhaitez envoyer dans la requête et qui contient les modification. Il s'agit probablement d'un objet de type Product.
        //Warning! : I don't have a web Api(Controlleurs Asp.net for Exampl) here, i only have a DataBase whose purpose is to store the data, so i use a simple DataBase
          product.selected= !product.selected
    //
    return this.http.put<Product>(host+"/products/"+product.id, product)
  }


  //HttpDelete(Product->Id)

  Delete(product : Product): Observable<void>{
      let host = environment.host;
    return this.http.delete<void>(host + "/products/"+product.id)

  }

  // [HttpPost]
  // Save(product : Product) : Observable<Product>
  // {
  //   let host =environment.host;

  //   return this.http.post<Product>(host + "/products/" +product)
  // }

}
