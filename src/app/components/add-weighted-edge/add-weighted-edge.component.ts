import { Component, Input, Output,EventEmitter } from '@angular/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

@Component({
  selector: 'app-add-weighted-edge',
  templateUrl: './add-weighted-edge.component.html',
  styleUrls: ['./add-weighted-edge.component.css']
})
export class AddWeightedEdgeComponent {
  @Input() nodeS:any;
  @Input() nodeT:any;
  @Input() container:any;
  @Output() weight: EventEmitter<number> = new EventEmitter<number>();;
  weightForm:any;
  constructor(protected grapheS:GrapheService){
  }
  onWeightFormChange():void{
    this.weight.emit(this.weightForm);
  }
}
