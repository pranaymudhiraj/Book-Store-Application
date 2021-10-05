import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  constructor( private http: HttpClient ) { }

  
  formData!: Book;

  readonly APIUrl = "https://localhost:44386/api";

  getBookList(): Observable<Book[]> 
  {
    return this.http.get<Book[]>(this.APIUrl+'/Books');
  }

  addBookList( book : Book ) 
  {
    return this.http.post(this.APIUrl+'/Books', book);
  }

}
