import { Injectable } from '@angular/core';

/**
 * Service for managing dark mode settings.
 */
@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  /**
   * Initializes a new instance of the DarkModeService class.
   */
  constructor(){}
   /**
   * Indicates whether dark mode is currently enabled.
   *
   * @type {boolean}
   */
   isDarkMode:boolean = localStorage.getItem('darkMode') === 'true';
  /**
   * Toggles the dark mode setting. If dark mode is currently enabled, it will be disabled, and vice versa.
   * Updates the `isDarkMode` property and stores the new state in local storage.
   */
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
}
