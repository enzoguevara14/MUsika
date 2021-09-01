import { Component, OnInit } from "@angular/core";
import { ActivatedRoute,Router,Params, Routes } from "@angular/router";
import { UserService } from "../services/user.service";
import { ArtistService } from "../services/artist.services";
import { GLOBAL } from "../services/global";
import { Artist } from "../models/artist";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Component({
    selector:'artist-add',
    templateUrl:'../views/artist-add.html',
    providers: [UserService, ArtistService]
})
export class ArtistAddComponent implements OnInit{
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
        this.identity =JSON.parse(this._userService.getIdentity());
        this.token=_userService.getToken();
        this.url=GLOBAL.url; 
      
        
    }
    ngOnInit(){
        console.log("CORRIENDO ARTISTS Add COMPONENTE");
      
    }
    onSubmit(){
        console.log(this.artist); 
        this._artistService.addArtits(this.token,this.artist).subscribe(
            response=> {
                
                if (!response.artist){
                    this.alertMessage='Error en el servidor'; 
                }else {
                    this.alertMessage='El artista se cargo correctamente';
                    this.artist=response.artist; 
                  //  this._route.navigate(['/editar-artista']),response.artist._id);
                }
            },
            error=>{
                var errorMessage= <any>error;
                
        
                if(errorMessage!=null){
                  var parsederror= error.error.message;
                  
                  console.log(parsederror);
                 
        
                 
                }
            }

        );

    }
}
