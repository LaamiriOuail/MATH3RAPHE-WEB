import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

@Component({
  selector: 'app-change-id-node',
  templateUrl: './change-id-node.component.html',
  styleUrls: ['./change-id-node.component.css']
})
export class ChangeIdNodeComponent {
  @Input() lastNodeId:any;
  @Input() container:any;
  newNodeId:string="";
  constructor(protected grapheS:GrapheService){

  }

}
