import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

/**
 * Angular component representing the form for adding a weighted edge.
 */
@Component({
  selector: 'app-add-weighted-edge',
  templateUrl: './add-weighted-edge.component.html',
  styleUrls: ['./add-weighted-edge.component.css']
})
export class AddWeightedEdgeComponent {
  /**
   * Input property representing the source node for the edge.
   */
  @Input() nodeS: any;

  /**
   * Input property representing the target node for the edge.
   */
  @Input() nodeT: any;

  /**
   * Input property to receive data from a parent component.
   */
  @Input() container: any;

  /**
   * Event emitter for emitting the weight of the edge to the parent component.
   */
  @Output() weight: EventEmitter<number> = new EventEmitter<number>();

  /**
   * The form field for entering the edge weight.
   */
  weightForm: any;

  /**
   * Initializes a new instance of the AddWeightedEdgeComponent class.
   *
   * @param {GrapheService} grapheS - The GrapheService instance.
   */
  constructor(protected grapheS: GrapheService) {}

  /**
   * Event handler for when the weight form changes.
   * Emits the weight value to the parent component using the `weight` EventEmitter.
   */
  onWeightFormChange(): void {
    this.weight.emit(this.weightForm);
  }
}
