import { Component, Input } from '@angular/core';
import { GrapheService } from 'src/app/Services/graphe.service';

/**
 * Angular component representing the form for changing the ID of a node.
 */
@Component({
  selector: 'app-change-id-node',
  templateUrl: './change-id-node.component.html',
  styleUrls: ['./change-id-node.component.css']
})
export class ChangeIdNodeComponent {
  /**
   * Input property representing the last used node ID.
   */
  @Input() lastNodeId: any;

  /**
   * Input property to receive data from a parent component.
   */
  @Input() container: any;

  /**
   * The new node ID input field.
   */
  newNodeId: string = "";

  /**
   * Initializes a new instance of the ChangeIdNodeComponent class.
   *
   * @param {GrapheService} grapheS - The GrapheService instance.
   */
  constructor(protected grapheS: GrapheService) {}
}
