import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book-model';
import { Cart } from 'src/app/models/cart-model';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-scientificbooks',
  templateUrl: './scientificbooks.component.html',
  styleUrls: ['./scientificbooks.component.css']
})
export class ScientificbooksComponent implements OnInit {

  constructor( private service: BookService, private cartservice: CartService ) { }

  ngOnInit(): void {
    this.refreshScientificBookList()
  }

  listData!: Book[];
  ScienceData!: Book[];
  cartData!: Cart;

  refreshScientificBookList()
  {
    this.ScienceData=[];
    this.service.getBookList().subscribe(data => {
      this.listData = data;
      this.listData.forEach( (value) =>
      {
        if(value.description=="Science")
        {
          this.ScienceData.push(value);
        }
      });
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
