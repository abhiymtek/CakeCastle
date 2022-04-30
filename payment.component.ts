import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { ServService } from '../serv.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cartItems:any=[]
  userdata:any={

  }
  totAmt:number = 0
  body:any={}


  constructor(private serv:ServService,private router:Router,private toaster:ToastrService) {

    this.serv.getCart().subscribe({
      next:(response:any)=>{
        this.cartItems=response.data
        console.log(this.cartItems)
        this.cartItems.map((_item: any)=>{
         this.totAmt+=_item.quantity * _item.price
        })
      },
      error:(error)=>{
        console.log(error)
      }
    })  

    this.userdata=localStorage.getItem('address')
    this.userdata=JSON.parse(this.userdata)

   }

  order(){
    console.log(this.cartItems)
    let body={
      cakes:this.cartItems,
      price:this.totAmt,
      name:this.userdata.name,
      address:this.userdata.address,
      city:this.userdata.city,
      phone:this.userdata.phone,
      pincode:this.userdata.pincode,
    }
    console.log(body)
    this.serv.orderCake(body).subscribe({
      next:(response:any) => {
        console.log("API Response",response)
        if(response.messageg == "order placed"){
          this.toaster.success("Order Placed Successfully..!")
          //your order id is ${response["order"].orderid}
          this.router.navigate(["/ordersuccess"])
        }else{

        }
        
      },

      error:(error: any)=>{
        console.log(error)
      }
    })
  }
  

  
     
  ngOnInit(): void {
  }

}
