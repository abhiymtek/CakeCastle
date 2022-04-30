import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServService } from '../serv.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serv:ServService, private router:Router) { }
  
  responseError:any 

  userdata:any={

  }
  respErr:any
  login(){
    var url = "https://apifromashu.herokuapp.com/api/login"
    this.serv.login(url,this.userdata).subscribe({
      next:(response:any)=>{
        console.log("Response from users API ", response);
        // if(response.message=="Please provide credentials"){
        //   this.responseError="Please provide credentials"
        // }
        if(response.token){
          localStorage["token"] = response.token
          this.router.navigate(["/"])
        }else if(response.error="Invalid Credentials"){
          this.responseError = "Invalid Credentials"
        }
      },

      error:(error)=>{
        console.log("Found Error from users API ", error)
        this.responseError="Please Provide Credentials"
      }
    })
  }

  addToCart(){
    
  }
  
  ngOnInit(): void {
  }

}
