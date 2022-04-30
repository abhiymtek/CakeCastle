import { Component, OnInit } from '@angular/core';
import { ServService } from '../serv.service';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-cakelist',
  templateUrl: './cakelist.component.html',
  styleUrls: ['./cakelist.component.css']
})
export class CakelistComponent implements OnInit {
  cakes:any=[]
    // {name:"Truffle Cake", price:500, image:"assets/truffle.jpeg"},
    // {name:"Fruit Cake", price: 450, image:"assets/fruitcake.jpeg"},
    // {name:"Truffle Cake", price:300, image:"assets/truffle.jpeg"},
    // {name:"Fruit Cake", price: 660, image:"assets/fruitcake.jpeg"},
    // {name:"Truffle Cake", price:435, image:"assets/truffle.jpeg"},
    // {name:"Fruit Cake", price: 550, image:"assets/fruitcake.jpeg"},
    // {name:"Truffle Cake", price:440, image:"assets/truffle.jpeg"},
    // {name:"Fruit Cake", price: 288, image:"assets/fruitcake.jpeg"}
 
  constructor(private servangular: ServService, private http:HttpClient, private ngxService: NgxUiLoaderService){ //
    var url = "https://apifromashu.herokuapp.com/api/allcakes";
    this.http.get(url).subscribe({
      next:(response:any)=>{
        console.log("Response from all cakes api", response)
        this.cakes=response.data
      },
      error:(error)=>{
        console.log("Error from all cakes api", error)
      }
    })
  }
  ascsort(){
    //this.servangular.PORT=4200
    this.cakes = this.servangular.ascending(this.cakes)
  }
  dscsort(){
    this.cakes = this.servangular.descending(this.cakes)
  }
  // ngOnInit(): void {
  // }
  ngOnInit() {
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 900);

    // OR
    this.ngxService.startBackground("do-background-things");
    // Do something here...
    this.ngxService.stopBackground("do-background-things");

    this.ngxService.startLoader("loader-01"); // start foreground spinner of the loader "loader-01" with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stopLoader("loader-01"); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    }, 900);
  }

}
