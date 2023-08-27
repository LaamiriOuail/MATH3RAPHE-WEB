import { Component } from '@angular/core';
import { GrapheService } from '../AllService/graphe.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactVar:number=0;
  constructor(protected grapheS:GrapheService){
  }
}
