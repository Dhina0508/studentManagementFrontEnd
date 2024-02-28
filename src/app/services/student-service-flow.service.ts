import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { Observable } from 'rxjs';
import { StudentResponseModel } from '../models/studentInfo';
import { constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceFlowService {

  constructor(private http:HttpClient) { 
  }
  onLogin(obj:any):Observable<any>{
    return this.http.post(environments.APIENDPOINT+constants.ENDPOINTS.LOGIN,obj);  
  }
  onRegister(obj:any):Observable<any>{
    return this.http.post(environments.APIENDPOINT+constants.ENDPOINTS.REGISTER,obj);
  }

  getAllStudentsInfo(count:number,page:number):Observable<any>{
    return this.http.get<any>(environments.APIENDPOINT+constants.ENDPOINTS.STUDENT+"?page="+page+"&count="+count);
  }

  getStudentsInfoById(id:number):Observable<StudentResponseModel>{
    return this.http.get<StudentResponseModel>(environments.APIENDPOINT+constants.ENDPOINTS.STUDENT+id);
  }
   
  deleteStudentInfo(id: number): Observable<any> {
   return this.http.delete(environments.APIENDPOINT+constants.ENDPOINTS.STUDENT+id);
  }
}
