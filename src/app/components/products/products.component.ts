import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { from, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { AppDataState, DataStateEnum } from 'src/app/state/product';
import { Router } from '@angular/router';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


/**------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */   
                                                          // Observer Bien c'est Deux variable Products
  /**  
   * Remarks :  une application est constituée d'un ensemble de variables que definit le developpeurs pour contenir les données qui permettent de faire fonctionner la app,
   * ---------  sans la presence de ses données et donc de ces variables, la app ne servirait à rien ou du moins ne fonctionnera pas du tout car l'algorithme utilisé.
   *            pour faire la logique de fonctionnement de la app puise ses données dans ces variables, ces variables sont maintenues en mémoire. 
   *            et en fonction de ce que la app veut accomplir, du moins en fonction de l'interaction des utilisateurs avec la app, 
   *            le contenu de ses variables est costament modifié pour respecter
                l'algorithme qui sert à resoudre justement le but de la app. 
                
                Rappellez vous : l'essence de toute application c'est les données et toute application qui n'en utilise pas n'en est pas une!*/

  
                
  products? : Product[];
 
  // - AppDataState as type and <<$>> indicates a Observable variable
  _products$? : Observable<AppDataState<Product[]>>


/**------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


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

  //Add A new Product
  onNewProduct()
  {
     // you need to perform a redirection here if user click on new button
      //for this you will need  to inject a Router object into the constructor

      this.router.navigateByUrl('/Add-new-Product')

  }
  
  // Edit Product
  onEditproduct(item: Product)
  {
    //slash is not neccessary
      this.router.navigateByUrl('Edit-Product/'+ item.id)
  }

}
