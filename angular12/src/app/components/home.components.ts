import { Component, OnInit } from "@angular/core";
import { ActivatedRoute,Router,Params, Routes } from "@angular/router";



import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Component({
    selector:'home',
    templateUrl:'../views/home.html',
  
})
export class HomeComponent implements OnInit{
    public titulo:string; 
   

    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        
        
    ){
        this.titulo='HOEMEMEE';
       
    }
    ngOnInit(){
        console.log("CORRIENDO HOME COMPONENTE");
    }
}
