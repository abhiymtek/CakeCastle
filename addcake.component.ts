import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServService } from '../serv.service';
import {faSearch, faCartShopping, faSignOut, faSignIn, faCakeCandles, faCake} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-addcake',
  templateUrl: './addcake.component.html',
  styleUrls: ['./addcake.component.css']
})
export class AddcakeComponent implements OnInit {
  faCake:any=faCake
 
  cakedata:any={}
  file:any
  cakeIngredient:any
  cakeForm:any
  imageSource:any


  constructor(private serv: ServService,private formbuilder:FormBuilder,private toaster:ToastrService) {
    this.cakeForm=this.formbuilder.group({
      name:["",[Validators.required ]],
      price:["",[Validators.required]],
      type:["",[Validators.required]],
      weight:["",[Validators.required]],
      ingredient:["",[Validators.required]],
      eggless:["",[Validators.required]],
      description:["",[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  addcake(){

    if(this.cakeForm.valid){
      let body={
        name:this.cakeForm["value"].name,
        price:parseInt(this.cakeForm["value"].price),
        description:this.cakeForm["value"].description,
        ingredients:this.cakeForm["value"].ingredient.split(','),
        image:this.imageSource,
        type:this.cakeForm["value"].type,
        weight:parseInt(this.cakeForm["value"].weight),
        eggless:this.cakeForm["value"].eggless=="eggless"?true:false
      }

      let url="https://apifromashu.herokuapp.com/api/addcake"
      this.serv.cake_post(url,body).subscribe({
        next:(response:any)=>{
          console.log(response.data)
          this.toaster.success("Cake Added Successfully")
        },
        error:(error: any)=>{
          console.log("Error from api",error)
        }
      })
    }
    else{
      console.log("The form is not valid")
    }
  }

  selectTypeofcake(event: any){
    console.log(event.target.value)
  } 

  getFile(event:any){
    this.file=event.target.files[0]
    console.log("Get fILE")
    console.log(this.file)

  }

  upload(){
    console.log("File",this.file)
    var url="https://apifromashu.herokuapp.com/api/upload"
    var formdata=new FormData()
    formdata.append("file",this.file)

    this.serv.cake_post(url,formdata).subscribe({
      next:(response:any)=>{
        if(response){
          console.log(response)
          this.imageSource=response.imageUrl
          this.toaster.success("Image Upload Successful",response.imageUrl)
          
        }
      },
      error:(error: any)=>{
        console.log("Error",error)
      }
    })
  }

}
