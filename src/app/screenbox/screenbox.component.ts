import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { GrapheService } from '../AllService/graphe.service';
import { SaveUploadService } from '../AllService/save-upload.service';
import { AlgorithmService } from '../AllService/algorithm.service';
import { TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../AllService/dark-mode.service';

/**
 * Angular component representing the screen box.
 */
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
  private nodeId:number=0;//Increment and assign a new node
  private nodeIdChanged:any;
  /**
   * Initializes a new instance of the ScreenboxComponent class.
   *
   * @param {ElementRef} el - The ElementRef for this component.
   * @param {GrapheService} grapheS - The GrapheService instance.
   * @param {AlgorithmService} algoS - The AlgorithmService instance.
   * @param {SaveUploadService} saveUploadS - The SaveUploadService instance.
   * @param {TranslateService} translate - The TranslateService instance.
   * @param {DarkModeService} darkModeS - The DarkModeService instance.
   */
  constructor(private el: ElementRef,protected grapheS:GrapheService,protected algoS:AlgorithmService,protected saveUploadS:SaveUploadService,protected translate:TranslateService,protected darkModeS:DarkModeService) {
  }
  /**
   * Angular lifecycle hook called when the component is initialized.
   */
  ngOnInit(): void {
    this.grapheS.OnInit(this);
    this.grapheS.OnScreenTap(this);
    this.grapheS.OnEdgeTap(this);
    this.grapheS.OnNodeTap(this);
  }
  /**
   * Angular lifecycle hook called when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.grapheS.OnDestroy();
  }
  /**
   * Gets the ID of the button that was clicked and triggers relevant actions.
   *
   * @param {any} event - The event containing the click target.
   */
  getButtonClickedId(event: any): void {
    this.buttonClicked= event.target.id;
    this.grapheS.resetColors();
    this.grapheS.onChangeButtonClicked(this);
  }
  /**
   * Handles the change in weight.
   *
   * @param {number} newWeight - The new weight value(app-add-weighted-edge Output).
   */
  onWeightChange(newWeight: number): void {
    this.weight=newWeight;
  }
  /**
   * Changes the type of the graph.
   *
   * @param {string} data - The new graph type data.
   */
  chngeTypeGraphe(data:string): void {
    this.typeGraphe=data;
  }
}

