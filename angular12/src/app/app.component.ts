import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { User } from './models/user';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';
import { ActivatedRoute, Router, RouterModule, Routes  } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
  
})
export class AppComponent implements OnInit{
  title = 'MUSIKA';
  public user: User; 
  public user_register: User; 
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public urlImg: SafeResourceUrl;
 
  public url:string;
  

  constructor(private _userService: UserService, private sanitizer: DomSanitizer  , private _route:ActivatedRoute,
    private _router:Router){
    this.url= GLOBAL.url;
    
    
    this.user= new User('','','','','','ROLE_USER','');
    this.user_register= new User('','','','','','ROLE_USER','');
    this.identity= this._userService.getIdentity();
    
  }

  ngOnInit(){
   
    var imag= JSON.parse(this.identity); 
    this.urlImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.url+'get-image-user/'+imag.image);
   
    console.log(JSON.parse(this.identity));
   


    this.token= this._userService.getToken(); 
    console.log (this.token);
  }


 
  public onSubtmit(){
  
    //conseguir los datos del usuario 
    this._userService.signup(this.user).subscribe(
      response=> {
        let identity=response.user;
        this.identity=identity;
     

        if(!this.identity){
          alert("el usuario no esta correctamente identificado ");
        }else{
              //crear el localstrorage para tener la 
              localStorage.setItem('identity',JSON.stringify(identity)); 
              

              this._userService.signup(this.user, true).subscribe(
                response=> {
                  let token=response.token;
                  this.token=token;
                  
          
                  if(this.token.length<=0){
                    alert("el token no se a generado  ");
                  }else{
                        //crear el localstrorage para tener la el token disponible
                        localStorage.setItem('token',token); 
                        this.user= new User('','','','','','ROLE_USER','');
                       
                  }
          
                },
                error=>{
                  var errorMessage= <any>error;
                  
          
                  if(errorMessage!=null){
                    var parsederror= error.error.message;
                    
                    console.log(parsederror);
                    this.errorMessage=parsederror;
                    
          
                   
                  }
                }
                )
              }
            },
          
      
      error=>{
        var errorMessage= <any>error;
         
          
        if(errorMessage!=null){
          var parsederror= error.error.message;
          
          console.log(parsederror);
          this.errorMessage=parsederror;
          
        }
      }

    )
  }

  public logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token'); 
    localStorage.clear(); 
    this.identity=null;
    this.token=null; 
    this._router.navigate(['/']);

  }
 

  public onSubmitRegister(){
    console.log(this.user_register); 


    this._userService.register(this.user_register).subscribe(
      response=> {
        let user= response.user;
        this.user_register=user; 
        

        if (!user._id){
          this.alertRegister="Error al Registrarse";
        }else{
          this.alertRegister="EL registro se ha realizado correctamente ";
          this.user_register= new User('','','','','','ROLE_USER','');
        }

      },
      error=> {
        var errorMessage= <any>error;
         
          
        if(errorMessage!=null){
          var alertRegister= error.error.message;
          
          //console.log(parsederror);
         // this.errorMessage=parsederror;
      }
    }
    )
  }
  


}
