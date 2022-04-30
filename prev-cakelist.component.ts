import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServService } from '../serv.service';

@Component({
  selector: 'app-prev-cakelist',
  templateUrl: './prev-cakelist.component.html',
  styleUrls: ['./prev-cakelist.component.css']
})
export class PrevCakelistComponent implements OnInit {

  index:any
  cakeorders:any=[]
  orderId:any
  totAmt:any

  constructor(private route:ActivatedRoute,private serv: ServService) {
      this.index=this.route.snapshot.params["index"]
      let url="https://apifromashu.herokuapp.com/api/cakeorders"
      this.serv.cake_post(url,{}).subscribe({
        next:(response:any)=>{
          if(response){ 
            this.totAmt=response.cakeorders[this.index].price
            this.orderId=response.cakeorders[this.index].orderid
            this.cakeorders=response.cakeorders[this.index].cakes
          }
        }
      })
   }

  ngOnInit(): void {
  }

}
