import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DarkModeService } from 'src/app/AllService/dark-mode.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message:string="";
  constructor(protected darkModeS:DarkModeService){}
 
}
