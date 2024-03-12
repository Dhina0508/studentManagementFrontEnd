import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { DummyDataPageComponent } from './pages/dummy-data-page/dummy-data-page.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginPageComponent
  },
  {
    path:'home',
    component:HomepageComponent
  },
  {
    path:'add_student',
    component:AddStudentComponent
  },
  { path: 'add_student/:id',
   component: AddStudentComponent
  },
  {
    path:'register',
    component:RegisterPageComponent
  },
  {
    path:'dummyData',
    component:DummyDataPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
