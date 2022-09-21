import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {
  products: Product[] = [];


  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.getProducts();
  }


  private getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }


  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe((product) => {
      this.getProducts();
    })
  }


  updateProduct(id: string) {
    this.router.navigateByUrl(`product-create/${id}`)
  }

  csvupload(){
    this.productService.uploadcsv().subscribe()
      window.location.reload();
  }
}
