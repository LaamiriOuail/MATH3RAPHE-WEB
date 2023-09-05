import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { GrapheService } from '../AllService/graphe.service';
import { SaveUploadService } from '../AllService/save-upload.service';
import { AlgorithmService } from '../AllService/algorithm.service';
import { TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../AllService/dark-mode.service';

@Component({
  selector: 'app-screenbox',
  templateUrl: './screenbox.component.html',
  styleUrls: ['./screenbox.component.css'],
})
export class ScreenboxComponent implements OnInit,OnDestroy {
  private buttonClicked:string="";
  private restoreArray:Array<any> =[] ;
  typeGraphe: string = "";
  weight?:number;
  containerHeight:number=70;//Height of msg box
  selectedNode:Array<string>=[];
  message:string="";
  algorithm:string="";
  nodeNamingMethode:string="";
  remove:string="";
  saveUpload:string="";
  changeSelect:string="";
  nodeName:string="numerique";
  //------  Type graphe selection --------------------
  
  //---------------------------------------------------
  private nodeId:number=0;//Increment and assign a new node
  private nodeIdChanged:any;
  constructor(private el: ElementRef,protected grapheS:GrapheService,protected algoS:AlgorithmService,protected saveUploadS:SaveUploadService,protected translate:TranslateService,protected darkModeS:DarkModeService) {
  }
  ngOnInit(): void {
    this.grapheS.OnInit(this);
    this.grapheS.OnScreenTap(this);
    this.grapheS.OnEdgeTap(this);
    this.grapheS.OnNodeTap(this);
  }
  ngOnDestroy(): void {
    this.grapheS.OnDestroy();
  }
  getButtonClickedId(event: any): void {
    this.buttonClicked= event.target.id;
    this.grapheS.resetColors();
    this.grapheS.onChangeButtonClicked(this);
  }
  onWeightChange(newWeight: number): void {
    this.weight=newWeight;
  }
  chngeTypeGraphe(data:any): void {
    this.typeGraphe=data;
  }
}

