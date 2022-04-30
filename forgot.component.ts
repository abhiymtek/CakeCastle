import { Component, OnInit } from '@angular/core';
import { ServService } from '../serv.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  constructor(private serv:ServService) { }
  err:any
  userdata:any={

  }
  forgot(){
    var url = "https://apifromashu.herokuapp.com/api/recoverpassword"
    this.serv.forgot(url,this.userdata).subscribe({
      next:(response:any)=>{
       
      },

      error:(error)=>{
        
      }
    })
  }

  ngOnInit(): void {
  }

}
