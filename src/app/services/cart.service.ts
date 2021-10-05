import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private http: HttpClient ) { }

  formData!: Cart;

  readonly APIUrl = "https://localhost:44386/api";

  getCartList(): Observable<Cart[]> 
  {
    return this.http.get<Cart[]>(this.APIUrl+'/Carts');
  }

  addCartList( cart : Cart ) 
  {
    return this.http.post(this.APIUrl+'/Carts', cart);
  }

  resetCart()
  {
    return this.http.delete(this.APIUrl+'/Carts');
  }

  deleteCartItem( id : number )
  {
    return this.http.delete(this.APIUrl+'/Carts/'+id);
  }
  
}
