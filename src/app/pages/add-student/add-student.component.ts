import { HttpClient, HttpErrorResponse   } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from 'src/app/constants/constants';
import { environments } from 'src/app/environments/environments';
import { StudentResponseModel } from 'src/app/models/studentInfo';
import { StudentServiceFlowService } from 'src/app/services/student-service-flow.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  student = {
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    graduated: false,
  };
  id: number = 0;

  constructor(
    private studentservice: StudentServiceFlowService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.id = parseInt(id);
      this.loadStudentInfoById(parseInt(id));
    }
  }
  loadStudentInfoById(id: number) {
    this.studentservice.getStudentsInfoById(id).subscribe(
      (res: StudentResponseModel) => {
        this.student = res.data;
      },
      (error) => {
        alert('Error Occured' + JSON.stringify(error.message));
      }
    );
  }
  onSubmit() {
    if (this.id == 0) {
      this.http
        .post(
          environments.APIENDPOINT + constants.ENDPOINTS.STUDENT,
          this.student
        )
        .subscribe(
          (res: any) => {
            if (res.status == 'success') {
              alert('Student added successfully');
              this.router.navigate(['home']);
            }

            this.student = {
              fullName: '',
              email: '',
              mobile: '',
              address: '',
              graduated: false,
            };
          },
          (error: HttpErrorResponse) => {
            alert('Error while adding student: ' + error.error.message.email[0]);
          }
        );
    } else {
      this.http
        .patch(
          environments.APIENDPOINT + constants.ENDPOINTS.STUDENT + this.id,
          this.student
        )
        .subscribe(
          (response) => {
            alert('Student Updated successfully');
            this.router.navigate(['home']);
            this.student = {
              fullName: '',
              email: '',
              mobile: '',
              address: '',
              graduated: false,
            };
          },
          (error) => {
            alert('Error Updating student:' + JSON.stringify(error.message));
            console.error('Error Updating student:', error);
          }
        );
    }
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      this.customEmailValidator,
    ]),
  });

  getError(control: any): string {
    if (control.errors?.required && control.touched)
      return 'This field is required!';
    else if (control.errors?.emailError && control.touched)
      return 'Please enter valid email address!';
    else return '';
  }

  customEmailValidator(control: AbstractControl) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    const value = control.value;
    if (!pattern.test(value) && control.touched)
      return {
        emailError: true,
      };
    else return null;
  }
}
