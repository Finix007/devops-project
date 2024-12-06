import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http:HttpClient) { }
server="http://127.0.0.1:5000"

signup(data:any)
{
  return this.http.post(this.server+"/signup",data,{withCredentials:true})
}

login(data:any)
{
  return this.http.post(this.server+"/login",data,{withCredentials:true})
}
}
