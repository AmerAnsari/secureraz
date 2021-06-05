import { Component } from '@angular/core';
import { FileType } from '@app/shared/enums/file-type';
import { Media } from '@interfaces/media';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-file-modal',
  templateUrl: './file-modal.component.html',
  styleUrls: ['./file-modal.component.scss'],
})
export class FileModalComponent {

  readonly fileType = FileType;

  file: Media;

  constructor(public bsModalRef: BsModalRef) {
  }
}
