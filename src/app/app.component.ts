import { Component} from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent{
  showSpinner: boolean = false;
  constructor(public loadingService: LoadingService) {}
  title = 'studentManagement';
 

  ngOnInit(): void {
    this.loadingService.isLoading().subscribe((value) => {
      this.showSpinner = value;
    });
  }
 
      
}
