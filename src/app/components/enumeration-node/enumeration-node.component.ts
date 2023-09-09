import { Component,Input } from '@angular/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

@Component({
  selector: 'app-enumeration-node',
  templateUrl: './enumeration-node.component.html',
  styleUrls: ['./enumeration-node.component.css']
})
export class EnumerationNodeComponent {
  @Input() container:any;
  constructor(protected grapheS:GrapheService){
    
  }
}
