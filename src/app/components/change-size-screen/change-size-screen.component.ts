import { Component,Input } from '@angular/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

@Component({
  selector: 'app-change-size-screen',
  templateUrl: './change-size-screen.component.html',
  styleUrls: ['./change-size-screen.component.css']
})
export class ChangeSizeScreenComponent {
  constructor(protected grapheS:GrapheService){

  }
  @Input() container:any;
  height:any="400";
}
