import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentServiceFlowService } from 'src/app/services/student-service-flow.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  user={
    username:'',
    password:''
  }
  constructor(private router : Router,private studentservice:StudentServiceFlowService){}
onSubmit() {
  if (this.form.valid) {
   this.studentservice.onLogin(this.user).subscribe((res:any)=>{
    
    if(res.status==200){
      localStorage.setItem('token',res.access_token);
      localStorage.setItem('refresh_token',res.refresh_token)
      this.router.navigate(['home'])
    }else{  
      alert(res.message)
    }
   },(error)=>{
    alert("error "+error.message)
   })
  }
  else{
    alert("Please provide valid details")
  }
}


register():void{
  this.router.navigate(['register'])
}




form:FormGroup =new FormGroup({
  email:new FormControl("",[Validators.required,this.customeEmailValidator]),
 
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



}
