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

  //-creation of DataStateEnum object
  readonly DataStateEnum = DataStateEnum;

   //-Injection of my Service Classe
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
      map((data)=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, ErrorMessage : err.message}))
      
    )
  }



  onGetAvailableProduct(){
    this._products$ = this.ProductsService.getAvailableProduct().pipe(

      //nous avons une syntax d'initiateur d'object (observez bien), vous pouvez ajouter autant de propriété que vous voulez cela ne génèrera pas de problème
        // - qui suit tjr le syntème clé-valeur
      map(data =>({dataState: DataStateEnum.LOADED, data:data, })),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err =>of({dataState:DataStateEnum.ERROR, ErrorMessage : err.message}))
    )
  }

  onGetSelectedProduct(){
   this._products$ =this.ProductsService.getSelectedProduct().pipe(
    map(data=>({dataState :DataStateEnum.LOADED, data:data})),
    startWith({dataState : DataStateEnum.LOADING}),
    catchError(err => of({dataState : DataStateEnum.ERROR, ErrorMessage : err.message}))

   )
  }

  //Search Method
   //- Warning! : DataForm variable => To indicate not one but all Data from formulaire present in a form 
    //you don't a choise if you want that work you have to use any as type, beacuse keyword is a value of attribut name and it's not a string. 
   onSearch(DataForm: any){
     
    // -first Test
     // -if you want that work you need to use ngModel and name html attribut in input field
          //console.log(DataForm.keyword)

        this._products$  =this.ProductsService.searchProducts(DataForm.keyword).pipe(
        map(data => ({ dataState :DataStateEnum.LOADED, data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err => of({dataState:DataStateEnum.ERROR, ErrorMessage: err.message}))
        
      );
  }


  //Select btn
  onSelect(p:Product)
  {
     this.ProductsService.select(p).subscribe((data) =>{
      console.log("Start")
         p.selected = data.selected;
     })
  }

  onDelete(p: Product)
  {
   this.ProductsService.Delete(p).subscribe((data) =>{
     
     //After deletion we  will load the data
       this.onGetAllProductsWithErrorManagement();

   })
  }


}
