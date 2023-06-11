import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/models/product';
import { ActionEvent, AppDataState, DataStateEnum } from 'src/app/state/product';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //-creation of DataStateEnum object for use it to componant level .
  readonly DataStateEnum = DataStateEnum;

  //<<Directve>> : child componant(products-list) emit even towards(vers) parent Componant (Products)
  @Output()
  childItemOutputEvenEmitter : EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  //<<Directive>> :child component pending(waitting) data within parent componant
  @Input()
  _childItemIput$?: Observable<AppDataState<Product[]>>

  constructor() { }

  ngOnInit(): void {
  }


  // nous aurons une remonté en chaine des different evenement, Product-Item-Event envoi un evenement a Product-list-Event
  //  qui au lieu d'effectuer un traitement va simplement faire remonter l'evenement vers le  composant parent Global
  //  car c'est a ce niveau que les données et traitement sont centraliser

  onActiveEvent($event: ActionEvent)
  {

    this.childItemOutputEvenEmitter.emit($event)
  }

}
