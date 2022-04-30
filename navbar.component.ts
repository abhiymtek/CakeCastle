import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ServService } from "../serv.service";
import {faSearch, faCartShopping, faSignOut, faSignIn, faCakeCandles, faCake, faArrowAltCircleUp, faArrowUpFromBracket, faBagShopping} from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";

@Component({
    selector:"app-navbar",
    templateUrl:"./navbar.component.html"
})
export  class NavbarComponent{
    projecttitle:any="Abhiiieee's Cake Castle"
    searchtext:any
    color:any
    isloggedin:any
    faSearch:any = faSearch
    faCartShopping:any=faCartShopping
    faSignOut:any= faSignOut
    faSignIn:any= faSignIn
    faCake:any=faCake
    faarrow:any=faArrowUpFromBracket
    fabag:any=faBagShopping
    constructor(private servangular:ServService, private router:Router, private toastr:ToastrService){
        this.isloggedin = localStorage["token"]?true:false
    }

    ngDoCheck(){
        if(localStorage["token"]){
            this.isloggedin=true
        }else{
            this.isloggedin=false
        }
    }
    logout(){
        this.toastr.success("You have been Successfully Signed-out")
        localStorage.removeItem("token")
        this.router.navigate(["/"])
      }
    search(){
        if(this.searchtext){
            this.router.navigate(["/search"],{queryParams:{q:this.searchtext}})
        }
    }
}