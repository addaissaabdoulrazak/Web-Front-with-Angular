import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product';

type NewType = Product;

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

   @Input()
   product? : Product

   @Output()
   productItemOutputEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();




  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: any)
  {
    this.productItemOutputEventEmitter.emit({ type :ProductActionsTypes.SELECT_PRODUCTS, payload : product})
  }
  onEditproduct(product : any)
  {
    this.productItemOutputEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCTS, payload : product})
  }

  onDelete(product: any){
     this.productItemOutputEventEmitter.emit({type : ProductActionsTypes.DELETE_PRODUCTS, payload : product})
  }




}
