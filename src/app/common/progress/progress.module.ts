import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress.component';
import { ProgressbarModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ProgressbarModule.forRoot()
  ],
  declarations: [ProgressComponent],
  exports:[ProgressComponent]
})
export class ProgressModule { }