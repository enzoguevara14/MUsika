import { Component, OnInit } from "@angular/core";
import { ActivatedRoute,Router,Params, Routes } from "@angular/router";
import { UserService } from "../services/user.service";
import { ArtistService } from "../services/artist.services";
import { GLOBAL } from "../services/global";
import { Artist } from "../models/artist";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Component({
    selector:'artist-edit',
    templateUrl:'../views/artist-add.html',
    providers: [UserService, ArtistService]
})
export class ArtistEditComponent implements OnInit{
    public titulo:string; 
    public artist: Artist;
    public identity; 
    public token; 
    public url:string; 
    public urlImg: SafeResourceUrl;
    public safeUrl: SafeResourceUrl; 
    public alertMessage;  
      

    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _userService: UserService,
        private sanitizer: DomSanitizer,
        private _artistService: ArtistService
        
    ){
        this.artist=new Artist('','','');
         this.titulo='Crear nuevo Artista';
         this.identity= this._userService.getIdentity();
       
         this.token= this._userService.getToken(); 
        this.identity= JSON.parse(this.identity); 
        this.url= GLOBAL.url; 
        this.urlImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.url+'/get-image-user/'+this.identity.image);
      
        
    }
    ngOnInit(){
        console.log("CORRIENDO ARTISTS Add COMPONENTE");
        // llamar al metodo de api para 
      
    }