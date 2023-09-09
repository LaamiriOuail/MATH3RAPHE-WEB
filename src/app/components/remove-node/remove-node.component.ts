import { Component,Input } from '@angular/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

@Component({
  selector: 'app-remove-node',
  templateUrl: './remove-node.component.html',
  styleUrls: ['./remove-node.component.css']
})
export class RemoveNodeComponent {
  @Input() container:any;
  nodeId:string=""
  constructor(protected grapheS:GrapheService){
    
  }
}
