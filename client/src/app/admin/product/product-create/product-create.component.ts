import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { timer } from 'rxjs';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})


export class ProductCreateComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  form: FormGroup;
  currentProductId: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      stock: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      fileSource: ['', Validators.required]
    })
    this.checkEditMode();
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const productFormData = new FormData();
    productFormData.append('name', this.form.get('name').value);
    productFormData.append('price', this.form.get('price').value);
    productFormData.append('category', this.form.get('category').value);
    productFormData.append('stock', this.form.get('stock').value);
    productFormData.append('description', this.form.get('description').value);
    productFormData.append('image', this.form.get('fileSource').value);
    if (this.editMode) {
      this.updateProduct(productFormData);
    } else {
      this.addProduct(productFormData);
    }
  }


  private updateProduct(productFormData: FormData) {
    this.productService
      .updateProduct(productFormData, this.currentProductId)
      .subscribe(() => {
        this.isSubmitted = false;
        this.form.reset();
        timer(500)
          .toPromise()
          .then(() => {
            this.router.navigate(['/product-list']);
          })
      })
  }


  private addProduct(product: FormData) {
    this.productService.addProduct(product).subscribe(() => {
      this.isSubmitted = false;
      this.form.reset();
      timer(500)
        .toPromise()
        .then(() => {
          this.router.navigate(['/product-list']);
        })
    })
  }


  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentProductId = params['id'];
        this.productService.getProduct(params['id']).subscribe((product) => {
          this.form.controls['name'].setValue(product.name);
          this.form.controls['category'].setValue(product.category);
          this.form.controls['price'].setValue(product.price);
          this.form.controls['description'].setValue(product.description);
          this.form.controls['stock'].setValue(product.stock);
        })
      }
    })
  }


  onUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        fileSource: file
      })
    }
  }


  cancel() {
    this.router.navigate(['/product-list']);
  }
}
