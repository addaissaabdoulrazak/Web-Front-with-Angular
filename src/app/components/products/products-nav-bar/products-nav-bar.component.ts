import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

@Output()
 NavbarEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  // onGetAllProducts()
  // {
  //   this.NavbarEventEmitter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS})
  // }

  
  //Second way of doing : Same onGetAllProducts Method, but with error management
  onGetAllProductsWithErrorManagement()
  {
    this.NavbarEventEmitter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS})
  }



  onGetAvailableProduct(){
       this.NavbarEventEmitter.emit({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS
      })
  }

  onGetSelectedProduct(){
    this.NavbarEventEmitter.emit({type: ProductActionsTypes.GET_SELECTED_PRODUCTS
    })
  }

  //Search Method
   //- Warning! : DataForm variable => To indicate not one, but all Data from formulaire present in a form 
  //you don't a choise if you want that work you have to use "any" as type, beacuse keyword is a value of attribut name and it's not a string.
  // use descriptive variable, here, i already know through this variable that methodes (onsearch) is used at level of formular
  //generally this is represented through the use << the Html tag(form) >>
   onSearch(DataForm: any){
      this.NavbarEventEmitter.emit({type: ProductActionsTypes.SEARCH_PRODUCTS, payload : DataForm})
  }


  //Add A new Product
  onNewProduct()
  {
    this.NavbarEventEmitter.emit({type:ProductActionsTypes.NEW_PRODUCT})
  }


}
