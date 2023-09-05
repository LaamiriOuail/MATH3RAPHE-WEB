import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DarkModeService } from 'src/app/AllService/dark-mode.service';
import { GrapheService } from 'src/app/AllService/graphe.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnChanges {
  @Input() message:string="";
  @Input() container:any;
  constructor(protected darkModeS:DarkModeService,protected grapheS:GrapheService){}
  ngOnChanges(changes: SimpleChanges): void {
    this.OnMessageLengthChange();
  }
  OnMessageLengthChange():void {
    const msgBox=this.container.el.nativeElement.querySelector('#msgBox');
    const msgBoxC=this.container.el.nativeElement.querySelector('.msgBoxC');
    const height = 50; 
    if(this.message.length>103){
      msgBoxC.style.height=height* (this.message.length/103+0.7)+'px';
      msgBox.style.height=msgBoxC.style.height;
    }else{
      msgBoxC.style.height=height+20+'px';
      msgBox.style.height=height+'px';
    }

    if(this.message.length>103*2){
      msgBoxC.style.height=height* (this.message.length/103-1)+'px';
      msgBox.style.height=msgBoxC.style.height;
    }
  }
}
