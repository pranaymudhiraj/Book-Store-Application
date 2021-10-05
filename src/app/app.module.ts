import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookService } from './services/book.service';
import { NgxPopper } from 'angular-popper';
import { HistorybooksComponent } from './books/historybooks/historybooks.component';
import { ScientificbooksComponent } from './books/scientificbooks/scientificbooks.component';
import { FictionbooksComponent } from './books/fictionbooks/fictionbooks.component';
import { UploadbookComponent } from './books/uploadbook/uploadbook.component';
import { ShowcartComponent } from './showcart/showcart.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HistorybooksComponent,
    ScientificbooksComponent,
    FictionbooksComponent,
    UploadbookComponent,
    ShowcartComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, HttpClientModule, NgxPopper, FormsModule, ReactiveFormsModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
