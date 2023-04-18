import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { from, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { AppDataState, DataStateEnum } from 'src/app/state/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products? : Product[];
 
  // - AppDataState as type and $ indicates a Observable variable
  _products$? : Observable<AppDataState<Product[]>>

   //Injection of my Service Classe
  constructor(private ProductsService : ProductsService) { }

  ngOnInit(): void {
    
  }

  onGetAllProducts()
  {
    this.ProductsService.getAllProducts().subscribe((data =>{
      this.products=data;
    }))
  }

  
  //Second way of doing : Same onGetAllProducts Method with error management

  onGetAllProductsWithErrorManagement()
  {
   this._products$ = this.ProductsService.getAllProducts().pipe(
      map((data)=>({dataState: DataStateEnum.LAODED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, ErrorMessage : err.message}))
      
    )
  }
}
