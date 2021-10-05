import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {

  public registerForm=this.formBuilder.group({
    fullName:['',[Validators.required]],
    email:['',[Validators.email,Validators.required]],
    password:['',Validators.required]
  })
  constructor(private formBuilder:FormBuilder,private userService:UserService,private router:Router) { }
  ngOnInit(): void {
  }
  onSubmit(){
    console.log("on submit ")
    let fullName=this.registerForm.controls["fullName"].value;
    let email=this.registerForm.controls["email"].value;
    let password=this.registerForm.controls["password"].value;

    this.userService.register(fullName,email,password).subscribe((data:any)=>{
      if(data.responseCode==1){
        localStorage.setItem("userInfo",JSON.stringify(data.dataSet))
        this.router.navigate(["login/"]);
        alert("User Registered!!")
      }
      else if(data.responseCode!=1){
        console.log("response",data);
        alert(data.dataSet);
      }
    },error=>{
      console.log("error",error);
    })
  }

}
