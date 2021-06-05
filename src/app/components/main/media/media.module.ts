import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media.component';
import { DialogModule } from '@modules/dialog/dialog.module';
import { FilterModule } from '@modules/filter/filter.module';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [MediaComponent],
  imports: [
    CommonModule,
    MediaRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    FilterModule,
    DialogModule,
    ReactiveFormsModule,
  ],
})
export class MediaModule {
}
