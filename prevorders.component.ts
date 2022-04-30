import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServService } from '../serv.service';

@Component({
  selector: 'app-prevorders',
  templateUrl: './prevorders.component.html',
  styleUrls: ['./prevorders.component.css']
})
export class PrevordersComponent implements OnInit {
  cakeItems:any=[]
  userdata:any={

  }
  totAmt:number = 0
  body:any={}
  constructor(private serv:ServService,private router:Router) {
    // this.serv.prevorders().subscribe({
    //   next:(response:any)=>{
    //     this.cakeItems=response.data
    //     console.log(this.cakeItems)
    //   },
    //   error:(error)=>{
    //     console.log(error)
    //   }
    // })
    let body={
      cakes:this.cakeItems,
      price:this.totAmt,
      name:this.userdata.name,
      address:this.userdata.address,
      city:this.userdata.city,
      pincode:this.userdata.pincode,
      phone:this.userdata.phone_no
    }
    console.log(body)
    let url="https://apifromashu.herokuapp.com/api/cakeorders"
    this.serv.cake_post(url,{}).subscribe({
      next:(response:any) => {
        if(response){
          console.log("On success",response)
          this.cakeItems=response.cakeorders
        }
      },
      error:(error: any)=>{
        console.log(error)
      }
    })
   }

   viewPrevOrders(index:any){
    this.router.navigate(["/prevcakelist",index])
   }
  ngOnInit(): void {
  }

}
