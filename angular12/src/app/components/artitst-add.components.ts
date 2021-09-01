import { Component, OnInit } from "@angular/core";
import { ActivatedRoute,Router,Params, Routes } from "@angular/router";
import { UserService } from "../services/user.service";
import { GLOBAL } from "../services/global";
import { Artist } from "../models/artist";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Component({
    selector:'artist-add',
    templateUrl:'../views/artist-add.html',
    providers: [UserService]
})
export class ArtistAddComponent implements OnInit{
    public titulo:string; 
    public Artist: Artist;
    public identity; 
    public token; 
    public url:string; 
    public urlImg: SafeResourceUrl;
    public safeUrl: SafeResourceUrl; 

    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _userService: UserService,
        private sanitizer: DomSanitizer,
        
    ){
        this.Artist=new Artist('','','');
         this.titulo='Crear nuevo Artista';
        this.identity =JSON.parse(this._userService.getIdentity());
        this.token=_userService.getToken();
        this.url=GLOBAL.url; 
      
        
    }
    ngOnInit(){
        console.log("CORRIENDO ARTISTS Add COMPONENTE");
    }
    onSubmit(){

    }
}
