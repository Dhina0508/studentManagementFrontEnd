import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DummyDataModel } from 'src/app/models/dummyData';
import { LoadingService } from 'src/app/services/loading.service';
import { StudentServiceFlowService } from 'src/app/services/student-service-flow.service';

@Component({
  selector: 'app-dummy-data-page',
  templateUrl: './dummy-data-page.component.html',
  styleUrls: ['./dummy-data-page.component.scss']
})
export class DummyDataPageComponent implements OnInit{
dummyDataList:DummyDataModel[]=[];


  constructor(
    public studentservice: StudentServiceFlowService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.loadDummyData();
  }

  loadDummyData(){


    this.studentservice.externalData().subscribe(
      (res: DummyDataModel[]) => {
      this.dummyDataList=res;

      },
      (error)=>{
        alert(error.message)

      })
      
  }
}
