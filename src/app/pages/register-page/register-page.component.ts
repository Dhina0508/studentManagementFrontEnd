import { Component } from '@angular/core';
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
  if(this.user.username=='' || this.user.password==''||this.user.first_name==''){
    alert("Please Provide all the details");
  }
  else{
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
  }
}

login() {
  this.router.navigate(['login'])
}
}
