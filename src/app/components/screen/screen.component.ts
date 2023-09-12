import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/Services/dark-mode.service';

/**
 * Angular component for displaying the main screen.
 */
@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent {
  /**
   * Initializes a new instance of the ScreenComponent class.
   *
   * @param {DarkModeService} darkModeS - The DarkModeService instance.
   */
  constructor(protected darkModeS: DarkModeService) {
    
  }
}
