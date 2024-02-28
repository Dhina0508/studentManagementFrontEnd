import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentServiceFlowService } from 'src/app/services/student-service-flow.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  user={
    username:'',
    password:'',
    first_name:''
  }


  constructor(private router : Router,private studentservice:StudentServiceFlowService){}


onSubmit() {
  if (this.form.valid) {
    
  
   this.studentservice.onRegister(this.user).subscribe((res:any)=>{
    
    if(res.status==200){
      alert('Account Registered Successfully')
      this.router.navigate(['login'])
    }else{
      alert(res.errors.username)
    }
   },(error)=>{
    alert("error "+error.message)
   })
  }else{
    alert("Please provide valid details")
  }
}


login() {
  this.router.navigate(['login'])
}






form:FormGroup =new FormGroup({
  email:new FormControl("",[Validators.required,this.customeEmailValidator]),
  password:new FormControl('', [Validators.required,this.customPasswordValidator])
})

getEmailError(control:any) : string {
    if(control.errors?.required && control.touched)
      return 'This field is required!';
    else if(control.errors?.emailError && control.touched)
      return 'Please enter a valid email';
    else return '';
}

customeEmailValidator(control:AbstractControl) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    const value = control.value;
    if(!pattern.test(value) && control.touched) 
      return {
        emailError:true
      }
    else return null;
}

getPasswordError(control:any) : string {
  if(control.errors?.required && control.touched)
    return 'This field is required!';
    else if (control.errors?.passwordError && control.touched) 
      return 'Please enter a valid password';
  else return '';
}


customPasswordValidator(control: AbstractControl) {
  const pattern =/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  const value = control.value;
  if (!pattern.test(value) &&  control.touched) {
    return { passwordError: true };
  } else {
    return null;
  }
}


}
