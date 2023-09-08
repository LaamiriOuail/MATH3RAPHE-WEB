import { Component, Input, ElementRef } from '@angular/core';
import { DarkModeService } from 'src/app/AllService/dark-mode.service';
import { GrapheService } from 'src/app/AllService/graphe.service';

/**
 * Angular component for displaying a matrix.
 */
@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent {
  /**
   * Initializes a new instance of the MatrixComponent class.
   */
  constructor(private el:ElementRef,protected grapheS:GrapheService,protected darkModeS:DarkModeService) {}
  
}
