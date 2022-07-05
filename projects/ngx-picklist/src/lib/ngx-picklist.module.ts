import { NgModule } from '@angular/core';
import { NgxPicklistComponent } from './ngx-picklist.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    NgxPicklistComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    NgxPicklistComponent
  ]
})
export class NgxPicklistModule { }
