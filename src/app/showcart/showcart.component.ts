import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart-model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-showcart',
  templateUrl: './showcart.component.html',
  styleUrls: ['./showcart.component.css']
})

export class ShowcartComponent implements OnInit {

  constructor( private service: CartService ) { }

  cartData!: Cart[];
  totalBill!: number;

  ngOnInit(): void {
    this.refreshCartList();
  }

  refreshCartList()
  {
    this.service.getCartList().subscribe(data => {
      this.cartData = data;
      this.totalBill = 0;
      this.cartData.forEach(item => {
        this.totalBill = this.totalBill + item.cartBookPrice;
      }); ;
    });
  }

  deleteItem(id: number)
  {
    if(confirm("Are you sure you want to delete?"))
    {
      this.service.deleteCartItem(id).subscribe(res => {
        this.refreshCartList();
      });
    }
    // console.log(id);
  }

  resetCart()
  {
    if(confirm("Are you sure you want to delete all items in the cart?"))
    {
      this.service.resetCart().subscribe(res => {
        this.refreshCartList();
      });
    }
  }

  buyBooks()
  {
      this.service.resetCart().subscribe(res => {
        this.refreshCartList();
      });
  }

  get isUserLogin()
  {
    const user=localStorage.getItem("userInfo");
    return user && user.length>0;
  }

}
