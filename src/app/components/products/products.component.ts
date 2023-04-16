import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products? : Product[];

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

}
