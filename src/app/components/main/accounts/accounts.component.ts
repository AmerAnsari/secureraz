import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { Account } from 'src/app/shared/interfaces/account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts: Account[];

  constructor() { }

  ngOnInit(): void {
    ApiService.ACCOUNT.list().subscribe((data: Account[]): void => {
      this.accounts = data;
    });
  }

}
