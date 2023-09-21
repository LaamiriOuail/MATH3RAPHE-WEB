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
  private defaultLanguage = 'en'; // Set a default language
  private supportedLanguages = ['fr', 'ar', 'en']; // Define supported languages
  /**
   * Constructs the HeaderComponent.
   * @param darkModeS - An instance of DarkModeService for handling dark mode.
   * @param translate - An instance of TranslateService for language translation.
   */
  

  constructor(private translate: TranslateService,protected darkModeS:DarkModeService) {}

  ngOnInit(): void {
    // Try to get the language from local storage
    const localLanguage = localStorage.getItem('language');
    for(let language of this.supportedLanguages){
       this.translate.setDefaultLang(language);
    }
    if (localLanguage && this.supportedLanguages.includes(localLanguage)) {
      // If the local language is valid, set it
      this.lang = localLanguage;
    } else {
      // If not found or invalid, use the default language
      this.lang = this.defaultLanguage;
    }
    
    // Set the chosen language using TranslateService
    this.translate.use(this.lang);
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
  changeLanguage():void {
    this.translate.use(this.lang);
    localStorage.setItem('language',this.lang);
  }
}
