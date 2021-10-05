import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-uploadbook',
  templateUrl: './uploadbook.component.html',
  styleUrls: ['./uploadbook.component.css']
})
export class UploadbookComponent implements OnInit {

  constructor( public service: BookService ) { }

  ngOnInit(): void {
    this.resetForm()
  }

  resetForm(form?:NgForm)
  {
    this.service.formData = {
      bookID: 0,
      bookName!: '',
      author!: '',
      description!: '',
      price!: 0,
      rating!: 0,
      bookImage!: ''
    }
  }
  onSubmit(form: NgForm)
  {
    this.service.addBookList(form.value).subscribe(res=>
      {
        this.resetForm(form);
        alert("book added");
      })
    // console.log(form.value);
  }

}
