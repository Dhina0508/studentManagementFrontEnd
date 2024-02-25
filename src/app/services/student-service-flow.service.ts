import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { Observable } from 'rxjs';
import { StudentInfoModel, StudentResponseModel } from '../models/studentInfo';
import { constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceFlowService {
  apiEndpoint:string="";

  constructor(private http:HttpClient) { 
    this.apiEndpoint=environments.APIENDPOINT;
  }
  onLogin(obj:any):Observable<any>{
    return this.http.post(this.apiEndpoint+constants.ENDPOINTS.LOGIN,obj);  
  }
  onRegister(obj:any):Observable<any>{
    return this.http.post(this.apiEndpoint+constants.ENDPOINTS.REGISTER,obj);
  }

  getAllStudentsInfo(count:number,page:number):Observable<any>{
    return this.http.get<any>(this.apiEndpoint+constants.ENDPOINTS.STUDENT+"?page="+page+"&count="+count);
  }

  getStudentsInfoById(id:number):Observable<StudentResponseModel>{
    return this.http.get<StudentResponseModel>(this.apiEndpoint+constants.ENDPOINTS.STUDENT+id);
  }
   
  deleteStudentInfo(id: number): Observable<any> {
   return this.http.delete(this.apiEndpoint+constants.ENDPOINTS.STUDENT+id);
  }
}
