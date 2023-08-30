import { Component,Input } from '@angular/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent {
  nodeId:any;
  inputTouched:boolean = false;
  @Input() container:any;
  constructor(protected grapheS:GrapheService){

  }
  onInputFocus(){
    this.inputTouched=true;
  }
}
