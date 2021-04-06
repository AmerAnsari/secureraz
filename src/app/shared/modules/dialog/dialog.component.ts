import { Component, Input, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
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
