import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { User } from "../models/user";
import { GLOBAL } from "../services/global";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";


@Component({
    selector:'user-edit',
    templateUrl: '../views/user-edit.html',
    providers:[UserService]
})

export class UserEditComponent implements OnInit{
    public titulo: string; 
    public user: User ; 
    public identity; 
    public token ; 
    public errorMessage;
    public alertMessage; 
    public nombre!: string;
    public urlImg: SafeResourceUrl;
    public safeUrl: SafeResourceUrl; 
    
    
    public url:string; 

    constructor(private _userService: UserService  ,private sanitizer: DomSanitizer)
    {
        this.titulo="ACTUALIZAR DATOS"
       

        //localStorage
       this.identity= this._userService.getIdentity();
       
        this.token= this._userService.getToken(); 
       this.user= JSON.parse(this.identity); 
       this.url= GLOBAL.url; 
       this.urlImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.url+'/get-image-user/'+this.user.image);
       
       // this.nombre= this.user.name; 
       // console.log(this.nombre); 

      //  console.log(this.user);
        

    }
    onSubmit(){
        
      
        this._userService.update_user(this.user).subscribe(
           ( response  )=>{
               if(!response){
                   this.alertMessage="El usuario NO se ha actualizado"; 
               }else{
              //  this.user= response;
                localStorage.setItem('identity', JSON.stringify(this.user));
                document.getElementById ("identity_name").innerHTML= this.user.name;
                
                if(!this.filesToUpload){
                  // redireccion 
                  console.log("no  hay nada "); 
                }else{ 
                  
                    this.makeFileRequest(this.url+'upload-image-user/'+this.user._id,[],this.filesToUpload).then(
                      (result: any)=> {
                        this.user.image=result.image; 
                        this.urlImg = this.sanitizer.bypassSecurityTrustResourceUrl(
                          this.url + 'get-image-user/' + this.user.image);

                        localStorage.setItem('identity', JSON.stringify(this.user));
                        const imagePath = this.url + 'get-image-user/' + this.user.image;
                           document.getElementById('image-logged').setAttribute('src', imagePath);
                        
                      }
                    ).catch(e=> {
                      console.log(e);
                    })
                    ;
                }

                this.alertMessage="EL USUARIO SE A ACTUALIZADO CORRECTAMENTE"; 
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
            
        ) ;


    }
    ngOnInit(){
        

      //  console.log("user-edit.component.ts cargaado "); 
    }
    public filesToUpload: Array<File> ;  
    fileChangeEvent(fileInput: any){
      this.filesToUpload=<Array<File>>fileInput.target.files; 
      console.log(this.filesToUpload);
    }

    makeFileRequest(url: string, params:Array<string>,files: Array<File>){
      var token =this._userService.getToken(); 
      return new Promise(function(resolve,reject){
        var formData:any=new FormData(); 
        var xhr= new XMLHttpRequest();

        for (var i=0; i<files.length; i++)
        {
          formData.append('image', files[i], files[i].name );
        }
        xhr.onreadystatechange=function (){
          if(xhr.readyState==4){
            if(xhr.status==200){
              resolve(JSON.parse(xhr.response));
            }else{
              reject(xhr.response);  
            }
          }
        }
        xhr.open('POST',url,true);
        xhr.setRequestHeader('Authorization',token);
        xhr.send(formData);

      });
    }
}



