import { Component, OnInit ,OnChanges } from '@angular/core';
import { Product } from '../admin/models/product';
import { ProductsService } from '../admin/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit ,OnChanges {
  searchtext="";
  products: Product[] = [];
  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {

  }
  ngOnChanges(changes:any): void {
    console.log("thisis",changes)
  }

  search(){
    this.productService.searchProducts(this.searchtext).subscribe((products)=>{
      this.products= products
    })
  }

}
