import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@modules/dialog/dialog.module';
import { FilterModule } from '@modules/filter/filter.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    FilterModule,
    FormsModule,
    DialogModule,
  ],
})
export class CategoryModule {
}
