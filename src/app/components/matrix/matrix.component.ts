import { Component, Input, AfterViewChecked } from '@angular/core';

/**
 * Angular component for displaying a matrix.
 */
@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements AfterViewChecked {
  /**
   * Input property representing the formatted adjacency matrix.
   */
  @Input() adjacencyMatrixFormatted: string = "";

  /**
   * Initializes a new instance of the MatrixComponent class.
   */
  constructor() {}

  /**
   * Angular lifecycle hook called after the view has been checked.
   * This hook is used for rendering MathJax content in the matrix.
   */
  ngAfterViewChecked(): void {
    // Call MathJax rendering here if needed
    // Example: MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }
}
