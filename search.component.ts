import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { ServService } from '../serv.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchitems:any = []

  constructor(private route: ActivatedRoute, private serv:ServService) { 
   
    this.route.queryParams.subscribe((query:any)=>{
      var searchtext = query["q"]
      var url = "https://apifromashu.herokuapp.com/api/searchcakes?q="+searchtext
      this.serv.searchCakes(url).subscribe({
        next:(response:any)=>{
          console.log("Response from searchcakes api",response)
          this.searchitems=response.data
        },
        error:(error)=>{
          console.log("error from serach cakes api", error)
        }
      })
    }) 
  }

  ngOnInit(): void {
  }

}
