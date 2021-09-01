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
    getArtists (token,page):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json',).set(     'Authorization', token);
        return this._http.get(this.url+'artists/'+page, {headers:headers})
    }
    
    getArtist (token,id:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json',).set(     'Authorization', token);
        return this._http.get(this.url+'artists/'+id, {headers:headers})
    }
    EditArtits(token,id:string, artist: Artist):Observable<any>{
        let params = JSON.stringify(artist); 
        let headers = new HttpHeaders().set('Content-Type', 'application/json',).set(     'Authorization', token);
        return this._http.put(this.url+'artist/'+id,params, {headers:headers})
    }
    DeleteArtist (token,id:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json',).set(     'Authorization', token);
        return this._http.delete(this.url+'artists/'+id, {headers:headers})
    }
    
}