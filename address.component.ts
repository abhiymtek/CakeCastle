import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { stringify } from 'querystring';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  userdata:any={}
  addressForm: any;
 
  constructor(private toaster:ToastrService, private router:Router, private formbuilder:FormBuilder) { 
    this.addressForm=this.formbuilder.group({
      name:["",[Validators.required]],
      address:["",[Validators.required]],
      city:["",[Validators.required]],
      pincode:["",[Validators.required,Validators.maxLength(6),Validators.minLength(6)]],
      phone:["",[Validators.required,Validators.maxLength(10),Validators.minLength(10)]]
    })
  }
  addAddress(){
     
      localStorage.setItem('address',JSON.stringify(this.userdata))
      this.toaster.success("Address is succesfully added!")
      this.router.navigate(["/checkout/payment"])
      
    
   
  }
  ngOnInit(): void {
  }

}
