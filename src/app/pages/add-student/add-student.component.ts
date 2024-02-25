import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from 'src/app/constants/constants';
import { environments } from 'src/app/environments/environments';
import { StudentResponseModel } from 'src/app/models/studentInfo';
import { StudentServiceFlowService } from 'src/app/services/student-service-flow.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit{
  student = {
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    graduated: false
  };
id:number=0;


  constructor( private studentservice: StudentServiceFlowService,private http: HttpClient,private router:Router,private route:ActivatedRoute) {}
ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if(id!=null){
    this.id=parseInt(id)
  this.loadStudentInfoById(parseInt(id));
  }

}
loadStudentInfoById(id:number) {
  this.studentservice.getStudentsInfoById(id).subscribe(
    (res: StudentResponseModel) => {
      this.student = res.data;
    },
    (error) => {
      alert('Error Occured' + JSON.stringify(error));
    }
  );
}
  onSubmit() {
    if(this.id==0){
    this.http.post(environments.APIENDPOINT+constants.ENDPOINTS.STUDENT, this.student)
      .subscribe(response => {
      alert('Student added successfully');
      this.router.navigate(['home']);

       
        this.student = { fullName: '', email: '', mobile: '', address: '', graduated: false };
      }, error => {
        console.error('Error adding student:', error);
      });
    }else{
      this.http.patch(environments.APIENDPOINT+constants.ENDPOINTS.STUDENT+this.id, this.student)
      .subscribe(response => {
      alert('Student Updated successfully');
      this.router.navigate(['home']);
        this.student = { fullName: '', email: '', mobile: '', address: '', graduated: false };
      }, error => {
        console.error('Error Updating student:', error);
      });

    }
  }
}
