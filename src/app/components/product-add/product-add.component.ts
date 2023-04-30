import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
 
  ProductformGroup! : FormGroup;

  submitted : boolean = false;

  constructor(private fb : FormBuilder, private ProductsService : ProductsService) { }

  ngOnInit(): void {

  //Apply field Validation, warning if you want you can used a several validators for each attribut
    this.ProductformGroup = this.fb.group({
      name :["", Validators.required],
      price :[0, Validators.required],
      quantity :[0, Validators.required],
      selected :[true, Validators.required],
      available :[true, Validators.required]
    })
  }

  onSaveProduct()
  {
    this.submitted =true;

    if(this.ProductformGroup.invalid) return
    this.ProductsService.Save(this.ProductformGroup.value).subscribe(
      data => {
        alert("Produit " +data.name+ " ajouter avec succès")
      }
    )
  }

}
