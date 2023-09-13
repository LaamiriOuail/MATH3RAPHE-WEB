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
   */
  @Input() container: any;
  @Input() grapheS:any;
  @Input() algoS:any;
  /**
   * Initializes a new instance of the InfoComponent class.
   */
  constructor() {
  }
}
