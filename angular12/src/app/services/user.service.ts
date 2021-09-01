import { Injectable} from "@angular/core";
import { HttpClient, HttpResponse,HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators'
import 'rxjs/add/operator/map';
import { Observable ,of, Subject } from "rxjs";
import { GLOBAL } from "./global";


@Injectable()
export class UserService{
    public url: string; 
    public identity; 
    public token; 
    constructor (private _http: HttpClient){
        this.url=GLOBAL.url; 
    }
    signup(usertologin , gethash=false) :Observable<any>{
        if (gethash!=false){
            usertologin.gethash=gethash;
        }
        let json = JSON.stringify(usertologin); 
        let params= json; 

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'login',params,{headers:headers})
        

    }
getIdentity(){

    let iden= localStorage.getItem('identity'); 
    
    if (iden!= 'undefined'){
        
        this.identity=iden; 
        
    }else{
        this.identity=null;
    }return this.identity; 
}

getToken(){
    let token= localStorage.getItem('token'); 
    if (token!= 'undefined'){
        this.token=token; 
    }else{
        this.token=null;
         
    }return this.token; 
    

}
register(usertoregister):Observable<any>
{
    let json = JSON.stringify(usertoregister); 
    let params= json; 

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'register',params,{headers:headers})


}
update_user(user_to_update):Observable<any>{
    let json = JSON.stringify(user_to_update); 
    let params= json; 
    let token = JSON.stringify(this.getToken());

    let headers = new HttpHeaders().set('Content-Type', 'application/json',).set(     'Authorization', this.getToken());
                                    
    return this._http.put(this.url+'UpdateUser/'+user_to_update._id, params, {headers:headers})
   
}
}

