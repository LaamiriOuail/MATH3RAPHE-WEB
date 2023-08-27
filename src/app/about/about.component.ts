import { Component } from '@angular/core';
import { GrapheService } from '../AllService/graphe.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private GraphService:GrapheService){
    
  }
}
