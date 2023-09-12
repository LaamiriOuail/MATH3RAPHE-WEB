import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DarkModeService } from './Services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pfa';
  constructor(private translate: TranslateService,protected darkModeS:DarkModeService) {
      translate.setDefaultLang(localStorage.getItem('language') || "en");
  }
}
