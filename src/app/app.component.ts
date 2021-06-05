import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Crud } from '@models/crud';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'secureraz';

  constructor(private http: HttpClient) {
    Crud.initiate(http, environment.api);
  }
}
