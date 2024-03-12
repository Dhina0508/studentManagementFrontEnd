import { Component, OnInit } from '@angular/core';
import {
  StudentInfoModel,
} from 'src/app/models/studentInfo';
import { StudentServiceFlowService } from 'src/app/services/student-service-flow.service';
import { faAdd,faEdit, faTrash,faArrowRightFromBracket ,faArrowRight,faArrowLeft,  faSort, faSearch, faMessage, faSortAlphaAsc} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

currentPageNumber:number=1;
counts:any=[5,10,20,50]
dataPerPage:number=this.counts[0]
totalpages:number=0;
totalData:number=0;
id:number=0;
imageUrl:any;
isSortOpt:boolean=false;

  faAdd = faAdd;
  faEdit = faEdit;
  faTrash = faTrash;
  faLogout=faArrowRightFromBracket;
  rightArrow=faArrowRight;
  leftArrow=faArrowLeft;
  comment=faMessage;
  search=faSearch;
  sort=faSortAlphaAsc;

  
  studentInfo: StudentInfoModel[] = [];
  studentDetails: StudentInfoModel[] = [];

  public studentData=new Subject<StudentInfoModel[]>();
  constructor(
    public studentservice: StudentServiceFlowService,
    private router: Router,public loadingService:LoadingService,
  ) {}


  ngOnInit(): void {
    this.loadAllStudentInfo();
    this.studentData.subscribe((res:StudentInfoModel[])=>{
      this.studentDetails=res;
     })
  }

  loadAllStudentInfo() {
    this.studentservice.getAllStudentsInfo(this.dataPerPage,this.currentPageNumber).subscribe(
      (res: any) => {
        this.studentInfo = res.data;
        this.totalData=res.total_data;
        this.imageUrl=res.data['image']
        this.totalpages=this.getTotalPages();
        this.getAvailableData();
        console.log(res.data)
        
      },
      (error) => {
        alert('Error Occured' + JSON.stringify(error.message));
        console.log(error.message);
        this.router.navigate(['login'])
        
      }
    );
  }

  getAvailableData() {
   this.studentData.next(this.studentInfo);
  }



  deleteStudent(id:number){
    this.studentservice.deleteStudentInfo(id).subscribe((res:any)=>{
  console.log("deleted");
  alert("Student Deleted Successfully");
  this.loadAllStudentInfo();
    }, (error) => {
      alert('Error Occured' + JSON.stringify(error));
    })  
  }





    logOut() {
      localStorage.clear()
      this.router.navigate(['login'])
      }


      selectCount(event: Event):void {
        let target=event.target as HTMLSelectElement;
        this.dataPerPage=parseInt(target.value);
        this.currentPageNumber=1;
        this.loadAllStudentInfo();
        
        }

        nextPage():void{
          if(this.currentPageNumber<this.totalpages){
this.currentPageNumber++;
this.loadAllStudentInfo();
          }
        }

        previousPage():void{
          if(this.currentPageNumber>1){
this.currentPageNumber--;
this.loadAllStudentInfo();
          }
        }

        getTotalPages():number{
            if(this.studentInfo){
              return Math.ceil(this.totalData/this.dataPerPage)
            }
            return 0;
        }   
        

        showDummyDataPopup() {
          this.studentservice.showDummyDataPopup();   
        }
      
        closeDummyDataPopup() {
          this.studentservice.closeDummyDataPopup();
          this.loadAllStudentInfo();
        }

        editStudent(id:number){
            this.id=id
            this.showDummyDataPopup();
          }

          resetId(id:number){
            this.id=id

          }

          
  // basePath: string = 'http://127.0.0.1:8000/media/images/';

//   getImageUrl(): string {
//    const fileName = this.extractFileName(this.imageUrl);
//    const encodedFileName = encodeURIComponent(fileName);
//    console.log(this.basePath + encodedFileName);
//    return this.basePath + encodedFileName;
//  }

//  private extractFileName(filePath: any): string {
//    return filePath.split('\\').pop();
//  }


 goToDummyData(){
  this.router.navigate(['dummyData'])
 }

showArraymethodPopup() {
  console.log("show array methods")
  this.studentservice.toggleArrayMethodPopup();   
}

closeArrayMethodPopup() {
  this.studentservice.closeArrayMethodPopup();
}

toggleButton(){
  this.isSortOpt=!this.isSortOpt;
}
count:number=1
sortName(){
  this.count=this.count+1;
  if(this.count%2==0){
    this.studentDetails.sort((a, b) => {
      return a.fullName.localeCompare(b.fullName);
    });
  }else{
    this.studentDetails.sort((a, b) => {
      return b.fullName.localeCompare(a.fullName);
    });
  }
  this.toggleButton();
}


click:number=1
sortEmail(){
  this.click=this.click+1;
  if(this.click%2==0){
    this.studentDetails.sort((a, b) => {
      return a.email.localeCompare(b.email);
    });
  }else{
    this.studentDetails.sort((a, b) => {
      return b.email.localeCompare(a.email);
    });
  }
  this.toggleButton();
  
}
}
