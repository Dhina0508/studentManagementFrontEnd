import { Component, Input, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { StudentInfoModel } from 'src/app/models/studentInfo';
import { StudentServiceFlowService } from 'src/app/services/student-service-flow.service';

@Component({
  selector: 'app-array-method',
  templateUrl: './array-method.component.html',
  styleUrls: ['./array-method.component.scss'],
})
export class ArrayMethodComponent implements OnInit {
  closeIcon = faClose;
  constructor(public studentService: StudentServiceFlowService) {}

  @Input() studentInfo: StudentInfoModel[] = [];

  ngOnInit(): void {
    this.spreadOperations();
  }
  arrayMethods() {
    this.forEachMethod();
    this.mapMethod();
    this.filterMethod();
    this.findMethod();
    this.reduceMethod();
    this.someMethod();
    this.everyMethod();
  }
  closePopup() {
    this.studentService.closeArrayMethodPopup();
  }

  forEachMethod() {
    this.studentInfo.forEach((student) =>
      console.log('Using ForEach Method: ' + student.fullName)
    );
  }

  mapMethod() {
    let student = this.studentInfo.map(
      (studentInfo) => studentInfo.email + ' ' + studentInfo.id
    );
    console.log('Using Map Method: ' + student);
  }

  filterMethod() {
    let students = this.studentInfo.filter((num) => num.id < 15);
    console.log('Using Filter Method: ', students);
  }

  findMethod() {
    let student = this.studentInfo.find((stud) => stud.id === 27);
    console.log('Using Find Method: ', student);
  }
  reduceMethod() {
    let sum = this.studentInfo.reduce((tot, student) => {
      return tot + student.id;
    }, 0);
    console.log('Using Reduce Method: ', sum);
  }

  someMethod() {
    let hasEvenNumber = this.studentInfo.some((num) => num.id % 2 === 0);
    console.log('Using Some Method: ', hasEvenNumber);
  }

  everyMethod() {
    let hasEvenNumber = this.studentInfo.every((num) => num.id % 2 === 0);
    console.log('Using Every Method: ', hasEvenNumber);
  }

  spreadOperations() {
    let clonedArray = [...this.studentInfo];
    console.log('Using Spread Operations: ', clonedArray);
  }
}
