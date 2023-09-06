import { Component, Input } from '@angular/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

/**
 * Angular component representing the color change form.
 */
@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent {
  /**
   * Input property to receive data from a parent component.
   */
  @Input() container: any;

  /**
   * The color input field for changing node or edge colors.
   */
  color: any;

  /**
   * The background color input field for changing node or edge background colors.
   */
  bgColor: any;

  /**
   * The flesh color input field for changing edge colors in case of a directed graph.
   */
  fColor: any;

  /**
   * Initializes a new instance of the ChangeColorComponent class.
   *
   * @param {GrapheService} grapheS - The GrapheService instance.
   */
  constructor(protected grapheS: GrapheService) {}
}
