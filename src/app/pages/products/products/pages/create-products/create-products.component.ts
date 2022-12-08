import { Location } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { ProductService } from 'src/app/core/services/products/product.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent extends AppComponentBase implements OnInit {
  formGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder, injector: Injector,private _productService: ProductService) {
    super(injector);
  }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      productName:null,
      category:null,
      description:null,
      quantity:null,
    })
  }
  onAddClicked(){
    this._productService.create({
      productName: this.formGroup.controls['productName'].value,
      category: this.formGroup.controls['category'].value,
      description:this.formGroup.controls['description'].value,
      quantity: this.formGroup.controls['quantity'].value,
    }).then(()=>{
      this.back()
    })

  }

}
