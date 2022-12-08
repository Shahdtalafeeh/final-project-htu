import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { ProductService } from 'src/app/core/services/products/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent extends AppComponentBase implements OnInit {
  formGroup!: FormGroup;
  id: string = '';
  loading=true
  constructor(
    private formBuilder: FormBuilder,
    injector: Injector,
    private _productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((result)=>{
      if(result['id']){
        this.id=result['id']
      }
    })
    this.formGroup = this.formBuilder.group({
      productName: null,
      category: null,
      description: null,
      quantity: null,
    });

    this.getProductById()
  }
  getProductById(){
    this._productService.getById(this.id).subscribe((result:any)=>{
      this.formGroup = this.formBuilder.group({
        productName: result['productName'],
        category: result['category'],
        description: result['description'],
        quantity: result['quantity'],
    })
    this.loading=false;
  })
  }
  onUpdateClicked() {
    this._productService
      .update(this.id, {
        productName: this.formGroup.controls['productName'].value,
        category: this.formGroup.controls['category'].value,
        description: this.formGroup.controls['description'].value,
        quantity: this.formGroup.controls['quantity'].value,
      })
      .then(() => {
        this.back();
      });
  }
}
