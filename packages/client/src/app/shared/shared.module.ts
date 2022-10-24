import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [
    LoadingSpinnerComponent
  ]
})
export class SharedModule {
}
