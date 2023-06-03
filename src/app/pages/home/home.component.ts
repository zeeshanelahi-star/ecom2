import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/models/store.service';
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT: {[id:number]:number}={ 1: 400, 3: 335, 4: 350};
@Component({
  selector: 'app-home',
   templateUrl:'./home.component.html'
  ,
 })
export class HomeComponent implements OnInit,OnDestroy{
 cols= 3;
rowHeight = ROWS_HEIGHT[this.cols]
category: string | undefined;
products:Array<Product> | undefined;
sort='desc';
count='12';
productsSubcription : Subscription | undefined

constructor(private cartService:CartService, private storeService:StoreService){}
  ngOnInit(): void {
 this.getProducts();
  }

  getProducts(){
    this.productsSubcription = this.storeService.getAllProducts(this.count,this.sort,
      this.category)
    .subscribe((_products)=>{
      this.products = _products;
    });
  }
  onColumnsCountChange(closNum:number):void{
    this.cols = closNum;
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }
  onShowCategory(newCategory:string){
this.category = newCategory
this.getProducts();
  }
  onAddToCart(product:Product){
    this.cartService.addToCart({
      product: product.image,
      name:product.title,
      price:product.price,
      quantity:1,
      id:product.id,
    })
  }
  onItemCountChange(newCount:number){
    this.count = newCount.toString();
    this.getProducts();
  }
  onSortChange(newSort:string){
    this.sort = newSort;
    this.getProducts();
  }
  ngOnDestroy(){
    if(this.productsSubcription){
      this.productsSubcription.unsubscribe();
    }
  }
}
