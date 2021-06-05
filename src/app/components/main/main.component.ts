import { Component } from '@angular/core';
import { Link } from '@app/components/main/shared/interfaces/link';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  readonly links: Link[] = [
    { label: 'Categories', path: './category', icon: 'bi-folder' },
    { label: 'Accounts', path: './accounts', icon: 'bi-shield-lock' },
    { label: 'Media', path: './media', icon: 'bi-files-alt' },
  ];
}
