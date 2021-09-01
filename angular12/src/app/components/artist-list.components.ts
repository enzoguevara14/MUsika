import { Component, OnInit } from "@angular/core";
import { ActivatedRoute,Router,Params, Routes } from "@angular/router";
import { UserService } from "../services/user.service";
import { GLOBAL } from "../services/global";
import { Artist } from "../models/artist";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Component({
    selector:'artist-list',
    templateUrl:'../views/artist-list.html',
    providers: [UserService]
})
export class ArtistListComponent implements OnInit{
    public titulo:string; 
    public artists: Artist[];
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
        this.titulo='ARTISTAS';
        this.identity =JSON.parse(this._userService.getIdentity());
        this.token=_userService.getToken();
        this.url=GLOBAL.url; 
       this.urlImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.url+'/get-image-user/'+this.identity.image);
        
    }
    ngOnInit(){
        console.log("CORRIENDO ARTISTS COMPONENTE");
    }
}
