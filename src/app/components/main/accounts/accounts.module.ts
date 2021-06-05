import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from '@modules/dialog/dialog.module';
import { FilterModule } from '@modules/filter/filter.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';


@NgModule({
  declarations: [AccountsComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    DialogModule,
    ReactiveFormsModule,
    FilterModule,
    FormsModule,
  ],
})
export class AccountsModule {
}
