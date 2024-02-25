import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceFlowService } from 'src/app/services/student-service-flow.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  user={
    email:'',
    password:''
  }
  constructor(private router : Router,private studentservice:StudentServiceFlowService){}
onSubmit() {
  if(this.user.email=="admin@123.in" && this.user.password=="admin@123"){
  this.router.navigate(['home'])
  }
  else if(this.user.email=='' || this.user.password==''){
    alert("Please Provide Email Id and Password");
  }
  else{
   this.studentservice.onLogin(this.user).subscribe((res:any)=>{
    
    if(res.status==true){
      localStorage.setItem('token',res.token);
      this.router.navigate(['home'])
    }else{
      alert(res.detail)
    }
   },(error)=>{
    alert("error "+error.message)
   })
  }
}


register():void{
  this.router.navigate(['register'])
}

}
