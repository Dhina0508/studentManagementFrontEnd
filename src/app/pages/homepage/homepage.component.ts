import { Component, OnInit } from '@angular/core';
import {
  StudentInfoModel,
  StudentResponseModel,
} from 'src/app/models/studentInfo';
import { StudentServiceFlowService } from 'src/app/services/student-service-flow.service';
import { faAdd,faEdit, faTrash,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {



  faAdd = faAdd;
  faEdit = faEdit;
  faTrash = faTrash;
  faLogout=faArrowRightFromBracket;

  studentInfo: StudentInfoModel[] = [];
  constructor(
    private studentservice: StudentServiceFlowService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadAllStudentInfo();
  }

  loadAllStudentInfo() {
    this.studentservice.getAllStudentsInfo().subscribe(
      (res: StudentResponseModel) => {
        this.studentInfo = res.data;
      },
      (error) => {
        alert('Error Occured' + JSON.stringify(error));
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
      this.router.navigate(['login'])
      }
 
}
