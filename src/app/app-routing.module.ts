import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { FictionbooksComponent } from './books/fictionbooks/fictionbooks.component';
import { HistorybooksComponent } from './books/historybooks/historybooks.component';
import { ScientificbooksComponent } from './books/scientificbooks/scientificbooks.component';
import { UploadbookComponent } from './books/uploadbook/uploadbook.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowcartComponent } from './showcart/showcart.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  {path:'books', component: BooksComponent},
  {path:'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path:'books/historybooks', component: HistorybooksComponent},
  {path:'books/scientificbooks', component: ScientificbooksComponent},
  {path:'books/fictionbooks', component: FictionbooksComponent},
  {path:'books/uploadbook', component: UploadbookComponent},
  {path:'showcart', component: ShowcartComponent},
  {path:'', component: HomeComponent},
  {path:'thankyou', component: ThankYouComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
