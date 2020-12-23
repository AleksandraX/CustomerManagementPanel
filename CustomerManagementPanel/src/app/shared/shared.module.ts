import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
    declarations: [							
        PaginationComponent
     ],
    imports: [
      CommonModule,
      FormsModule,
    ],
    providers: [

    ],
    exports: [
        PaginationComponent
    ]
  })
  export class SharedModule { }