import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }
  private loading = new BehaviorSubject<boolean>(false);

  showLoading(): void {
    this.loading.next(true);
  }

  hideLoading(): void {
    this.loading.next(false);
  }

  isLoading(){
    return this.loading.asObservable();
  }
}
