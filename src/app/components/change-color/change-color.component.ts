import { Component, Input } from '@angular/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent {
  constructor(protected grapheS:GrapheService){

  }
  color:any;
  bgColor:any;
  fColor:any;//flesh color en cas d'un graphe orienter and change edge color 
  @Input() container:any;
}
