import { Component,EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input() disableLabell:string="";
  @Input() container:any;
  @Input() functionHandler:any;
  @Input() Class:string="";
  @Input() items:Array<any>=[];
  @Output() selected:EventEmitter<string>= new EventEmitter<string>();
  selectedNew:string="";
  onChange():void{
    this.selected.emit(this.selectedNew);
  }
}
