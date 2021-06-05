import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@core/api/api.service';
import { Utils } from '@classes/utils';
import { Category } from '@interfaces/category';
import { ReactiveFormData } from '@interfaces/reactive-form-data';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  form: ReactiveFormData<Category> = {
    form: this.formBuilder.group({
      name: [],
    }),
    error: {},
    viewMode: true,
  };

  search: string;
  isDialog = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // Get files.
    ApiService.CATEGORY.list().subscribe((data: Category[]): void => {
      this.categories = data;
    });
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
   * Patch data into selected category and open it in dialog.
   */
  select(category: Category): void {
    this.form.id = category.id;
    this.form.data = category;
    Utils.patchForm(this.form, category);
    this.form.viewMode = true;
    this.isDialog = true;
  }

  /**
   * Redirect to the target page and filter them by selected category.
   */
  goToPage(category: Category, page: string): void {
    this.router.navigate([`./main/${page}`], {
      queryParams: {
        category: category.id,
      },
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Submit the category.
   */
  submit(): void {
    this.form.loading = true;
    let observable = ApiService.CATEGORY.create(this.form.form.value);
    // Is edit?
    if (this.form.id) {
      observable = ApiService.CATEGORY.update(this.form.id, this.form.form.value);
    }
    // API call.
    observable.subscribe((data: Category): void => {
      this.form.loading = false;
      if (this.form.id) {
        const category = this.categories.find((item: Category): boolean => item.id === data.id);
        Object.assign(category, data);
      }
      if (!this.form.id) {
        this.categories.push(data);
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
