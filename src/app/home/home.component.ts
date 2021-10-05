import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Book } from '../models/book-model';
import { Cart } from '../models/cart-model';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: BookService, private cartservice: CartService) { }

  listData!: Book[];
  trendingData!: Book[];
  latestData!: Book[];
  cartData!: Cart;
  isLoading = false;

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await this.sleep(1000);
    this.refreshTrendingBookList();
    this.refreshLatestBookList();
  }

  sleep(ms:any) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  refreshTrendingBookList()
  {
    this.trendingData=[];
    this.service.getBookList().subscribe(data => {
      this.listData = data;
      this.listData.forEach( (value) =>
      {
        if(value.rating>4)
        {
          this.trendingData.push(value);
        }
      });
    });
    this.isLoading = false;
  }

  refreshLatestBookList()
  {
    this.latestData=[];
    this.service.getBookList().subscribe(data => {
      this.listData = data;
      this.latestData = this.listData;
      this.latestData=this.latestData.slice(1).slice(-3);
      this.isLoading = false;
    });
  }

  addToCart(book: Book)
  {
    console.log("onClickAddToCart called");
    console.log(book);
    this.cartData! = {cartBookID:0, cartBookName: '',cartBookImage: '',cartBookPrice: 0, quantity: 1  };
    this.cartData.cartBookName = book.bookName;
    this.cartData.cartBookImage = book.bookImage;
    this.cartData.cartBookPrice = book.price;
    this.cartData.quantity = 1;
    console.log(this.cartData);
    this.cartservice.addCartList(this.cartData).subscribe(res=>
    {
      alert("Added To Cart");
    })
  }
}
