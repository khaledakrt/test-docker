import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

const routes: Routes = [
  { path: '', component: RegisterComponent } // Default route for this module
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
