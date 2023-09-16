import { Component, Input } from '@angular/core';
import { GrapheService } from 'src/app/Services/graphe.service';

/**
 * Component for enumerating nodes.
 * @Component
 */
@Component({
  selector: 'app-enumeration-node',
  templateUrl: './enumeration-node.component.html',
  styleUrls: ['./enumeration-node.component.css']
})
export class EnumerationNodeComponent {
  /**
   * Input property to receive a container.
   * @Input
   * @type {any}
   */
  @Input() container: any;

  /**
   * Creates an instance of EnumerationNodeComponent.
   * @param {GrapheService} grapheS - The graph service.
   */
  constructor(protected grapheS: GrapheService) {
  }
}
