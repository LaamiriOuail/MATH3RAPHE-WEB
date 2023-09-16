import { Component, Input } from '@angular/core';

/**
 * Angular component for displaying information about the graph and algorithms.
 */
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  /**
   * Input property to receive data from a parent component related to the graph.
   * @input container - An object containing data related to the graph.
   */
  @Input() container: any;

  /**
   * Input property to receive the GrapheService instance from a parent component.
   * @input grapheS - An instance of the GrapheService for graph-related operations.
   */
  @Input() grapheS: any;

  /**
   * Input property to receive the AlgoService instance from a parent component.
   * @input algoS - An instance of the AlgoService for algorithm-related operations.
   */
  @Input() algoS: any;

  /**
   * Initializes a new instance of the InfoComponent class.
   */
  constructor() {
  }
}
