import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DarkModeService } from './Services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pfa';
  constructor(private translate: TranslateService,protected darkModeS:DarkModeService) {
  }
  ngOnInit(): void {
    this.translate.setDefaultLang("en");
    // this.translate.use("fr");
    // this.translate.use("en");
    // this.translate.use(localStorage.getItem('language')??"en");
  }
}
