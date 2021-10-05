import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';
import { Book } from '../models/book-model';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let service:BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
        providers: [BooksComponent],
      declarations: [ BooksComponent ]
    })
    .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(BooksComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    // component = fixture.componentInstance;
    fixture.detectChanges();
    service = new BookService(null!);
    component = new BooksComponent(service,null!);
  });


  it('should get all Books', () => {
    const products: Book[] = [
      {
        bookID: 1,
        bookName: "one indian girl",
        author: "chetan bhagat",
        description: "Fiction",
        price: 299,
        rating: 5,
        bookImage: "https://images.hindustantimes.com/rf/image_size_800x600/HT/p2/2016/10/02/Pictures/_9b6ab156-8845-11e6-92b8-e7f1e026a3c4.png"
      },
      {
        bookID: 2,
        bookName: "Project Hail Mary",
        author: "Andy Weir",
        description: "Science",
        price: 500,
        rating: 3,
        bookImage: "https://images.immediate.co.uk/production/volatile/sites/4/2021/05/project-hail-mary-36469e9.jpg?webp=true&quality=90&resize=210%2C324"
      },
      {
        bookID: 3,
        bookName: "Sapiens",
        author: "yuval",
        description: "History",
        price: 599,
        rating: 3,
        bookImage: "https://images-eu.ssl-images-amazon.com/images/I/41yu2qXhXXL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg"
      },
      {
        bookID: 4,
        bookName: "Wish You Were Here",
        author: "jodi picoult",
        description: "Fiction",
        price: 899,
        rating: 4,
        bookImage: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1622427709l/57701764._SX98_.jpg"
      },
      {
        bookID: 5,
        bookName: "Brutal Justice",
        author: "Jess Corban",
        description: "Fiction",
        price: 699,
        rating: 5,
        bookImage: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1606326831l/56043378._SY475_.jpg"
      },
      {
        bookID: 6,
        bookName: "Pale Blue Dot",
        author: "Anu Druyan",
        description: "Science",
        price: 699,
        rating: 5,
        bookImage: "https://images-eu.ssl-images-amazon.com/images/I/51YebM30-QL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg"
      },
      {
        bookID: 7,
        bookName: "Nuclear Fission Reactors",
        author: "Cameron",
        description: "Science",
        price: 2999,
        rating: 5,
        bookImage: "https://images-na.ssl-images-amazon.com/images/I/41PbEYu3qZL._SX325_BO1,204,203,200_.jpg"
      },
      {
        bookID: 8,
        bookName: "From Fission to Fusion",
        author: "Srinivasan",
        description: "Science",
        price: 599,
        rating: 5,
        bookImage: "https://images-na.ssl-images-amazon.com/images/I/31ICl95OhEL._BO1,204,203,200_.jpg"
      }
    ];
    spyOn(service, 'getBookList').and.callFake(() => {
      return Observable.from([products]);
    });
    component.ngOnInit();
    component.refreshBookList();

    expect(component.listData).toEqual(products);
  });
});
