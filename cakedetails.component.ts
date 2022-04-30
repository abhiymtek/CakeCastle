import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCartArrowDown, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ServService } from '../serv.service';
import {faSearch, faCartShopping, faSignOut, faSignIn, faCakeCandles, faCake, faArrowAltCircleUp, faArrowUpFromBracket, faBagShopping} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-cakedetails',
  templateUrl: './cakedetails.component.html',
  styleUrls: ['./cakedetails.component.css']
})
export class CakedetailsComponent implements OnInit {
  faAddCart:any=faCartArrowDown
  faAdding:any=faCartPlus

  cakeid: any
  cake:any={

  }
  isadding:any=false
  constructor(private spinner:NgxUiLoaderService, private route : ActivatedRoute, private serv: ServService, private router:Router) { 
    this.cakeid = this.route.snapshot.params["cakeid"]
    //api hit
    this.spinner.start()
    var url = "https://apifromashu.herokuapp.com/api/cake/"+this.cakeid
    this.serv.getCakeDetails(url).subscribe({
      next:(response:any)=>{
        this.spinner.stop()
        console.log("Response from cake details api", response)
        this.cake = response.data 
      },
      error:(error)=>{
        console.log("Error from cake details api",error)
      }
    })
  }

  addtocart(){
    if(localStorage["token"]){
      this.isadding=true
      let myheaders = new HttpHeaders()
      myheaders = myheaders.append("authtoken", localStorage["token"])
      var url="https://apifromashu.herokuapp.com/api/addcaketocart"
      var options={
        headers:myheaders
      }
      var body={
        cakeid:this.cake.cakeid,
        name:this.cake.name,
        weight:this.cake.weight,
        price:this.cake.price,
        image:this.cake.image,

      }
      this.serv.addcakeToCart(url,body,options).subscribe({
        next:(response:any)=>{
          console.log("Response from add to cart api", response)
          if(response.data){
            this.router.navigate(["/cart"])
          }
        },
        error:(error)=>{
          console.log("Error from add to cart api", error)
        }
      })
    }else{
      this.router.navigate(["/login"])
    }
  } 

  ngOnInit(): void {
    this.spinner.startLoader("loader-01"); // start foreground spinner of the loader "loader-01" with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.spinner.stopLoader("loader-01"); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    }, 900);
  }

}
