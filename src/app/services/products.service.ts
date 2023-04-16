import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  //Get All

  getAllProducs(){

    //return this.http.get("http://localhost:3000/products")

//the best way to proceed is to put this url in the environment file
    return this.http.get("http://localhost:3000/products")
  }
}