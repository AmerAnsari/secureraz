import { trigger, style, transition, animate } from '@angular/animations';
import { Component, Input, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('slideIn', [
      transition('* => void', [
        style({ transform: 'translateY(0)' }),
        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          transform: 'translateY(100%)',
        })),
      ]),
      transition('void => *', [
        style({ transform: 'translateY(100%)' }),
        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          transform: 'translateY(0)',
        })),
      ]),
    ]),
  ],
})
export class DialogComponent implements OnChanges {

  @Input() template: TemplateRef<HTMLElement>;

  @Input() show = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.show?.currentValue) {
      this.show = changes.show.currentValue;
    }
  }
}
