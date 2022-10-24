import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, MaterialModule]
})
export class UserModule {}
