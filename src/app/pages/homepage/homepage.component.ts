import { Component, OnInit } from '@angular/core';
import {
  StudentInfoModel,
  StudentResponseModel,
} from 'src/app/models/studentInfo';
import { StudentServiceFlowService } from 'src/app/services/student-service-flow.service';
import { faAdd,faEdit, faTrash,faArrowRightFromBracket ,faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


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

  faAdd = faAdd;
  faEdit = faEdit;
  faTrash = faTrash;
  faLogout=faArrowRightFromBracket;
  rightArrow=faArrowRight;
  leftArrow=faArrowLeft;
  
  studentInfo: StudentInfoModel[] = [];
  constructor(
    private studentservice: StudentServiceFlowService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadAllStudentInfo();
  }



  loadAllStudentInfo() {
    this.studentservice.getAllStudentsInfo(this.dataPerPage,this.currentPageNumber).subscribe(
      (res: any) => {
        console.log( res.data);
        console.log(res.total_data);
        
        
        this.studentInfo = res.data;
        this.totalData=res.total_data;
        this.totalpages=this.getTotalPages();
        
      
      },
      (error) => {
        alert('Error Occured' + JSON.stringify(error.message));
        console.log(error.message);
        
      }
    );
  }



  addStudent(): void {
    this.router.navigate(['add_student']);
  }



  deleteStudent(id:number){
    this.studentservice.deleteStudentInfo(id).subscribe((res:any)=>{
  console.log("deleted");
  alert("Student Deleted Successfully");
  window.location.reload();
    }, (error) => {
      alert('Error Occured' + JSON.stringify(error));
    })  
  }


  editStudent(id: number) {
    this.router.navigate(['add_student', id]);
    }



    logOut() {
      localStorage.clear()
      this.router.navigate(['login'])
      }


      selectCount(event: Event):void {
        let target=event.target as HTMLSelectElement;
        this.dataPerPage=parseInt(target.value);
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
 
}
