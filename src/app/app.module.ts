import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddStudentComponent } from './pages/add-student/add-student.component'
import { CustomInterceptor } from './services/custom.interceptor';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentServiceFlowService } from './services/student-service-flow.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomepageComponent,
    AddStudentComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:CustomInterceptor,
      multi:true
    },
    StudentServiceFlowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
