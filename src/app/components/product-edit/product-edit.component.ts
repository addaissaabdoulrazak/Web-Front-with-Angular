import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
 
  //snapshot
  productId! : number

  //Validation Variable
  submitted : boolean = false
  

  //for Edit you have to use formGroup object it is an Obligation for display Edition form
  _ProductformGroup!: FormGroup


  constructor(private activatedRoute : ActivatedRoute, private productsService : ProductsService, private  fb : FormBuilder) {
    
    //inside constructor (get Courante Id)
    this.productId = this.activatedRoute.snapshot.params.id;
   }

  ngOnInit(): void {
  //console.log(this.productId)
    
  this.productsService.getProductById(this.productId).subscribe(
   data=>{
    
              this._ProductformGroup=this.fb.group({
          //adding a Id require Validation because it's a updated method
              id :[data.id, Validators.required],
              name :[data.name, Validators.required],
              price :[data.price, Validators.required],
              quantity :[data.quantity, Validators.required],
              selected :[data.selected, Validators.required],
              available :[data.available, Validators.required]
              })
          })
  }

    onUpdate()
    {
        this.productsService.Update(this._ProductformGroup.value).subscribe(
          data =>{
            return alert("product " +data.name+ " has been Updated")
          }
        )
    }
   
  }

