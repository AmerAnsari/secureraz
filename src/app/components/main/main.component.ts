import { Component } from '@angular/core';
import { Link } from './shared/interfaces/link';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  readonly links: Link[] = [
    { label: 'Accounts', path: './accounts', icon: 'bi-shield-lock' },
    { label: 'Files', path: './files', icon: 'bi-files-alt' },
  ];
}
