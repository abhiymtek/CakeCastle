import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServService {
  PORT = 8080
  ascending(data:any){
    data.sort((obj1:any,obj2:any)=>{
      return obj1.price - obj2.price
    })
    return data
  }
  descending(data:any){
    data.sort((obj1:any,obj2:any)=>{
      return obj2.price - obj1.price
    })
    return data
  }
  signup(url:any, body:any){
    return this.http.post(url,body)
  }

  login(url:any, body:any){
    return this.http.post(url,body)
  }
  getCakeDetails(url:any){
      return this.http.get(url)
  }

  addcakeToCart(url:any,body:any, options:any){
      return this.http.post(url,body,options)
  }

  removeItems(url:any, body:any){
    return this.http.post(url,body)
  }

  orderCake(body:any){
    const url="https://apifromashu.herokuapp.com/api/addcakeorder"
    let myHeader=new HttpHeaders()
    myHeader=myHeader.append('authtoken',localStorage["token"])
    let options={
      headers:myHeader
    }
    return this.http.post(url,body,options)
  }

  getCartItems(url:any ,body:any ,options:any ){
      return this.http.post(url,body,options)
  }
 
  cartItems:any
  price:any
  userDetails:any
  getCart(){
    const url="https://apifromashu.herokuapp.com/api/cakecart"
    let myHeader = new HttpHeaders()
    myHeader=myHeader.append('authtoken',localStorage["token"])
    let options={headers:myHeader}

    return this.http.post(url,{},options)
    
  }
  
  prevorders(){
    let url="https://apifromashu.herokuapp.com/api/cakeorders"
    let myHeader = new HttpHeaders()
    myHeader=myHeader.append('authtoken',localStorage["token"])
    let options={headers:myHeader}

    return this.http.post(url,{},options)
  }

  cake_post(url:any,body:any){
    let myHeader=new HttpHeaders()
    myHeader=myHeader.append('authtoken',localStorage["token"])
    let options={headers:myHeader}
    
    return this.http.post(url,body,options)
  }

  forgot(url:any,body:any){
    return this.http.post(url,body)
  }
  searchCakes(url:any){
    return this.http.get(url)
  }
  constructor(private http:HttpClient) { }
}
