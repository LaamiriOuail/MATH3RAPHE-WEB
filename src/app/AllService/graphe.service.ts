import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as cytoscape from 'cytoscape';
// import {cytoscape} from 'cytoscape';


@Injectable({
  providedIn: 'root'
})
export class GrapheService {
  public cy:any;
  public typeGraphe:string="";
  //----------------------------------------------------------------
  private COLOR_NODE:string="white";
  private BACKGROUND_COLOR_NODE:string="black";
  private COLOR_LINE_EDGE:string="black";
  private TARGET_ARROW_COLOR:string="blue";
  private DATA_EDGE_COLOR:string="red";
  //----------------------------------------------------------------
  private TARGET_ARROW_COLOR_ALGO:string="black"; 
  private COLOR_LINE_EDGE_ALGO:string="yellow";
  private COLOR_NODE_ALGO:string="black";
  private BACKGROUND_COLOR_NODE_ALGO:string="yellow";
  private DATA_EDGE_COLOR_ALGO:string="blue";
  //----------------------------------------------------------------
  constructor(private translate:TranslateService) { }
  changeTypeGraphe(container:any):void{
    //DRY
    container.selectedNode=[];
    container.buttonClicked="";
    container.algorithm="";
    container.saveUpload = "";
    container.remove="";
    //
    this.typeGraphe=container.typeGraphe;
    this.resetColors();
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    container.containerHeight=70;
    formAddEdge.style.display="none";
    container.nodeId=0;
    this.cy.remove(this.cy.elements());
    container.message=this.translate.instant("grapheS.msg1");
    if (this.typeGraphe === "Directed Weighted") {
      this.cy.style()
          .selector('edge') // Apply the style to all edges
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
          container.message+=this.translate.instant("grapheS.msg18")+" "+this.translate.instant("grapheS.msg20");

      }else if (this.typeGraphe === "Directed Unweighted") {
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
          container.message+=this.translate.instant("grapheS.msg18")+" "+this.translate.instant("grapheS.msg21");
      } else if (this.typeGraphe === "Undirected Weighted") {
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
          container.message+=this.translate.instant("grapheS.msg19")+" "+this.translate.instant("grapheS.msg20");;
      } else if (this.typeGraphe === "Undirected Unweighted") {
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
        container.message+=this.translate.instant("grapheS.msg19")+" "+this.translate.instant("grapheS.msg21");;
      }
  }
  onChangeButtonClicked(container:any):void{
    //DRY
    container.selectedNode=[];
    container.algorithm="";
    container.saveUpload = "";
    container.remove="";
    container.containerHeight=70;
    //
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    formAddEdge.style.display="none";
    if(this.typeGraphe!=""){
      if(container.buttonClicked=="default"){
        container.message=this.translate.instant("grapheS.msg2");
        this.cy.fit();
      }else if(container.buttonClicked=="addVertices"){
        container.message=this.translate.instant("grapheS.msg3");
      }else if(container.buttonClicked=="addEdges"){
        container.message=this.translate.instant("grapheS.msg4");
      }else if(container.buttonClicked=="removeObject"){
        container.message=this.translate.instant("grapheS.msg5");
      }
      //New code
      else if(container.buttonClicked=="restore"){
        container.message=this.translate.instant("grapheS.msg6");
        this.restoreGraphe(container);
      }
    }
  }
  addWeightedEdge(container:any,container2:any):void{
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    if(container.weight!=0){
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
  RejeterAddEdgeWeighted(container:any,container2:any):void{
    container.selectedNode=[];
    container.weight=null;
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    formAddEdge.style.display='none';
    this.resetColors();
    container.message=this.translate.instant("grapheS.msg9");
    container2.weightForm=null;
  }
  OnScreenTap(container:any):void{
    this.cy.on('tap', (evt:any)=> {
      if (evt.target === this.cy && container.buttonClicked==="addVertices" && this.typeGraphe!="") {
          var pos = evt.position || evt.cyPosition;
          let node=this.cy.add({ group: 'nodes', data: { id: ++container.nodeId}, position: pos });
           //NEW CODE
           let elem={status:"add",element:node};
           container.restoreArray.push(elem);
           //
          container.message=this.translate.instant("grapheS.msg10",{nodeId:container.nodeId});
      }
    });
  }
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
  OnNodeTap(container:any):void{
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
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
      }
  });
  this.cy.emit("tap");
  }
  OnInit(Container:any):void{
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
  resetColors(): void {
    setTimeout(() => {
      this.cy.nodes().style('background-color', this.BACKGROUND_COLOR_NODE);
      this.cy.nodes().style('color', this.COLOR_NODE);
      this.cy.edges().style('line-color', this.COLOR_LINE_EDGE);
      this.cy.edges().style('color', this.DATA_EDGE_COLOR);
      this.cy.edges().style('target-arrow-color', this.TARGET_ARROW_COLOR);
    },10)
  }
  changeColorNode(node:any,bgcolor:string,color:string): void {
    setTimeout(() => {
      node.style('background-color',bgcolor);
      node.style('color',color);
    },10)
  }
  OnMessageLengthChange(container:any):void {
    const specialLength = 150; // Adjust this as needed 103
    const height = 70; // Initial height of the zone
    container.containerHeight=height* (container.message.length/103 + 1);
  }
  onRemoveChange(container:any):void{
    //DRY
    container.buttonClicked="";
    container.containerHeight=70;
    container.selectedNode=[];
    container.algorithm="";
    //
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    formAddEdge.style.display="none";
    if(container.remove=="reset graphe"){
      container.nodeId=0;
      this.cy.remove(this.cy.elements());
      container.message=this.translate.instant("grapheS.msg17");
    }
  }
  searcheEdgeChnageBC(container:any,source:string,target:string,lineColor:string):void{
    const edges = this.cy.elements('edge'); // Select only edges
    edges.forEach((edge:any) => {
        const edgeSourceId = edge.source().id();
        const edgeTargetId = edge.target().id();
        if (edgeSourceId === source && edgeTargetId === target) {
            edge.style('line-color', lineColor);
        }
    });
  }
  restoreGraphe(container:any):void{
    if(container.restoreArray.length!=0){
      let elem=container.restoreArray.pop();
      let element=elem.element;
      if(elem.status=="add"){
        if(element.isNode() || element.isEdge()){
          element.remove();
        }
      }else{
        if(element.isNode() || element.isEdge()){
          this.cy.add(element);
        }
      }
    }
  }
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
  OnDestroy():void{
    this.cy.destroy();
  }
  matrixAdjancy():any{
    let adjacencyMatrix:Array<any>=[];
    const nodes = this.cy.nodes();
    const numNodes = nodes.length;

    for (let i = 0; i < numNodes; i++) {
      const row = [];
      for (let j = 0; j < numNodes; j++) {
        const edge = nodes[i].edgesTo(nodes[j]);
        row.push(edge.length ? (edge.data('weight')?edge.data('weight'):1): 0);
      }
      adjacencyMatrix.push(row);
    }
    return adjacencyMatrix;
  }
}
