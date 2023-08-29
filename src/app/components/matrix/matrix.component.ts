import { Component, Input, AfterViewChecked } from '@angular/core';
// import { renderMath } from './mathjax-config';
declare var MathJax: any;

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent {
  @Input() adjacencyMatrixFormatted:string="";
  constructor(){}
}
