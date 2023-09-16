/**
 * HeaderComponent is responsible for the application's header section.
 * It allows users to toggle dark mode and change the application's language.
 */
import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../Services/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /** Stores the selected language ('en', 'fr', 'ar'). */
  lang: string = "";

  /**
   * Constructs the HeaderComponent.
   * @param darkModeS - An instance of DarkModeService for handling dark mode.
   * @param translate - An instance of TranslateService for language translation.
   */
  constructor(protected darkModeS: DarkModeService, private translate: TranslateService) {
  }

  /**
   * Initializes the component. Sets the default language to 'en'.
   */
  ngOnInit(): void {
    this.lang = "en";
  }

  /**
   * Toggles the application's dark mode when the dark mode button is clicked.
   */
  toggleDarkMode(): void {
    this.darkModeS.toggleDarkMode();
  }

  /**
   * Changes the application's language based on the user's selection.
   * @param event - The event containing the selected language.
   */
  changeLanguage(event: any) {
    this.translate.use(event.target.value);
  }
}
