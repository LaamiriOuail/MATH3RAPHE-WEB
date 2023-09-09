import { Component, Input } from '@angular/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

@Component({
  selector: 'app-remove-edge',
  templateUrl: './remove-edge.component.html',
  styleUrls: ['./remove-edge.component.css']
})
export class RemoveEdgeComponent {
  sourceId: string="";
  targetId: string="";
  @Input() container:any;
  constructor(protected grapheS:GrapheService){

  }
}
