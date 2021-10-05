import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly APIUrl:string = "https://localhost:44386/api/User/";

  constructor(private httpClient:HttpClient) { }

  public login(email:string, password:string)
  {
      const body={
        Email:email,
        Password:password
      }
      return this.httpClient.post(this.APIUrl+"Login",body)
  }

  public register(fullName:string, email:string,password:string)
  {
      const body={
        FullName:fullName,
        Email:email,
        Password:password
      }
      return this.httpClient.post(this.APIUrl+"RegisterUser",body)
  }
}
