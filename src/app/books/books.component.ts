import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book-model';
import { Cart } from '../models/cart-model';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor( private bookservice: BookService, private cartservice: CartService ) { }

  listData!: Book[];
  cartData!: Cart;

  ngOnInit(): void {
    this.refreshBookList()
  }

  refreshBookList()
  {
    this.bookservice.getBookList().subscribe(data => {
      this.listData = data;
      // console.log(this.listData[0])
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
