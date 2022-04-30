import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServService } from '../serv.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userdata:any={

  }
  signupForm:any
  users:any=[

  ]

  respErr:any
  constructor(private toastr: ToastrService, private serv:ServService, private formbuilder:FormBuilder) {
    this.signupForm=this.formbuilder.group({
      abhilash:['',[Validators.required,Validators.email]]
    })
  }

  showSuccess() {
    this.toastr.success("Signup Successful..!");
  }
  showDeletion(){
    this.toastr.success("Successfully Deleted..!")
  }
  signup(){
    // console.log("Values Entered by USER are: ",this.userdata)
    // var temp={...this.userdata} // ... -> spread operator
    // this.users.push(temp)

    if(this.signupForm.Valid){
      alert()
    }else{
      return
    }
    // var url = "https://apifromashu.herokuapp.com/api/register"
    // this.serv.signup(url,this.userdata).subscribe({
    //   next:(response:any)=>{
    //     console.log("Response from users API ", response);
    //     // this.userdata.name=response.name,
    //     // this.userdata.email=response.email,
    //     // this.userdata.password=response.password
    //     if(response.message=="User Already Exists"){
    //       this.respErr = "Invalid Email or Email Already Taken"
    //     }
    //   },

    //   error:(error)=>{
    //     console.log("Found Error from users API ", error)
    //   }
    // })
  }

  deleteUser(index:any){
    alert(index)
    this.users.pop(index)
  }

  ngOnInit(): void {
  }

}
