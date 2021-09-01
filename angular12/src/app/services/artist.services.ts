import { Injectable} from "@angular/core";
import { HttpClient, HttpResponse,HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators'
import 'rxjs/add/operator/map';
import { Observable ,of, Subject } from "rxjs";
import { GLOBAL } from "./global";
import { Artist } from "../models/artist";


@Injectable()
export class ArtistService{
    public url: string; 
    
    constructor (private _http: HttpClient){
        this.url=GLOBAL.url; 
    }
    addArtits(token, artist: Artist):Observable<any>{
        let params = JSON.stringify(artist); 
        let headers = new HttpHeaders().set('Content-Type', 'application/json',).set(     'Authorization', token);
        return this._http.post(this.url+'artist',params, {headers:headers})
    }
}