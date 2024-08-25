import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module'; // Import RegisterRoutingModule

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RegisterRoutingModule // Import RegisterRoutingModule
  ]
})
export class RegisterModule { }
