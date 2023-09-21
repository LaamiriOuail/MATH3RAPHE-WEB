import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DarkModeService } from './Services/dark-mode.service';
import { Meta } from '@angular/platform-browser';

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
  title = 'math3raphe';

  /**
   * Creates an instance of AppComponent.
   * @param {TranslateService} translate - The translation service.
   * @param {DarkModeService} darkModeS - The dark mode service.
   */
  constructor(private translate: TranslateService, protected darkModeS: DarkModeService,private meta:Meta) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.meta.addTag({keywords:'math3raphe, MATH3RAPHE, Theory de graphe,graph theory, network analysis, data visualization, algorithms, mathematical modeling'});
    this.meta.addTag({desciption:'MATH3RAPHE-WEB est une application web progressive (PWA) basée sur Angular qui apporte la puissance de la théorie des graphes à votre navigateur. Explorez et visualisez des graphes en temps réel, exécutez des algorithmes de la théorie des graphes et créez des représentations visuelles de ces concepts mathématiques passionnants.'});
  }
}
