import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {
@Output()
 event: EventEmitter<any> = new EventEmitter();
 
  constructor() { }

  ngOnInit(): void {
  }


  onGetAllProducts()
  {

  }

  
  //Second way of doing : Same onGetAllProducts Method with error management
  onGetAllProductsWithErrorManagement()
  {

  }



  onGetAvailableProduct(){

  }

  onGetSelectedProduct(){

  }

  //Search Method
   //- Warning! : DataForm variable => To indicate not one but all Data from formulaire present in a form 
    //you don't a choise if you want that work you have to use any as type, beacuse keyword is a value of attribut name and it's not a string. 
   onSearch(DataForm: any){
     

  }


  //Add A new Product
  onNewProduct()
  {


  }


}
