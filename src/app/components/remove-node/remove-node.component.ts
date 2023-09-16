import { Component, Input } from '@angular/core';
import { GrapheService } from 'src/app/Services/graphe.service';

/**
 * Angular component for removing a node from the graph.
 */
@Component({
  selector: 'app-remove-node',
  templateUrl: './remove-node.component.html',
  styleUrls: ['./remove-node.component.css']
})
export class RemoveNodeComponent {
  /**
   * Input property to receive data from a parent component related to the node removal.
   * @input container - An object containing data related to the node removal.
   */
  @Input() container: any;

  /**
   * The ID of the node to be removed from the graph.
   */
  nodeId: string = "";

  /**
   * Initializes a new instance of the RemoveNodeComponent class.
   * @param grapheS - An instance of the GrapheService for graph-related operations.
   */
  constructor(protected grapheS: GrapheService) {

  }
}
