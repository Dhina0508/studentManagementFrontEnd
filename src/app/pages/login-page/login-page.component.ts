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
    username:'',
    password:''
  }
  constructor(private router : Router,private studentservice:StudentServiceFlowService){}
onSubmit() {
  if(this.user.username=='' || this.user.password==''){
    alert("Please Provide Email Id and Password");
  }
  else{
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
}


register():void{
  this.router.navigate(['register'])
}

}
