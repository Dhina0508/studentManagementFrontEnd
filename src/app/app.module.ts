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
import { CustomInterceptor } from './interceptor/custom.interceptor';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DummyDataPageComponent } from './pages/dummy-data-page/dummy-data-page.component';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArrayMethodComponent } from './pages/array-method/array-method.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomepageComponent,
    AddStudentComponent,
    RegisterPageComponent,
    DummyDataPageComponent,
    ArrayMethodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:CustomInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,
      multi:true
    },
   
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
