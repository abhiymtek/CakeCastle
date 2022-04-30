import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServService } from '../serv.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartitems:any=[]
  totalprice:any=0
  faTrash:any=faTrash
  constructor(private serv:ServService, private toastr:ToastrService, private router:Router) { 
    var url="https://apifromashu.herokuapp.com/api/cakecart"
    let myheaders = new HttpHeaders
    myheaders=myheaders.append("authtoken", localStorage["token"])
    var options={
      headers: myheaders
    }
    var body={}
    this.serv.getCartItems(url,body,options).subscribe({
      next:(response:any)=>{
        console.log("Response from cart items api", response)
        if(response.message=="your cart is empty"){
            this.toastr.error("Your Cart is Empty..!")
            this.router.navigate(["/"])
        }
        this.cartitems = response.data
        this.cartitems.forEach((each:any)=>{
          this.totalprice=this.totalprice + each.price * each.quantity
        })
      },
      error:(error)=>{
        console.log("Error from cart items api", error)
      }
    })
  }


  increDecre(character:string,index:any){
    let body={
      cakeid:this.cartitems[index].cakeid,
    }
    if(character=="-"){
      console.log("Decrement")
     this.serv.cake_post("https://apifromashu.herokuapp.com/api/removeonecakefromcart",body).subscribe({
       next:(response:any) => {
         if(response && this.cartitems[index].quantity>1){
           console.log(this.cartitems)
           this.cartitems[index].quantity-=1;
           this.totalprice-=this.cartitems[index].quantity * this.cartitems[index].price
         }
         else if(this.cartitems[index].quantity==1 && this.cartitems.length>1){
           this.removeItem(body.cakeid,index)
         }
         else{
           this.cartitems.pop()
         }
       },
       error:(error: any)=>{
         console.log(error)
       }
     })
    }
    else{
      this.serv.cake_post("https://apifromashu.herokuapp.com/api/addcaketocart", this.cartitems[index]).subscribe({
         next:(response:any)=>{
           if(response){
             console.log(this.cartitems)
             this.totalprice+=this.cartitems[index].price
             this.cartitems[index].quantity+=1;
           
           }
         }
      })
      
    }
  }

 removeItem(cakeid:any, index:any):any{
   this.totalprice-=this.cartitems[index].quantity*this.cartitems[index].price
   this.cartitems=this.cartitems.filter((item:any)=>{
     return item.cakeid!=cakeid
   })
 }

  ngOnInit(): void {
  }

}
