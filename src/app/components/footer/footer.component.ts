import { Component } from '@angular/core';
import { DarkModeService } from '../../Services/dark-mode.service';

/**
 * Component for the footer.
 * @Component
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  /**
   * Creates an instance of FooterComponent.
   * @param {DarkModeService} darkModeS - The dark mode service.
   */
  constructor(protected darkModeS: DarkModeService) {
  }
}
