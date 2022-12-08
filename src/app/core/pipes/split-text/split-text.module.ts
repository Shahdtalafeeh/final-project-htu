import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitTextPipe } from './split-text.pipe';



@NgModule({
  declarations: [
    SplitTextPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SplitTextPipe
  ]
})
export class SplitTextModule { }
