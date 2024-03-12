import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environments } from 'src/app/environments/environments';
import { StudentResponseModel } from 'src/app/models/studentInfo';
import { StudentServiceFlowService } from 'src/app/services/student-service-flow.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { __values } from 'tslib';
import { LoadingService } from 'src/app/services/loading.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  localHost: string = environments.LOCALHOST;
  selectedFile: any;

  closeIcon = faClose;
  @Input() studentId: number = 0;
  @Output() reloadStudentInfo = new EventEmitter<any>();
  @Output() resestId = new EventEmitter<number>();
 private unsubscribe$ = new Subject<void>();

  constructor(
    public studentservice: StudentServiceFlowService,

    public loadingService: LoadingService
  ) {}
  student = {
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    graduated: false,
    image: null,
  };

  ngOnInit(): void {
    if (this.studentId != 0) {
      this.loadStudentInfoById(this.studentId);
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
    const formData = new FormData();
    for (const [key, value] of Object.entries(this.student)) {
      if (key === 'image' && this.selectedFile) {
        formData.append(key, this.selectedFile);
      } else if (typeof value === 'boolean') {
        formData.append(key, value ? 'true' : 'false');
      } else {
        formData.append(key, value || '');
      }
    }

    if (this.studentId == 0) {
      this.studentservice
        .addStudentInfo(formData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (res: any) => {
            if (res.status == 'success') {
              alert('Student added successfully');
              console.log(res.data);
              this.student = {
                fullName: '',
                email: '',
                mobile: '',
                address: '',
                graduated: false,
                image: null,
              };
              this.reloadStudentInfo.emit();
              this.studentservice.closeDummyDataPopup();
            }
          },
          (error: HttpErrorResponse) => {
            alert(
              'Error while adding student: ' + error.error.message.email[0]
            );
          }
        );
    } else {
      this.studentservice
        .editStudentInfo(formData, this.studentId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (response) => {
            alert('Student Updated successfully');

            this.student = {
              fullName: '',
              email: '',
              mobile: '',
              address: '',
              graduated: false,
              image: null,
            };
            this.reloadStudentInfo.emit();
            this.resestId.emit(0);
            this.studentservice.closeDummyDataPopup();
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

  closePopup() {
    this.studentservice.closeDummyDataPopup();
    this.resestId.emit(0);
  }

  selectedImageUrl: any;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.selectedImageUrl = URL.createObjectURL(this.selectedFile);
  }
  onCancel() {
    this.unsubscribe$.next();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
