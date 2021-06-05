import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FileType } from '@app/shared/enums/file-type';
import { Utils } from '@classes/utils';
import { ApiService } from '@core/api/api.service';
import { Category } from '@interfaces/category';
import { Media } from '@interfaces/media';
import { ReactiveFormData } from '@interfaces/reactive-form-data';
import { FileModalComponent } from '@modules/file-modal/file-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {

  readonly fileType = FileType;

  files: Media[];
  form: ReactiveFormData<Media> = {
    form: this.formBuilder.group({
      name: [],
      file: [],
      description: [],
      category: [null],
    }),
    error: {},
    viewMode: true,
  };

  categories: Category[];
  search: string;
  isDialog = false;

  constructor(public utils: Utils,
              private api: ApiService,
              private bsModalService: BsModalService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    ApiService.FILE.list().subscribe((data: Media[]): void => {
      this.files = data;
    });

    // Get categories.
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
   * Patch data into selected file and open it in dialog.
   */
  select(file: Media): void {
    this.form.id = file.uuid;
    this.form.data = file;
    Utils.patchForm(this.form, file);
    this.form.viewMode = true;
    this.isDialog = true;
  }

  /**
   * Open up the file.
   */
  openFile(): void {
    this.bsModalService.show(FileModalComponent, {
      class: 'full',
      initialState: {
        file: this.form.data,
      },
    });
  }

  /**
   * Download the file.
   */
  downloadFile(): void {
    // Todo handle the action.
    this.api.download('this.form.data.file', this.form.data.name, this.form.data.action).subscribe();
  }

  /**
   * Share the file.
   */
  share(): void {
    // Is sharing enabled?
    if (navigator.share) {
      navigator.share({
        text: this.form.data.description,
        url: this.form.data.file,
        title: `Secureraz - Shared ${this.form.data.name}`,
      }).then();
    }
  }

  /**
   * When user tries to upload a file.
   */
  onFileUpload(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files[0];
    this.form.loading = true;
    ApiService.FILE.upload(file).subscribe((data: Media): void => {
      console.log(data);
    });
  }

  /**
   * Submit the account.
   */
  submit(): void {
    this.form.loading = true;
    let observable = ApiService.FILE.create(this.form.form.value);
    // Is edit?
    if (this.form.id) {
      observable = ApiService.FILE.update(this.form.id, this.form.form.value);
    }
    // API call.
    observable.subscribe((data: Media): void => {
      this.form.loading = false;
      if (this.form.id) {
        const file = this.files.find((item: Media): boolean => item.uuid === data.uuid);
        Object.assign(file, data);
      }
      if (!this.form.id) {
        this.files.push(data);
      }
      this.form.error = {};
      this.form.id = data.uuid;
      this.form.data = data;
      Utils.patchForm(this.form, data);
      this.form.viewMode = true;
    }, (error: HttpErrorResponse): void => {
      this.form.error = error.error;
      this.form.loading = false;
    });
  }
}
