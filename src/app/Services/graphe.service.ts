import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as cytoscape from 'cytoscape';
/**
 * Represents a 2D position with x and y coordinates.
 * @interface
 */
interface IPosition {
  /**
   * The x-coordinate of the position.
   * @type {number}
   */
  x: number;

  /**
   * The y-coordinate of the position.
   * @type {number}
   */
  y: number;
}
/**
 * Service for managing and interacting with the Cytoscape graph.
 */
@Injectable({
  providedIn: 'root'
})
export class GrapheService {
  /** The Cytoscape instance used to manage and render the graph. */
  public cy: any;

  /** The type of the graph (e.g., Directed, Undirected, Weighted). */
  public typeGraphe: string = "";

  /** Array of lowercase alphabet characters. */
  alphabets0: string[] = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  /** Array of lowercase alphabet characters followed by '1'. */
  alphabets: string[] = this.alphabets0.concat(
    this.alphabets0.map(letter => letter + '1')
  );

  /** Array of lowercase alphabet characters followed by '2'. */
  Alphabets: string[] = this.alphabets.concat(
    this.alphabets0.map(letter => letter + '2')
  );

  /** A counter variable for tracking. */
  counter: number = 0;
  numbersArray:number[] = Array.from(Array(200), (_, i) => i + 1);
  /** The position of something (needs a description). */
  position: any;
  POSITIONS:IPosition[] = 
  [
    {x: 241, y: 46},{x: 493, y: 47},{x: 261, y: 174},{x: 541, y: 174},
    {x: 719, y: 41},{x: 736, y: 165},{x: 295, y: 314},{x: 530, y: 301},
    {x: 772, y: 299},{x: 845, y: 43},{x: 885, y: 178},{x: 875, y: 276},
    {x: 82, y: 5},{x: 106, y: 144},{x: 121.28128725008331, y: 263.51311061937736},
    {x: 382, y: 87},{x: 617, y: 105},{x: 592, y: 217},{x: 323, y: 264},{x: 835, y: 319},
    {x: 82, y: 24},{x: 98, y: 274},{x: 88, y: 173},{x: 380, y: 23},{x: 739, y: 73},
    {x: 702, y: 211},{x: 577, y: 287},{x: 351, y: 323},{x: 350, y: 200},{x: 533, y: 108},
    {x: 1221, y: 49},{x: 970, y: 133},{x: 1227, y: 227},{x: 1154, y: 353},{x: 919, y: 378},
    {x: 887, y: 239},{x: 958, y: 48}
  ];



  /** The color of nodes. */
  COLOR_NODE: any = "white";

  /** The background color of nodes. */
  BACKGROUND_COLOR_NODE: any = "black";

  /** The color of edges. */
  COLOR_LINE_EDGE: any = "black";

  /** The color of the target arrow on edges. */
  TARGET_ARROW_COLOR: any = "blue";

  /** The color of data associated with edges. */
  DATA_EDGE_COLOR: any = "red";

  //----------------------------------------------------------------
  // Private Constants for Algorithm Colors
  //----------------------------------------------------------------

  /** The color of the target arrow in algorithm animations. */
  private TARGET_ARROW_COLOR_ALGO: any = "black";

  /** The color of edges in algorithm animations. */
  private COLOR_LINE_EDGE_ALGO: any = "yellow";

  /** The color of nodes in algorithm animations. */
  private COLOR_NODE_ALGO: any = "black";

  /** The background color of nodes in algorithm animations. */
  private BACKGROUND_COLOR_NODE_ALGO: any = "yellow";

  /** The color of data associated with edges in algorithm animations. */
  private DATA_EDGE_COLOR_ALGO: any = "blue";

  //----------------------------------------------------------------

  /**
   * Constructor for the GrapheService.
   *
   * @param {TranslateService} translate - The translation service for internationalization.
   */
  constructor(private translate: TranslateService) {
    // Constructor logic here
  }

  /**
   * Changes the node enumeration.
   * @param {ScreenboxComponent} container - The container object.
   */
  changeNodeEnum(container:any):void{
    if(this.typeGraphe!=""){
      //DRY
      container.selectedNode=[];
      if(container.algorithm!="degrenodes"&&container.algorithm!="matrixAdjancy"&&container.algorithm!="matrixIncident"&&container.algorithm!="listeAdjancy"){
        container.algorithm="";
      }
      
      container.saveUpload = "";
      container.remove="";
      container.containerHeight=50;
      this.resetColors();
      const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
      const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
      const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
      const formAddNode=container.el.nativeElement.querySelector('.formAddNode');
      formAddNode.style.display="none";
      formChangeNodeId.style.display="none";
      formAddEdge.style.display="none";
      formChangeColor.style.display="none";
      container.changeSelect="";
      this.position=null;
      //
    }else{
      container.message=this.translate.instant("screenbox.msg23");
      container.nodeName="numerique";
    }
    
  }
  /**
  * Changes a setting or performs an action based on the selected option(chnage colors & sizes).
  *
  * @param {ScreenboxComponent} container - The container object.
  */
  changeChanges(container:any){
    //DRY
    container.selectedNode=[];
    if(container.algorithm!="degrenodes"&&container.algorithm!="matrixAdjancy"&&container.algorithm!="matrixIncident"&&container.algorithm!="listeAdjancy"){
      container.algorithm="";
    }
    container.saveUpload = "";
    container.remove="";
    container.containerHeight=50;
    container.buttonClicked="";
    container.restoreArray=[];
    const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
    const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
    const formAddNode = container.el.nativeElement.querySelector('.formAddNode');
    const formRemoveEdge = container.el.nativeElement.querySelector('.formRemoveEdge');
    const formRemoveNode = container.el.nativeElement.querySelector('.formRemoveNode');
    formRemoveNode.style.display="none";
    formChangeNodeId.style.display="none";
    formAddEdge.style.display="none";
    formChangeColor.style.display="none";
    formAChangeSizeScreen.style.display="none";
    formAddNode.style.display="none";
    formRemoveEdge.style.display="none";
    this.position="";
    this.resetColors();
    //
    if(container.changeSelect=="changeColorNodes" || container.changeSelect=="changeColorEdges" || container.changeSelect=="changeColorNodesAlgo" || container.changeSelect=="changeColorEdgesAlgo" || container.changeSelect=="changeColorScreen"){
      if(container.changeSelect=="changeColorNodes"){
        container.message=this.translate.instant("grapheS.msg26")
      }else if(container.changeSelect=="changeColorEdges") {
        container.message=this.translate.instant("grapheS.msg27")
      }if(container.changeSelect=="changeColorNodesAlgo"){
        container.message=this.translate.instant("grapheS.msg34")
      }else if(container.changeSelect=="changeColorEdgesAlgo") {
        container.message=this.translate.instant("grapheS.msg35")
      }else if(container.changeSelect=="changeColorScreen") {
        container.message=this.translate.instant("grapheS.msg36")
      }
      formChangeColor.style.display="block";
    }else if(container.changeSelect=="addGrapheFromMatrix"){
      const screen=container.el.nativeElement.querySelector('.screen');
      const buttonManupilation=container.el.nativeElement.querySelector('.buttonManupilation');
      const addGrapheWithMatrix=container.el.nativeElement.querySelector('.addGrapheWithMatrix');
      const addGrapheFromEdgesList=container.el.nativeElement.querySelector('.addGrapheFromEdgesList');
      screen.style.display="none";
      addGrapheFromEdgesList.style.display="none";
      buttonManupilation.style.display="none";
      addGrapheWithMatrix.style.display="block";
      container.message=this.translate.instant("grapheFromMatrix.msg6");
    }else if(container.changeSelect=="addGrapheFromEdgesList"){
      const screen=container.el.nativeElement.querySelector('.screen');
      const buttonManupilation=container.el.nativeElement.querySelector('.buttonManupilation');
      const addGrapheWithMatrix=container.el.nativeElement.querySelector('.addGrapheWithMatrix');
      const addGrapheFromEdgesList=container.el.nativeElement.querySelector('.addGrapheFromEdgesList');
      screen.style.display="none";
      addGrapheFromEdgesList.style.display="block";
      buttonManupilation.style.display="none";
      addGrapheWithMatrix.style.display="none";
      container.message=this.translate.instant("grapheFromMatrix.msg6");///////////////////////Chnge this Message
    }else if(container.changeSelect=="changeSizeScreen"){
      container.message=this.translate.instant("grapheS.msg39")
      formAChangeSizeScreen.style.display="block";
    }else if(container.changeSelect=="changeIdNode"){
      if(this.typeGraphe && this.cy.nodes().length){
        container.message=this.translate.instant("grapheS.msg24")
      }else{
        if(this.typeGraphe==""){
          container.message=this.translate.instant("screenbox.msg23");
        }else if(this.cy.nodes().length==0){
          container.message=this.translate.instant("grapheS.msg41");
        }
        container.changeSelect="";
      }
    }
  }
  /**
   * Changes the type of graph (e.g., Directed, Undirected, Weighted).
   *
   * @param {ScreenboxComponent} container - The container object.
   */
  changeTypeGraphe(container:any):void{
    //DRY
    container.selectedNode=[];
    container.buttonClicked="";
    if(container.algorithm!="degrenodes"&&container.algorithm!="matrixAdjancy"&&container.algorithm!="matrixIncident"&&container.algorithm!="listeAdjancy"){
      container.algorithm="";
    }
    container.saveUpload = "";
    container.remove="";
    container.changeSelect="";
    this.Alphabets=this.alphabets.concat(this.alphabets0.map(letter => letter + '2'));
    this.counter=0;
    //
    
    this.typeGraphe=container.typeGraphe;
    this.resetColors();
    const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
    const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
    const formAddNode = container.el.nativeElement.querySelector('.formAddNode');
    const formRemoveEdge = container.el.nativeElement.querySelector('.formRemoveEdge');
    const formRemoveNode = container.el.nativeElement.querySelector('.formRemoveNode');
    formRemoveNode.style.display="none";
    formChangeNodeId.style.display="none";
    formAddEdge.style.display="none";
    formChangeColor.style.display="none";
    formAChangeSizeScreen.style.display="none";
    formAddNode.style.display="none";
    formRemoveEdge.style.display="none";
    this.position="";
    container.containerHeight=50;
    this.cy.remove(this.cy.elements());
    container.message=this.translate.instant("grapheS.msg1");
      if (this.typeGraphe === "Directed Weighted") {
          this.changeStyleGraphe(this.typeGraphe);
          container.message+=this.translate.instant("grapheS.msg18")+" "+this.translate.instant("grapheS.msg20");

      }else if (this.typeGraphe === "Directed Unweighted") {
          this.changeStyleGraphe(this.typeGraphe);
          container.message+=this.translate.instant("grapheS.msg18")+" "+this.translate.instant("grapheS.msg21");
      } else if (this.typeGraphe === "Undirected Weighted") {
          this.changeStyleGraphe(this.typeGraphe);
          container.message+=this.translate.instant("grapheS.msg19")+" "+this.translate.instant("grapheS.msg20");;
      } else if (this.typeGraphe === "Undirected Unweighted") {
        this.changeStyleGraphe(this.typeGraphe);
        container.message+=this.translate.instant("grapheS.msg19")+" "+this.translate.instant("grapheS.msg21");;
      }
  }
  /**
 * Handles button clicks and performs actions based on the selected option.
 *
 * @param {ScreenboxComponent} container - The container object.
 */
  onChangeButtonClicked(container:any):void{
    if(this.typeGraphe!=""){
      //DRY
      container.changeSelect="";
      container.selectedNode=[];
      if(container.algorithm!="degrenodes"&&container.algorithm!="matrixAdjancy"&&container.algorithm!="matrixIncident"&&container.algorithm!="listeAdjancy"){
        container.algorithm="";
      }
      container.saveUpload = "";
      container.remove="";
      container.containerHeight=50;
      //
      const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
      const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
      const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
      const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
      const formAddNode = container.el.nativeElement.querySelector('.formAddNode');
      const formRemoveEdge = container.el.nativeElement.querySelector('.formRemoveEdge');
      const formRemoveNode = container.el.nativeElement.querySelector('.formRemoveNode');
      formRemoveNode.style.display="none";
      formChangeNodeId.style.display="none";
      formAddEdge.style.display="none";
      formChangeColor.style.display="none";
      formAChangeSizeScreen.style.display="none";
      formAddNode.style.display="none";
      formRemoveEdge.style.display="none";
      this.position="";
      if(container.buttonClicked=="default"){
        container.message=this.translate.instant("grapheS.msg2");
        this.cy.fit();
      }else if(container.buttonClicked=="addVertices"){
        container.message=this.translate.instant("grapheS.msg3");
      }else if(container.buttonClicked=="addEdges"){
        if(this.cy.nodes().length){
          container.message=this.translate.instant("grapheS.msg4");
        }else{
          container.message=this.translate.instant("grapheS.msg41");
          container.buttonClicked="";
        }
      }else if(container.buttonClicked=="restore"){
        if(!container.restoreArray.length){
          container.message=this.translate.instant("grapheS.msg60")
        }else{
          this.Alphabets=this.alphabets.concat(this.alphabets0.map(letter => letter + '2'));
          this.counter=0;
          this.restoreGraphe(container);
        }        
      }
    }else{
      container.message=this.translate.instant("screenbox.msg23");
      container.buttonClicked="";
    }
  }
  /**
   * Changes the size of the screen.
   *
   * @param {ScreenboxComponent} container - The container object.
   * @param {ChangeSizeScreenComponent} container2 - Another container object.
   */
  changeSizeScreen(container:any,container2:any):void{
    const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
    const screen=container.el.nativeElement.querySelector('.scr');
    if(container2.height){
      screen.style.height =container2.height+'px';
      localStorage.setItem('screenHeight', screen.style.height.toString());
      container.message=this.translate.instant("grapheS.msg37",{height:container2.height});
    }else{
      container2.height=screen.style.height =400+'px';//default value
      localStorage.setItem('screenHeight', screen.style.height.toString());
      container.message=this.translate.instant("grapheS.msg38");
    }
    container.changeSelect="";
    formAChangeSizeScreen.style.display="none";
  }
  /**
   * Rejects the changes made to the screen size and restores the previous size.
   *
   * @param {ScreenboxComponent} container - The container object.
   * @param {ChangeSizeScreenComponent} container2 - Another container object.
   */
  RejeterChangeSizeScreen(container:any,container2:any):void{
    const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
    const screen=container.el.nativeElement.querySelector('.scr');
    container2.height=screen.style.height.slice(0,-2)||400;
    container.changeSelect="";
    formAChangeSizeScreen.style.display="none";
    container.message=this.translate.instant("grapheS.msg40")
  }
  /**
   * Adds a weighted edge between selected nodes.
   *
   * @param {ScreenboxComponent} container - The container object.
   * @param {AddWeightedEdgeComponent} container2 - Another container object.
   */
  addWeightedEdge(container:any,container2:any):void{
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    if(container.weight!=0){
      this.isEdgeRemove(container.selectedNode[0],container.selectedNode[1],container);
      let data={
        source:container.selectedNode[0],
        target:container.selectedNode[1],
        weight:container.weight
      }
      let edge=this.cy.add({
        data
      });
      //NEW CODE
      let elem={status:"add",element:edge};
      container.restoreArray.push(elem);
      //
      formAddEdge.style.display='none';
      container.message=this.translate.instant("grapheS.msg7",{selectedNode1:container.selectedNode[0],selectedNode2:container.selectedNode[1],weight:container.weight});
      container.weight=null;
      container2.weightForm=null;
      container.selectedNode=[];
      this.resetColors();
    }else{
      container.message=this.translate.instant("grapheS.msg8")
    }
  }
  /**
   * Rejects the addition of a weighted edge and resets the form.
   *
   * @param {ScreenboxComponent} container - The container object.
   * @param {AddWeightedEdgeComponent} container2 - Another container object.
   */
  RejeterAddEdgeWeighted(container:any,container2:any):void{
    container.selectedNode=[];
    container.weight=null;
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    formAddEdge.style.display='none';
    this.resetColors();
    container.message=this.translate.instant("grapheS.msg9");
    container2.weightForm=null;
  }
  /**
   * Changes the ID of a node in the graph.
   *
   * @param {ScreenboxComponent} container - The container object.
   * @param {ChangeIdNodeComponent} container2 - Another container object.
   */
  changeNodeId(container:any,container2:any):void{
    const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
    let idExists=false;
    this.cy.nodes().forEach((node:any)=>{
      if(node.data('id')==container2.newNodeId){
        container.message=this.translate.instant("grapheS.msg23");
        idExists=true;
      }
    })

    if(idExists==false){
      let node = this.cy.getElementById(container.selectedNode[0]);
      let elem:any;
      let nodeNew=this.cy.add({ group: 'nodes', data: { id: container2.newNodeId}, position: { x: node.position('x'),y: node.position('y'),}});
      
      this.cy.edges().forEach((edge:any)=>{
        if(this.typeGraphe.split(" ")[1]=="Unweighted"){
            if (edge.source().id() === node.id()) {
              elem={status:"remove",element:edge};
              container.restoreArray.push(elem);
              this.cy.add({
                  group: 'edges',
                  data: {
                      source: nodeNew.id(),
                      target: edge.target().id(),
                  }
              });
            } else if (edge.target().id() === node.id()) {
              elem={status:"remove",element:edge};
              container.restoreArray.push(elem);
                this.cy.add({
                    group: 'edges',
                    data: {
                        source: edge.source().id(),
                        target: nodeNew.id(),
                    }
                });
            }
        }else if(this.typeGraphe.split(" ")[1]=="Weighted"){
            if (edge.source().id() === node.id()) {
              elem={status:"remove",element:edge};
              container.restoreArray.push(elem);
              this.cy.add({
                  group: 'edges',
                  data: {
                      source: nodeNew.id(),
                      target: edge.target().id(),
                      weight: edge.data('weight') 
                  }
              });
            } else if (edge.target().id() === node.id()) {
              elem={status:"remove",element:edge};
              container.restoreArray.push(elem);
                this.cy.add({
                    group: 'edges',
                    data: {
                        source: edge.source().id(),
                        target: nodeNew.id(),
                        weight: edge.data('weight') 
                    }
                });
            }
        }
      })
      //Restore
      elem={status:"remove",element:node};
      container.restoreArray.push(elem);
      this.cy.remove(node);
      elem={status:"add",element:nodeNew};
      container.restoreArray.push(elem);
      //Log message 
      container.message=this.translate.instant("grapheS.msg25",{last:container.selectedNode[0],new:container2.newNodeId});
      //Initialiation
      container.nodeIdChanged=container2.newNodeId;
      formChangeNodeId.style.display = 'none';
      container.selectedNode=[];
      container2.newNodeId=null;
      this.resetColors();
    }
  }
  /**
   * Rejects the node ID change and resets the form.
   *
   * @param {ScreenboxComponent} container - The container object.
   * @param {ChangeIdNodeComponent} container2 - Another container object.
   */
  RejeterChangeNodeId(container:any,container2:any):void{
    const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
    formChangeNodeId.style.display = 'none';
    container.selectedNode=[];
    container2.newNodeId=null;
    this.resetColors();
    container.message=this.translate.instant("grapheS.msg22");
  }
  /**
   * Changes the colors of nodes, edges, or the screen based on user selection.
   *
   * @param {ScreenboxComponent} container - The container object.
   * @param {ChangeColorComponent} container2 - Another container object.
   */
  changeColor(container:any,container2:any){
    const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
    const screen=container.el.nativeElement.querySelector('.scr');
    if(container.changeSelect=="changeColorNodes"){
      this.COLOR_NODE=container2.color;
      this.BACKGROUND_COLOR_NODE=container2.bgColor;
      this.cy.style()
          .selector('node') 
          .style({
            'background-color': this.BACKGROUND_COLOR_NODE,
            'color': this.COLOR_NODE
          })
          .update();
      this.changeColorNodes();
      container.message=this.translate.instant("grapheS.msg30")
    }else if(container.changeSelect=="changeColorEdges"){
      this.COLOR_LINE_EDGE=container2.bgColor;
      this.cy.style()
          .selector('edge') // Apply the style to all edges
          .style({
              'line-color': this.COLOR_LINE_EDGE,
          })
          .update();
      if(this.typeGraphe.split(" ")[1]=="Weighted"){
        this.DATA_EDGE_COLOR=container2.color;
        this.cy.style()
          .selector('edge') // Apply the style to all edges
          .style({
              'color': this.DATA_EDGE_COLOR
          })
          .update();
      }
      
      if(this.typeGraphe.split(" ")[0]=="Directed"){
        this.TARGET_ARROW_COLOR=container2.fColor;
        this.cy.style()
          .selector('edge') // Apply the style to all edges
          .style({
              'target-arrow-color': this.TARGET_ARROW_COLOR,
          })
          .update();
      }
      this.changeColorEdges();
      container.message=this.translate.instant("grapheS.msg31")
    }else if(container.changeSelect=="changeColorNodesAlgo"){
      this.COLOR_NODE_ALGO=container2.color;
      this.BACKGROUND_COLOR_NODE_ALGO=container2.bgColor;
      container.message=this.translate.instant("grapheS.msg32")
    }else if(container.changeSelect=="changeColorEdgesAlgo"){
      this.COLOR_LINE_EDGE_ALGO=container2.bgColor;
      if(this.typeGraphe.split(" ")[1]=="Weighted"){
        this.DATA_EDGE_COLOR_ALGO=container2.color;
      }
      
      if(this.typeGraphe.split(" ")[0]=="Directed"){
        this.TARGET_ARROW_COLOR_ALGO=container2.fColor;
      }
      container.message=this.translate.instant("grapheS.msg33")
    }else if(container.changeSelect=="changeColorScreen"){
      screen.style.backgroundColor=container2.bgColor;
      localStorage.setItem("ScreenColor",screen.style.backgroundColor.toString());
    }
    container.changeSelect="";
    formChangeColor.style.display="none";
  }
  /**
   * Rejects the color changes and resets the form.
   *
   * @param {ScreenboxComponent} container - The container object.
   */
  RejeterChangeColor(container:any):void {
    const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
    if(container.changeSelect=="changeColorNodes"){
      container.message=this.translate.instant("grapheS.msg28")
    }else{
      container.message=this.translate.instant("grapheS.msg29")
    }
    container.changeSelect="";
    formChangeColor.style.display="none";
  }
  /**
   * Adds a new node to the graph if it doesn't already exist.
   *
   * @param {ScreenboxComponent} container - The container object.
   * @param {AddNodeComponent} container2 - Another container object containing the new node ID.
   */
  addNode(container:any,container2:any):void{
    const formAddNode=container.el.nativeElement.querySelector('.formAddNode');
    let exist:boolean=false;
    if(container2.nodeId){
      this.cy.nodes().forEach((node:any)=>{
        if(node.data('id')==container2.nodeId){
          container.message=this.translate.instant('grapheS.msg23');
          exist=true;
        }
      })
      if(!exist){
        let node=this.cy.add({ group: 'nodes', data: { id: container2.nodeId}, position: this.position });
        let elem={status:"add",element:node};
        container.restoreArray.push(elem);
        container.message=this.translate.instant("grapheS.msg10",{nodeId:node.data('id')});
        formAddNode.style.display="none";
        this.position="";
        container2.nodeId=null;
      }
    }else{
      container.message=this.translate.instant('screenbox.msg41');
    }
  }
  /**
   * Rejects the addition of a new node and resets the form.
   *
   * @param {ScreenboxComponent} container - The container object.
   * @param {AddNodeComponent} container2 - Another container object containing the new node ID.
   */
  RejeterAddNode(container:any,container2:any):void{
    const formAddNode=container.el.nativeElement.querySelector('.formAddNode');
    formAddNode.style.display="none";
    this.position="";
    container2.nodeId=null;
  }
  /**
   * Listens for a tap event on the screen background and adds a new node when conditions are met.
   *
   * @param {ScreenboxComponent} container - The container object.
   */
  OnScreenTap(container:any):void{
    this.cy.on('tap', (evt:any)=> {
      if (evt.target === this.cy && container.buttonClicked==="addVertices" && this.typeGraphe!="") {
          //Use all possile name of node , case of node deleted id
          this.Alphabets=this.alphabets.concat(this.alphabets0.map(letter => letter + '2'));
          this.counter=0;
          //
          let pos = evt.position || evt.cyPosition;
          let node:any;
          const formAddNode=container.el.nativeElement.querySelector('.formAddNode');
          if(container.nodeName=="numerique"){
            formAddNode.style.display="none";
            this.cy.nodes().forEach((node:any)=>{
              if(node.data('id')==this.counter+1){
                ++this.counter;
              }
            })
            node=this.cy.add({ group: 'nodes', data: { id: ++this.counter}, position: pos });
          }else if(container.nodeName=="alphabic"){
            formAddNode.style.display="none";
            this.cy.nodes().forEach((node:any)=>{
              if(node.data('id')==this.Alphabets[0]){
                this.Alphabets.shift();
              }
            })
            node=this.cy.add({ group: 'nodes', data: { id: this.Alphabets.shift()}, position: pos });
          }else if(container.nodeName=="customText"){
            formAddNode.style.display="block";
            this.position=pos;
          }
          if(container.nodeName!="customText"){
            let elem={status:"add",element:node};
            container.restoreArray.push(elem);
            container.message=this.translate.instant("grapheS.msg10",{nodeId:node.data('id')});
          }
      }
    });
  }
  /**
   * Listens for a tap event on edges and removes edges when the 'remove edges' or 'remove all' action is selected.
   *
   * @param {ScreenboxComponent} container - The container object.
   */
  OnEdgeTap(container:any):void{
    this.cy.on('tap', 'edge',  (evt:any)=> {
      var edge = evt.target;
      if(container.remove=="remove edges" || container.remove=="remove all"){
        this.resetColors();
        container.message=this.translate.instant("grapheS.msg11",{sourceId:edge.source().id(),targetId:edge.target().id()});
        edge.remove();
         //NEW CODE
         let elem={status:"remove",element:edge};
         container.restoreArray.push(elem);
         //
      }
    });
  }
  /**
   * Listens for a tap event on nodes and handles various actions based on the container state.
   *
   * @param {ScreenboxComponent} container - The container object.
   */
  OnNodeTap(container:any):void{
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
    this.cy.on('tap', 'node',  (evt:any)=> {
      var node = evt.target;
      if(container.remove=="remove nodes" || container.remove=="remove all"){
        this.resetColors();
        node.remove();
        //NEW CODE
        let elem={status:"remove",element:node};
        container.restoreArray.push(elem);
        //
        container.message=this.translate.instant("grapheS.msg12",{nodeId:node.data('id')});
      }else if(container.changeSelect==="changeIdNode"){
        if(container.selectedNode.length!=0){
          container.selectedNode=[];
        }
        this.changeColorNode(node, this.BACKGROUND_COLOR_NODE_ALGO,this.COLOR_NODE_ALGO);
        container.selectedNode.push(node.data('id'));
        formChangeNodeId.style.display = 'block';
      }else if(container.buttonClicked==="addEdges"){
          this.resetColors();
          if(container.selectedNode.length<1){
              container.message=this.translate.instant("grapheS.msg13",{nodeId:node.data('id')});
              container.selectedNode.push(node.data('id'));
              this.changeColorNode(node, this.BACKGROUND_COLOR_NODE_ALGO,this.COLOR_NODE_ALGO);
          }else if(container.selectedNode.length==1){
              this.changeColorNode(node, this.BACKGROUND_COLOR_NODE_ALGO,this.COLOR_NODE_ALGO);
              container.selectedNode.push(node.data('id'));
              if(this.typeGraphe=="Directed Weighted" || this.typeGraphe=="Undirected Weighted"){
                  formAddEdge.style.display = 'block';
                  container.message=this.translate.instant("grapheS.msg14",{selectedNode1:container.selectedNode[0],selectedNode2:container.selectedNode[1]});
              }else{
                this.isEdgeRemove(container.selectedNode[0],container.selectedNode[1],container);
                  let edge=this.cy.add({
                    data: {
                        source: container.selectedNode[0],
                        target: container.selectedNode[1],
                    }
                  }); 
                  //NEW CODE
                  let elem={status:"add",element:edge};
                  container.restoreArray.push(elem);
                  container.message=this.translate.instant("grapheS.msg15",{selectedNode1:container.selectedNode[0],selectedNode2:container.selectedNode[1]});
                  container.selectedNode=[];
                  this.resetColors();
                  formAddEdge.style.display='none';
              }  
          }
      }else if(container.algorithm=="bfs"){
        this.resetColors();
        this.changeColorNode(node, this.BACKGROUND_COLOR_NODE_ALGO,this.COLOR_NODE_ALGO);
        container.algoS.bfsAnimation(node.data('id'),container);
      }else if(container.algorithm=="dfs"){
        this.resetColors();
        this.changeColorNode(node, this.BACKGROUND_COLOR_NODE_ALGO,this.COLOR_NODE_ALGO);
        container.algoS.dfsAnimation(node.data('id'),container);
      }else if(container.algorithm=="dijkstra"){
        this.resetColors();
        this.changeColorNode(node, this.BACKGROUND_COLOR_NODE_ALGO,this.COLOR_NODE_ALGO);
        container.algoS.dijkstraAlgorithm(node.data('id'),container);
      }else if(container.algorithm=="dijkstraAB"){
        this.resetColors();
        if(container.selectedNode.length<1){
          container.message=this.translate.instant("grapheS.msg16",{nodeId:node.data('id')});
          container.selectedNode.push(node.data('id'));
          this.changeColorNode(node, this.BACKGROUND_COLOR_NODE_ALGO,this.COLOR_NODE_ALGO);
        }else if(container.selectedNode.length==1){
          this.changeColorNode(node, this.BACKGROUND_COLOR_NODE_ALGO,this.COLOR_NODE_ALGO);
          container.selectedNode.push(node.data('id'));
          container.algoS.dijkstraAnimation(container.selectedNode[0],container.selectedNode[1],container);
          container.selectedNode=[];
        }
      }else if(container.algorithm=="bellmanFordAB"){
        this.resetColors();
        if(container.selectedNode.length<1){
          container.message=this.translate.instant("grapheS.msg42",{nodeId:node.data('id')});
          container.selectedNode.push(node.data('id'));
          this.changeColorNode(node, this.BACKGROUND_COLOR_NODE_ALGO,this.COLOR_NODE_ALGO);
        }else if(container.selectedNode.length==1){
          this.changeColorNode(node, this.BACKGROUND_COLOR_NODE_ALGO,this.COLOR_NODE_ALGO);
          container.selectedNode.push(node.data('id'));
          container.algoS.bellmanFordAnimation(container.selectedNode[0],container.selectedNode[1],container);
          container.selectedNode=[];
        }
      }else if(container.algorithm=="bellmanFord"){
        this.resetColors();
        this.changeColorNode(node, this.BACKGROUND_COLOR_NODE_ALGO,this.COLOR_NODE_ALGO);
        container.algoS.bellmanFordAlgorithm(node.data('id'),container);
      }
  });
  this.cy.emit("tap");
  }
  /**
   * Initializes the graph using Cytoscape and sets up the initial style and layout.
   *
   * @param {ScreenboxComponent} Container - The container element for the graph.
   */
  OnInit(Container:any):void{
    const screen=Container.el.nativeElement.querySelector('.scr');
    if(localStorage.getItem('screenHeight')){
      screen.style.height=localStorage.getItem('screenHeight');
    }else{
      localStorage.setItem('screenHeight', screen.style.height.toString());
    }  
    if(localStorage.getItem("ScreenColor")){
      screen.style.backgroundColor=localStorage.getItem("ScreenColor");
    }else{
      localStorage.setItem("ScreenColor",screen.style.backgroundColor.toString());
    }
    const container = Container.el.nativeElement.querySelector('.scr');
      this.cy = cytoscape({
        container,
        elements: [
        ],
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': this.BACKGROUND_COLOR_NODE,
                    'color': this.COLOR_NODE,
                    'label': 'data(id)',
                    'width': '50px',
                    'height': '50px',
                    'text-valign': 'center', 
                    'text-halign': 'center'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': this.COLOR_LINE_EDGE,
                    'target-arrow-color': this.TARGET_ARROW_COLOR,
                    'target-arrow-shape': 'triangle',
                    'color': this.DATA_EDGE_COLOR,
                }
            }
        ],
        layout: {
            name: 'preset'
        }
    });
  }
  /**
   * Resets the visual styles of nodes and edges in the graph to their default colors.
   */
  resetColors(): void {
    setTimeout(() => {
      this.cy.nodes().style('background-color', this.BACKGROUND_COLOR_NODE);
      this.cy.nodes().style('color', this.COLOR_NODE);
      this.cy.edges().style('line-color', this.COLOR_LINE_EDGE);
      this.cy.edges().style('color', this.DATA_EDGE_COLOR);
      this.cy.edges().style('target-arrow-color', this.TARGET_ARROW_COLOR);
    },10)
  }
  /**
   * Changes the background color and text color of a given node.
   *
   * @param {any} node - The node to change the colors of.
   * @param {string} bgcolor - The new background color.
   * @param {string} color - The new text color.
   * @param {number} time - Optional. Time delay before applying the color change.
   */
  changeColorNode(node:any,bgcolor:string,color:string,time:number=10): void {
    setTimeout(() => {
      node.style('background-color',bgcolor);
      node.style('color',color);
    },time);
  }
  /**
   * Changes the visual styles of a given edge, including line color, data color, and target arrow color.
   *
   * @param {any} edge - The edge to change the visual styles of.
   * @param {string} color - The new data color (used for weighted graphs).
   * @param {string} lineEdgeColor - The new line color.
   * @param {string} targetArrowColor - The new target arrow color (used for directed graphs).
   * @param {number} time - Optional. Time delay before applying the color change.
   */
  changeColorEdge(edge:any,color:string,lineEdgeColor:string,targetArrowColor:string,time:number=10): void {
    setTimeout(() => {
        edge.style('line-color',lineEdgeColor);
        if(this.typeGraphe.split(" ")[1]=="Weighted"){
          edge.style('color',color);
        }
        if(this.typeGraphe.split(" ")[0]=="Directed"){
          edge.style('target-arrow-color', targetArrowColor);
        }
      },time)
  }
  /**
   * Resets the visual styles of all nodes in the graph to their default colors.
   */
  changeColorNodes(): void {
    setTimeout(() => {
      this.cy.nodes().forEach((node:any)=>{
        node.style('background-color',this.BACKGROUND_COLOR_NODE);
        node.style('color',this.COLOR_NODE);
      })
    },10)
  }
  /**
   * Resets the visual styles of all edges in the graph to their default colors.
   */
  changeColorEdges(): void {
    setTimeout(() => {
      this.cy.edges().forEach((edge:any)=>{
        edge.style('line-color',this.COLOR_LINE_EDGE);
        if(this.typeGraphe.split(" ")[1]=="Weighted"){
          edge.style('color',this.DATA_EDGE_COLOR);
        }
        if(this.typeGraphe.split(" ")[0]=="Directed"){
          edge.style('target-arrow-color', this.TARGET_ARROW_COLOR);
        }
      })
    },10)
  }
  /**
   * Handles actions related to removing elements from the graph and resetting the graph properties.
   *
   * @param {ScreenboxComponent} container - The container object containing graph-related properties.
   */
  onRemoveChange(container:any):void{
    if(container.typeGraphe!=""){
      //DRY
      container.changeSelect="";
      container.buttonClicked="";
      container.containerHeight=50;
      container.selectedNode=[];
      container.saveUpload="";
      if(container.algorithm!="degrenodes"&&container.algorithm!="matrixAdjancy"&&container.algorithm!="matrixIncident"&&container.algorithm!="listeAdjancy"){
        container.algorithm="";
      }
      //
      const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
      const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
      const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
      const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
      const formAddNode = container.el.nativeElement.querySelector('.formAddNode');
      const formRemoveEdge = container.el.nativeElement.querySelector('.formRemoveEdge');
      const formRemoveNode = container.el.nativeElement.querySelector('.formRemoveNode');
      formChangeNodeId.style.display="none";
      formAddEdge.style.display="none";
      formChangeColor.style.display="none";
      formAChangeSizeScreen.style.display="none";
      formAddNode.style.display="none";
      formRemoveEdge.style.display="none";
      formRemoveNode.style.display="none";
      container.grapheS.position="";
      this.resetColors();
      if(container.remove=="reset graphe"){
        this.Alphabets=this.alphabets.concat(this.alphabets0.map(letter => letter + '2'));
        this.counter=0;
        this.cy.remove(this.cy.elements());
        container.message=this.translate.instant("grapheS.msg17");
      }else if(container.remove=="remove edges"){
        container.message=this.translate.instant("grapheS.msg44");
      }else if(container.remove=="remove nodes"){
        container.message=this.translate.instant("grapheS.msg43");
      }else if(container.remove=="remove all"){
        container.message=this.translate.instant("grapheS.msg45");
      }else if(container.remove=="special edges"){
        formRemoveEdge.style.display="block";
        container.message=this.translate.instant("grapheS.msg49");
      }else if(container.remove=="special nodes"){
        formRemoveNode.style.display="block";
        container.message=this.translate.instant("grapheS.msg50");
      }
    }else{
      container.message=this.translate.instant("screenbox.msg23");
      container.remove="";
    }
    
  }
  /**
   * Searches for an edge between two specified nodes and changes its line color.
   *
   * @param {any} container - The container object containing graph-related properties.
   * @param {string} source - The source node ID.
   * @param {string} target - The target node ID.
   * @param {string} lineColor - The new line color for the edge.
   */
  searcheEdgeChnageBC(container:any,source:string,target:string,color:string,lineEdgeColor:string,targetArrowColor:string,time:number=10):void{
    const edges = this.cy.elements('edge'); // Select only edges
    edges.forEach((edge:any) => {
        const edgeSourceId = edge.source().id();
        const edgeTargetId = edge.target().id();
        if (edgeSourceId === source && edgeTargetId === target) {
            this.changeColorEdge(edge,color,lineEdgeColor,targetArrowColor,time);
        }
    });
  }
  /**
   * Restores the graph by adding or removing elements based on the restoreArray.
   *
   * @param {ScreenboxComponent} container - The container object containing graph-related properties.
   */
  restoreGraphe(container:any):void{
    if(container.restoreArray.length!=0){
      let elem=container.restoreArray.pop();
      let element=elem.element;
      if(elem.status=="add"){
        if(element.isNode() || element.isEdge()){
          element.remove();
          if(element.isNode()){
            container.message=this.translate.instant("grapheS.msg55",{nodeId:element.data('id')});
          }else{
            if(this.typeGraphe.split(" ")[1]=="Weighted"){
              container.message=this.translate.instant("grapheS.msg58",{source:element.source().id(),target:element.target().id(),weight:element.data("weight")});
            }else{
              container.message=this.translate.instant("grapheS.msg59",{source:element.source().id(),target:element.target().id()});
            }
            
          }
        }
      }else{
        if(element.isNode() || element.isEdge()){
          this.cy.add(element);
          if(element.isNode()){
            container.message=this.translate.instant("grapheS.msg54",{nodeId:element.data('id')});
          }else{
            if(this.typeGraphe.split(" ")[1]=="Weighted"){
              container.message=this.translate.instant("grapheS.msg57",{source:element.source().id(),target:element.target().id(),weight:element.data("weight")});
            }else{
              container.message=this.translate.instant("grapheS.msg56",{source:element.source().id(),target:element.target().id()});
            }
          }
        }
      }
    }
  }
  /**
   * Generates a formatted list of edges in the graph.
   *
   * @returns {string} - A formatted string representing the list of edges.
   */
  getListeOfEdge():string {
    let listOfEdge:string="";
    let i:number=0;
    this.cy?.edges().forEach((edge:any) => {
      i++;
      let element:string=`(${this.translate.instant("info.s")}: ${edge.source().id()},${this.translate.instant("info.t")}: ${edge.target().id()}`;
      if(this.typeGraphe.split(" ")[1]=="Weighted"){
        element+=`,${this.translate.instant("info.w")}: ${edge.data('weight')}) `;
      }else{
        element+=") ";
      }
      if(i!=this.cy?.edges().length){
        element+=" --- ";
      }
      listOfEdge+=element;
    });
    return listOfEdge;
  }
  /**
   * Generates a formatted list of nodes in the graph.
   *
   * @returns {string} - A formatted string representing the list of nodes.
   */
  getListOfNode():string{
    let listOfNode:string="";
    let i:number=0;
    this.cy?.nodes().forEach((node:any) => {
      i++;
      listOfNode+=`${node.data("id")} `;
      if(i!=this.cy?.nodes().length){
        listOfNode+=" --- ";
      }
    });
    return listOfNode;
  }
  /**
   * Performs cleanup operations when the component is destroyed.
   * Destroys the CytoScape instance.
   */
  OnDestroy():void{
    this.cy.destroy();
  }
  /**
   * Generates an adjacency matrix representation of the graph.
   * 
   * @returns {Array<any>} - A 2D array representing the adjacency matrix.
   */
  matrixAdjancy():Array<any>{
    let adjacencyMatrix:Array<any>=[];
    const nodes = this.cy.nodes();
    const numNodes = nodes.length;
    for (let i = 0; i < numNodes; i++) {
      const row = [];
      for (let j = 0; j < numNodes; j++) {
        let edge:any ;
        if(this.typeGraphe.split(' ')[0]=="Directed"){
          edge = nodes[i].edgesTo(nodes[j]);
          row.push(edge.length ? (edge.data('weight')?edge.data('weight'):1): 0);
        }else{
          edge = nodes[i].edgesWith(nodes[j]);
          row.push(edge.length ? (edge.data('weight')?edge.data('weight'):1): 0);

        }
      }
      adjacencyMatrix.push(row);
    }
    return adjacencyMatrix;
  }
  /**
   * Checks if an edge between two nodes exists and removes it from the graph if found.
   * 
   * @param {any} node1 - The ID of the first node.
   * @param {any} node2 - The ID of the second node.
   * @param {ScreenboxComponent} container - The container object containing graph-related properties.
   */
  isEdgeRemove(node1:any,node2:any,container:any):void{
      this.cy.edges().forEach((edge:any)=>{
        if((edge.source().id()==node1 && edge.target().id()==node2)/* || (edge.source().id()==node2 && edge.target().id()==node1)*/){
          this.cy.remove(edge);
          let elem={status:"remove",element:edge};
          container.restoreArray.push(elem);
        }
      })
  }
  /**
   * Get the degrees of all nodes in the graph.
   *
   * @returns {Array<any>} - An array of objects containing node IDs, in-degrees, out-degrees, and degrees.
   */
  getDegreeNodes():Array<any>{
    let nodesDegre:Array<any> = [];
    let obj:any;
    if(this.cy.nodes().length){
      this.cy.nodes().forEach((node:any) => {
        obj={
          id:node.data('id'),
          indegree:node.indegree(),
          outdegree:node.outdegree(),
          degree:node.degree()
        }; 
        nodesDegre.push(obj);
      })
    }
    return nodesDegre;
  }
  /**
   * Create a graph from an adjacency matrix.
   *
   * @param {any} elements - Graph elements, including nodes and edges.
   * @param {boolean} directed - Whether the graph is directed.
   * @param {boolean} weighted - Whether the graph is weighted.
   * @param {ScreenboxComponent} container - The container object containing graph-related properties.
   */
  createGrapheFromAdjancyMatrix(elements:any,directed:boolean,weighted:boolean,container:any):void{
    this.cy.elements().remove();
    if(directed && weighted){
      container.typeGraphe=this.typeGraphe="Directed Weighted";
      this.changeStyleGraphe(this.typeGraphe);
    }else if (directed) {
        container.typeGraphe=this.typeGraphe="Directed Unweighted";
        this.changeStyleGraphe(this.typeGraphe);
    }else if (weighted) {
        container.typeGraphe=this.typeGraphe="Undirected Weighted";
        this.changeStyleGraphe(this.typeGraphe);
    }else{
        container.typeGraphe=this.typeGraphe="Undirected Unweighted";
        this.changeStyleGraphe(this.typeGraphe);
    }
    let i:number=0;
    elements.forEach((element:any)=>{
      if(element.id){
        const pos = this.POSITIONS[i++];
        this.cy.add({ group: 'nodes', data: { id: element.id}, position: pos });
      }else{
        if(weighted){
          if(element.source && element.target && element.weight){
            if(directed){
              this.cy.add({data:{
                source: element.source,
                target: element.target,
                weight: element.weight
              }
              }); 
            }else{
              let exist:boolean=false;
              this.cy.edges().forEach((edge:any)=>{
                if(edge.source().id()==element.target && edge.target().id()==element.source && edge.data("weight")==element.weight){
                  exist=true;
                }
              })
              if(!exist){
                this.cy.add({data:{
                  source: element.source,
                  target: element.target,
                  weight: element.weight
                }
                }); 
              }
            }
              
          }
        }else{
          if(element.source && element.target){
            if(directed){
              this.cy.add({
                data: {
                source: element.source,
                target: element.target,
                }
              }); 
            }else{
              let exist:boolean=false;
              this.cy.edges().forEach((edge:any)=>{
                if(edge.source().id()==element.target && edge.target().id()==element.source){
                  exist=true;
                }
              })
              if(!exist){
                this.cy.add({
                  data: {
                  source: element.source,
                  target: element.target,
                  }
                }); 
              }
          }
        }
      }
    }
    });
  }
  /**
   * Reject the generation of a graph from an adjacency matrix.
   *
   * @param {ScreenboxComponent} container - The container object containing graph-related properties.
   * @param {GrapheFromMatrixAdjaComponent} container2 - Another container object.
   */
  rejeterGenerateGraphFromMatrixAdjancy(container:any,container2:any):void {
    const screen=container.el.nativeElement.querySelector('.screen');
    const buttonManupilation=container.el.nativeElement.querySelector('.buttonManupilation');
    const addGrapheWithMatrix=container.el.nativeElement.querySelector('.addGrapheWithMatrix');
    screen.style.display="block";
    buttonManupilation.style.display="block";
    addGrapheWithMatrix.style.display="none";
    container2.matrixText="";
    container.message=this.translate.instant("grapheFromMatrix.msg5");
    container.changeSelect="";
  }
  /**
   * Change the style of the graph based on its type.
   *
   * @param {string} typeGraphe - The type of the graph (e.g., Directed Weighted).
   */
  changeStyleGraphe(typeGraphe:string):void{
    if(typeGraphe=="Directed Weighted"){
      this.cy.style()
        .selector('edge') 
        .style({
            'width': 4,
            'line-color': this.COLOR_LINE_EDGE,
            'target-arrow-color': this.TARGET_ARROW_COLOR,
            'target-arrow-shape': 'triangle',
            'color': this.DATA_EDGE_COLOR,
            'curve-style': 'bezier',
            'label': "data(weight)",
            'text-margin-y': -12
        })
        .update();
    }else if(typeGraphe=="Directed Unweighted"){
      this.cy.style()
        .selector('edge') // Apply the style to all edges
        .style({
            'width': 4,
            'line-color': this.COLOR_LINE_EDGE,
            'target-arrow-color': this.TARGET_ARROW_COLOR,
            'target-arrow-shape': 'triangle',
            'color': this.DATA_EDGE_COLOR,
            'curve-style': 'bezier',
            'label': ""
        })
        .update();
    }else if(typeGraphe=="Undirected Weighted"){
      this.cy.style()
            .selector('edge') // Apply the style to all edges
            .style({
                'width': 4,
                'line-color': this.COLOR_LINE_EDGE,
                'target-arrow-color': this.TARGET_ARROW_COLOR,
                'target-arrow-shape': 'triangle',
                'color': this.DATA_EDGE_COLOR,
                'curve-style': 'haystack',
                'label': "data(weight)",
                'text-margin-y': -12
            })
            .update();
    }else if(typeGraphe=="Undirected Unweighted"){
      this.cy.style()
            .selector('edge') // Apply the style to all edges
            .style({
                'width': 4,
                'line-color': this.COLOR_LINE_EDGE,
                'target-arrow-color': this.TARGET_ARROW_COLOR,
                'target-arrow-shape': 'triangle',
                'color': this.DATA_EDGE_COLOR,
                'curve-style': 'haystack',
                'label': ""
            })
            .update();
    }
  }
  /**
   * Create a graph from a list of edges.
   *
   * @param {ScreenboxComponent} container - The container object containing graph-related properties.
   * @param {GrapheFromEdgesListComponent} container2 - Another container object.
   */
  createGrapheFromListEdges(container:any,container2:any):void{
    const elements:any=container2.sendElements();
    let err:boolean=false;
    let cyElements:any=this.cy.elements();
    let cyType:string=this.typeGraphe;
    if(elements){
      this.cy.elements().remove();
      let typeGraphe:string=elements[0].type;
      container.typeGraphe=this.typeGraphe=typeGraphe;
      this.changeStyleGraphe(typeGraphe);
      let i:number=0;
      for(let element of elements){
        const nodeExists = this.cy.getElementById(element.source).nonempty();
        const nodeExists1 = this.cy.getElementById(element.target).nonempty();
        if(element.source==""){
          container.message=this.translate.instant("grapheFromEdgeList.msg1");
          err=true;
          break;
        }else if(!nodeExists){
          const pos = this.POSITIONS[i++];
          this.cy.add({ group: 'nodes', data: { id: element.source}, position: pos });
        }
        if(element.target==""){
          err=true;
          container.message=this.translate.instant("grapheFromEdgeList.msg1");
          break;
        }else if(!nodeExists1){
          const pos = this.POSITIONS[i++];
          this.cy.add({ group: 'nodes', data: { id: element.target}, position: pos });
        }
      }
      if(!err){
        elements.forEach((element:any)=>{
          if(typeGraphe.split(' ')[1]=="Weighted"){
            if(element.source && element.target && element.weight){
                this.cy.add({data:{
                  source: element.source,
                  target: element.target,
                  weight: element.weight
                }
                }); 
            }
          }else{
            if(element.source && element.target){
              this.cy.add({
                data: {
                source: element.source,
                target: element.target,
                }
              }); 
            }
          }
        })
      const screen=container.el.nativeElement.querySelector('.screen');
      const buttonManupilation=container.el.nativeElement.querySelector('.buttonManupilation');
      const addGrapheFromEdgesList=container.el.nativeElement.querySelector('.addGrapheFromEdgesList');
      screen.style.display="block";
      buttonManupilation.style.display="block";
      addGrapheFromEdgesList.style.display="none";
      container2.listEdgeTextArea="";
      container.message=this.translate.instant("grapheFromEdgeList.msg7");////
      container.restoreArray=[];
      container.changeSelect="";
      }else{
        container.typeGraphe=this.typeGraphe=cyType;
        this.changeStyleGraphe(typeGraphe);
        this.cy.elements().remove();
        this.cy.add(cyElements);
      }
    }else{
      container.message=this.translate.instant("grapheFromEdgeList.msg1");
    }
  }
  /**
   * Reject the generation of a graph from a list of edges.
   *
   * @param {ScreenboxComponent} container - The container object containing graph-related properties.
   * @param {GrapheFromEdgesListComponent} container2 - Another container object.
   */
  rejeterGenerateGraphFromListEdges(container:any,container2:any):void {
    const screen=container.el.nativeElement.querySelector('.screen');
    const buttonManupilation=container.el.nativeElement.querySelector('.buttonManupilation');
    const addGrapheFromEdgesList=container.el.nativeElement.querySelector('.addGrapheFromEdgesList');
    screen.style.display="block";
    buttonManupilation.style.display="block";
    addGrapheFromEdgesList.style.display="none";
    container2.listEdgeTextArea="";
    container.message=this.translate.instant("grapheFromEdgeList.msg6");///////Change this message
    container.changeSelect="";
  }
  /**
   * Get the density of the graph.
   *
   * @returns {number} - The density of the graph.
   */
  getDensityOfGraphe():number{
    if(this.cy.nodes().length){
      if(this.typeGraphe.split(' ')[0] == 'Directed'){
        return this.cy.edges().length/(this.cy.nodes().length*(this.cy.nodes().length-1));
      }else{
        return (2*this.cy.edges().length)/(this.cy.nodes().length*(this.cy.nodes().length-1));
      }
    }else{
      return 0;
    }
  }
  /**
   * Get an array of node IDs in the graph.
   *
   * @returns {Array<string>} - An array of node IDs.
   */
  getNodeIds():Array<any>{
    const nodes:Array<any> = [];
    this.cy.nodes().forEach((node:any)=>{
      nodes.push(node.data('id'));
    })
    return nodes;
  }
  /**
   * Calculate the incidence matrix of the graph.
   *
   * @returns {Array<any>} - The incidence matrix of the graph.
   */
  incidenceMatrix():Array<any> {
    const nodes = this.cy.nodes();
    const edges = this.cy.edges();
  
    // Create an empty incidence matrix
    const incidenceMatrix:Array<any> = [];
  
    // Initialize an empty matrix with rows corresponding to nodes and columns to edges
    for (let i = 0; i < nodes.length; i++) {
      const row = [];
      for (let j = 0; j < edges.length; j++) {
        row.push(0); // Initialize all elements to 0
      }
      incidenceMatrix.push(row);
    }
  
    // Iterate over edges and populate the incidence matrix
    edges.forEach((edge:any, edgeIndex:any) => {
      const sourceNode = edge.source();
      const targetNode = edge.target();
  
      // Find the indices of the source and target nodes in the nodes array
      const sourceIndex = nodes.indexOf(sourceNode);
      const targetIndex = nodes.indexOf(targetNode);
  
      // Set the corresponding cells in the matrix to 1 or -1 to indicate incidence
      if(sourceIndex==targetIndex){
        incidenceMatrix[sourceIndex][edgeIndex] = 2;
      }else if(this.typeGraphe.split(' ')[0]=="Directed"){
        incidenceMatrix[targetIndex][edgeIndex] = 1;
        incidenceMatrix[sourceIndex][edgeIndex] = -1;
      }else{
        incidenceMatrix[sourceIndex][edgeIndex] = 1;
        incidenceMatrix[targetIndex][edgeIndex] = 1;
      }
    });
  
    return incidenceMatrix;
  }
  /**
   * Get an array of edge IDs in the graph.
   *
   * @returns {Array<string>} - An array of edge IDs.
   */
  getEdgeIds():Array<any>{
    const edges:Array<any> = [];
    this.cy.edges().forEach((edge:any)=>{
      let edgeText:string="";
      if(this.typeGraphe.split(' ')[0]=="Directed"){
        edgeText=`${edge.source().id()} > ${edge.target().id()}`;
      }else{
        edgeText=`${edge.source().id()} - ${edge.target().id()}`;
      }
      edges.push(edgeText);
    })
    return edges;
  }
  /**
   * Remove an edge from the graph.
   *
   * @param {ScreenboxComponent} container - The container for the graph.
   * @param {RemoveEdgeComponent} container2 - Additional container.
   */
  removeEdge(container:any,container2:any):void{
    let exist: boolean=false;
    const edges = this.cy.edges();
    let edgeI:any;
    if(this.typeGraphe.split(' ')[0]=="Undirected"){
      for(let edge of edges){
        if((edge.source().id()==container2.sourceId && edge.target().id()==container2.targetId)||(edge.target().id()==container2.sourceId && edge.source().id()==container2.targetId)){
          edgeI=edge;
          exist=true;
          break;
        }
      }
    }else{
      for(let edge of edges){
        if(edge.source().id()==container2.sourceId && edge.target().id()==container2.targetId){
          edgeI=edge;
          exist=true;
          break;
        }
      }
    }
    
    if(exist){
      this.cy.remove(edgeI);
      let elem={status:"remove",element:edgeI};
      container.restoreArray.push(elem);
      const formRemoveEdge = container.el.nativeElement.querySelector('.formRemoveEdge');
      formRemoveEdge.style.display="none";
      container.message=this.translate.instant("grapheS.msg48",{source:container2.sourceId,target:container2.targetId});
      container2.sourceId="";
      container2.targetId="";
      container.remove="";
    }else{
      container.message=this.translate.instant("grapheS.msg47",{source:container2.sourceId,target:container2.targetId});
    }
  }
  /**
   * Reject the removal of an edge from the graph.
   *
   * @param {ScreenboxComponent} container - The container for the graph.
   * @param {RemoveEdgeComponent} container2 - Additional container.
   */
  RejeterRemoveEdge(container:any,container2:any):void{
    const formRemoveEdge = container.el.nativeElement.querySelector('.formRemoveEdge');
    formRemoveEdge.style.display="none";
    container2.sourceId="";
    container2.targetId="";
    container.remove="";
    container.message=this.translate.instant("grapheS.msg46");
  }
  /**
   * Remove a node from the graph.
   *
   * @param {ScreenboxComponent} container - The container for the graph.
   * @param {RemoveNodeComponent} container2 - Additional container.
   */
  removeNode(container:any,container2:any):void{
    let node:any=this.cy.getElementById(container2.nodeId);
    let exist:boolean=node.isNode();
    if(exist){
      node.remove();
      let elem={status:"remove",element:node};
      container.restoreArray.push(elem);
      //
      container.message=this.translate.instant("grapheS.msg52",{nodeId:container2.nodeId});
      const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
      const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
      const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
      const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
      const formAddNode = container.el.nativeElement.querySelector('.formAddNode');
      const formRemoveEdge = container.el.nativeElement.querySelector('.formRemoveEdge');
      const formRemoveNode = container.el.nativeElement.querySelector('.formRemoveNode');
      formChangeNodeId.style.display="none";
      formAddEdge.style.display="none";
      formChangeColor.style.display="none";
      formAChangeSizeScreen.style.display="none";
      formAddNode.style.display="none";
      formRemoveEdge.style.display="none";
      formRemoveNode.style.display="none";
      container2.nodeId="";
      container.remove="";
    }else{
      container.message=this.translate.instant("grapheS.msg53",{nodeId:container2.nodeId});
    }
  }
  /**
   * Reject the removal of a node from the graph.
   *
   * @param {ScreenboxComponent} container - The container for the graph.
   * @param {RemoveNodeComponent} container2 - Additional container.
   */
  RejeterRemoveNode(container:any,container2:any):void{
    const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
    const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
    const formAddNode = container.el.nativeElement.querySelector('.formAddNode');
    const formRemoveEdge = container.el.nativeElement.querySelector('.formRemoveEdge');
    const formRemoveNode = container.el.nativeElement.querySelector('.formRemoveNode');
    container.message=this.translate.instant("grapheS.msg51");
    formChangeNodeId.style.display="none";
    formAddEdge.style.display="none";
    formChangeColor.style.display="none";
    formAChangeSizeScreen.style.display="none";
    formAddNode.style.display="none";
    formRemoveEdge.style.display="none";
    formRemoveNode.style.display="none";
    container2.nodeId="";
    container.remove="";
  }
  /**
   * Get the adjacency list of the graph.
   *
   * @returns {Array<any>} - The adjacency list of the graph.
   */
  getAdjancyList():Array<any>{
    const adjacencyList:Array<any> = [];
      this.cy.nodes().forEach((node:any) => {
        const outgoingEdges = node.outgoers();
        const incomersEdges = node.incomers();
        let adjNode:Array<any>=outgoingEdges.map((edge:any) => edge.target().id());
        let elements:Array<any>=incomersEdges.map((edge:any) => edge.source().id());
        let adjanString:string="";
        adjNode = adjNode.filter(item => item !== undefined);
        elements = elements.filter(item => item !== undefined);
        for(let i:number=0;i<adjNode.length;i++){
          if(this.typeGraphe.split(" ")[1]!="Weighted"){
            if(i!=adjNode.length-1){
              adjanString+=`${adjNode[i]} ~> `;
            }else{
              adjanString+=`${adjNode[i]}`
            }
          }else{
            let edge:any;
            for(let element of this.cy.edges()){
              if(element.target().id()==adjNode[i] && element.source().id()==node.id()){
                edge=element;
                break;
              }
            }
            if(i!=adjNode.length-1){
              adjanString+=`${adjNode[i]} (${edge.data("weight")}) ~> `;
            }else{
              adjanString+=`${adjNode[i]} (${edge.data("weight")})`
            }
          }
          
        }
        if(this.typeGraphe.split(" ")[0]!="Directed"){
          for(let i:number=0;i<elements.length;i++){
            if(this.typeGraphe.split(" ")[1]!="Weighted"){
              if(i==0 && adjNode.length){
                adjanString+=` ~> ${elements[i]} ~> `;
              }else if(i!=elements.length-1){
                adjanString+=` ${elements[i]} ~> `;
              }else{
                adjanString+=`${elements[i]}`;
              }
            }else{
              let edge:any;
              for(let element of this.cy.edges()){
                if(element.source().id()==adjNode[i] && element.target().id()==node.id()){
                  edge=element;
                  break;
                }
              }
              if(i==0 && adjNode.length){
                adjanString+=` ~> ${elements[i]} (${edge.data("weight")}) ~> `;
              }else if(i!=elements.length-1){
                adjanString+=` ${elements[i]} (${edge.data("weight")}) ~> `;
              }else{
                adjanString+=`${elements[i]} (${edge.data("weight")})`;
              }
            }
              
          }
        }
        if(adjanString){
          if(adjanString.slice(-3)=="~> "){
            adjanString+=" NULL";
          }else {
            adjanString+=" ~> NULL";
          }
        }
        const adjacencyListEntry = {
          node: node.id(),
          adjacentNodes: adjanString
        };
        adjacencyList.push(adjacencyListEntry);
        });
    return adjacencyList;
  }
}
