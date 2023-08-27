import { Component, OnChanges, OnInit,Input } from '@angular/core';
import { GrapheService } from '../../AllService/graphe.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnChanges,OnInit{
  @Input() grapheS:any;
  @Input() algoS:any;
  constructor()  {
  }
  ngOnChanges(){

  }
  ngOnInit(): void {
  }
}
