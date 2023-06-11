import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { from, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product';
import { Router } from '@angular/router';



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
  constructor(private ProductsService : ProductsService, private router: Router) { }

  ngOnInit(): void {
    
  }

  onGetAllProducts()
  {
    this.ProductsService.getAllProducts().subscribe((data =>{
      this.products=data;
    }))
  }

  // Pipe, allows us to chain multiple operators together
  //Second way of doing : Same onGetAllProducts Method with error management
  // Attention all tech enthusiasts : if you are using an Interface then you will work with this syntaxe "{ }" 
  //                                  that represents an Object you cannot instanciate an interface (new) because it's not a class

  /**
   * explication : lorsque vous faite appel à la fonction getAllProducts() elle vous return une liste de produit (Product[])
   *               cependant nous avons une variable observable _products$ dont le type est AppDataState<Product[]> ce qui implique
   *               que nous seront obligé d'utilise la fonction map afin de transformer les données return par la fonction en un
   *               type plus convenable pour que "this._products$" puisse l'accepter car il a été declaré comme étant  AppDataState<Product[]>
   */
  onGetAllProductsWithErrorManagement()
  {
   this._products$ = this.ProductsService.getAllProducts().pipe(
      map((data)=>({datastate: DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, ErrorMessage : err.message}))
      
    )
  }



  onGetAvailableProduct(){
    this._products$ = this.ProductsService.getAvailableProduct().pipe(

      //nous avons une syntax d'initiateur d'object (observez bien), vous pouvez ajouter autant de propriété que vous voulez cela ne génèrera pas de problème
        // - qui suit tjr le système clé-valeur
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
   //- Warning! : DataForm variable => To indicate not one, but all Data from formulaire
    //you   choise if you want that work you have to use any as type, beacause keyword is a value of attribut name and it's not a string. 
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

  //Add A new Product
  onNewProduct()
  {
     // you need to perform a redirection here, if user click on new button
    //for this you will need  to inject a Router object into the constructor

      this.router.navigateByUrl('/Add-new-Product')

  }
  
  // Edit Product
  onEditproduct(item: Product)
  {
    //slash is not neccessary
      this.router.navigateByUrl('Edit-Product/'+ item.id)
  }

//--------------------------------------------------------------------------------------------------------------------
   // here we will centralize the data and processing in this global Component <<Products>> see note (capture imag)
      
//---------------------------------------------------------------------------------------------------------------------
  onActiveEvent($event:ActionEvent)
  {
    //console.log( $event + " Action Effectuer par Adda Issa Abdoul Razak ") 

    switch($event.type)
    {
      //case ProductActionsTypes.GET_ALL_PRODUCTS : this.onGetAllProducts(); break;
      case ProductActionsTypes.GET_ALL_PRODUCTS : this.onGetAllProductsWithErrorManagement(); break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProduct(); break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS : this.onGetSelectedProduct(); break;
      case ProductActionsTypes.SEARCH_PRODUCTS : this.onSearch($event.payload); break;
      case ProductActionsTypes.SELECT_PRODUCTS : this.onSelect($event.payload); break;
      case ProductActionsTypes.NEW_PRODUCT : this.onNewProduct(); break;
      case ProductActionsTypes.DELETE_PRODUCTS : this.onDelete($event.payload); break;
      case ProductActionsTypes.EDIT_PRODUCTS : this.onEditproduct($event.payload); break;

    }
  }

}
