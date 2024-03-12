import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StudentResponseModel } from '../models/studentInfo';
import { constants } from '../constants/constants';
import { DummyDataModel } from '../models/dummyData';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceFlowService {
  isPopupVisibleForDummyData = false;
  isPopupVisibleForArrayMethods = false;


  constructor(private http: HttpClient) {}
  onLogin(obj: any): Observable<any> {
    return this.http.post(
      environments.APIENDPOINT + constants.ENDPOINTS.LOGIN,
      obj
    );
  }
  onRegister(obj: any): Observable<any> {
    return this.http.post(
      environments.APIENDPOINT + constants.ENDPOINTS.REGISTER,
      obj
    );
  }

  getAllStudentsInfo(count: number, page: number): Observable<any> {
    return this.http.get<any>(
      environments.APIENDPOINT +
        constants.ENDPOINTS.STUDENT +
        '?page=' +
        page +
        '&count=' +
        count
    );
  }

  getStudentsInfoById(id: number): Observable<StudentResponseModel> {
    return this.http.get<StudentResponseModel>(
      environments.APIENDPOINT + constants.ENDPOINTS.STUDENT + id
    );
  }

  addStudentInfo(obj: any): Observable<any> {
    return this.http.post(
      environments.APIENDPOINT + constants.ENDPOINTS.STUDENT,
      obj
    );
  }

  editStudentInfo(obj: any, id: number): Observable<any> {
    return this.http.patch(
      environments.APIENDPOINT + constants.ENDPOINTS.STUDENT + id,
      obj
    );
  }

  deleteStudentInfo(id: number): Observable<any> {
    return this.http.delete(
      environments.APIENDPOINT + constants.ENDPOINTS.STUDENT + id
    );
  }

  externalData(): Observable<DummyDataModel[]> {
    return this.http.get<DummyDataModel[]>(
      environments.APIENDPOINT + constants.ENDPOINTS.EXTERNAL_DATA
    );
  }

  showDummyDataPopup() {
    this.isPopupVisibleForDummyData = true;
  }

  closeDummyDataPopup() {
    this.isPopupVisibleForDummyData = false;
  }
  toggleArrayMethodPopup() {
    if (this.isPopupVisibleForArrayMethods) {
      this.isPopupVisibleForArrayMethods = false;
    } else {
      this.isPopupVisibleForArrayMethods = true;
    }
  }

  closeArrayMethodPopup() {
    this.isPopupVisibleForArrayMethods = false;
  }

}
