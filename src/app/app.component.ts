import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DarkModeService } from './Services/dark-mode.service';

/**
 * The root component of the application.
 * @Component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   * The title of the application.
   * @type {string}
   */
  title = 'pfa';

  /**
   * Creates an instance of AppComponent.
   * @param {TranslateService} translate - The translation service.
   * @param {DarkModeService} darkModeS - The dark mode service.
   */
  constructor(private translate: TranslateService, protected darkModeS: DarkModeService) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    // Set the default language to "en"
    // this.translate.setDefaultLang("en");
    
    // Use the following lines to switch between languages
    this.translate.use("fr"); // French
    this.translate.use("ar"); // Arabic
    this.translate.use("en"); // English
  }
}
