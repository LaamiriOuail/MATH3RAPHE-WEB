import { Component, Input } from '@angular/core';
import { GrapheService } from 'src/app/Services/graphe.service';

/**
 * Angular component for removing an edge from the graph.
 */
@Component({
  selector: 'app-remove-edge',
  templateUrl: './remove-edge.component.html',
  styleUrls: ['./remove-edge.component.css']
})
export class RemoveEdgeComponent {
  /**
   * Input property to receive data from a parent component related to the edge removal.
   * @input container - An object containing data related to the edge removal.
   */
  @Input() container: any;

  /**
   * The ID of the source node of the edge to be removed.
   */
  sourceId: string = "";

  /**
   * The ID of the target node of the edge to be removed.
   */
  targetId: string = "";

  /**
   * Initializes a new instance of the RemoveEdgeComponent class.
   * @param grapheS - An instance of the GrapheService for graph-related operations.
   */
  constructor(protected grapheS: GrapheService) {

  }
}
