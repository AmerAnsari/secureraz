import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '@core/api/api.service';
import { Utils } from '@classes/utils';
import { Account } from '@interfaces/account';
import { Category } from '@interfaces/category';
import { ReactiveFormData } from '@interfaces/reactive-form-data';
import { GetParams } from '@app/shared/types/get-params';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {

  accounts: Account[];
  form: ReactiveFormData<Account> = {
    form: this.formBuilder.group({
      site: [],
      username: [],
      password: [],
      category: [null],
    }),
    error: {},
    viewMode: true,
  };

  categories: Category[];
  isDialog = false;
  search: string;
  category: number;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /**
     * Watch the params changes.
     */
    this.route.queryParams.subscribe((params: Params): void => {
      if (params.category) {
        this.filterByCategory(params.category);
      }
    });

    // Get categories.
    ApiService.CATEGORY.list().subscribe((data: Category[]): void => {
      this.categories = data;
    });

    // Get accounts.
    this.getAccounts();
  }

  /**
   * Get accounts.
   */
  getAccounts(): void {
    const params: GetParams = {};
    if (this.category) {
      params.category = String(this.category);
    }
    ApiService.ACCOUNT.list(params).subscribe((data: Account[]): void => {
      this.accounts = data;
    });
  }

  /**
   * Filter the accounts by selected category.
   */
  filterByCategory(category: number): void {
    if (this.category) {
      this.category = null;
      this.router.navigate(['.'], {
        relativeTo: this.route,
      });
    } else {
      this.category = category;
    }
    this.getAccounts();
  }

  /**
   * Open new form dialog.
   */
  add(): void {
    this.form.viewMode = false;
    Utils.ResetForm(this.form);
    this.isDialog = true;
  }

  /**
   * Patch data into selected account and open it in dialog.
   */
  select(account: Account): void {
    this.form.id = account.id;
    this.form.data = account;
    Utils.patchForm(this.form, account);
    this.form.viewMode = true;
    this.isDialog = true;
  }

  /**
   * Submit the account.
   */
  submit(): void {
    this.form.loading = true;
    let observable = ApiService.ACCOUNT.create(this.form.form.value);
    // Is edit?
    if (this.form.id) {
      observable = ApiService.ACCOUNT.update(this.form.id, this.form.form.value);
    }
    // API call.
    observable.subscribe((data: Account): void => {
      this.form.loading = false;
      if (this.form.id) {
        const account = this.accounts.find((item: Account): boolean => item.id === data.id);
        Object.assign(account, data);
      }
      if (!this.form.id) {
        this.accounts.push(data);
      }
      this.form.error = {};
      this.form.id = data.id;
      this.form.data = data;
      Utils.patchForm(this.form, data);
      this.form.viewMode = true;
    }, (error: HttpErrorResponse): void => {
      this.form.error = error.error;
      this.form.loading = false;
    });
  }
}
