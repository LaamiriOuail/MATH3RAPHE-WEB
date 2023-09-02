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
  alphabets0: string[] = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);
  alphabets: string[] = this.alphabets0.concat(this.alphabets0.map(letter => letter + '1'));
  Alphabets: string[] = this.alphabets.concat(this.alphabets0.map(letter => letter + '2'));
  counter:number = 0;
  position:any;
  //----------------------------------------------------------------
  private COLOR_NODE:any="white";
  private BACKGROUND_COLOR_NODE:any="black";
  private COLOR_LINE_EDGE:any="black";
  private TARGET_ARROW_COLOR:any="blue";
  private DATA_EDGE_COLOR:any="red";
  //----------------------------------------------------------------
  private TARGET_ARROW_COLOR_ALGO:any="black"; 
  private COLOR_LINE_EDGE_ALGO:any="yellow";
  private COLOR_NODE_ALGO:any="black";
  private BACKGROUND_COLOR_NODE_ALGO:any="yellow";
  private DATA_EDGE_COLOR_ALGO:any="blue";
  //----------------------------------------------------------------
  constructor(private translate:TranslateService) { 
    
  }
  changeNodeEnum(container:any):void{
    if(this.typeGraphe!=""){
      //DRY
      container.selectedNode=[];
      container.algorithm="";
      container.saveUpload = "";
      container.remove="";
      container.containerHeight=50;
      this.resetColors();
      const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
      const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
      const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
      formChangeNodeId.style.display="none";
      formAddEdge.style.display="none";
      formChangeColor.style.display="none";
      container.changeSelect="";
      //
    }else{
      container.nodeName="numerique";
    }
    
  }
  changeChanges(container:any){
    if(this.typeGraphe!=""){
      //DRY
      container.selectedNode=[];
      container.algorithm="";
      container.saveUpload = "";
      container.remove="";
      container.containerHeight=50;
      container.buttonClicked="";
      const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
      const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
      const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
      const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
      formChangeNodeId.style.display="none";
      formAddEdge.style.display="none";
      formChangeColor.style.display="none";
      formAChangeSizeScreen.style.display="none";
      this.position="";
      this.resetColors();
      //
      if(container.changeSelect=="changeIdNode"){
        container.message=this.translate.instant("grapheS.msg24")
      }else if(container.changeSelect=="changeColorNodes" || container.changeSelect=="changeColorEdges" || container.changeSelect=="changeColorNodesAlgo" || container.changeSelect=="changeColorEdgesAlgo" || container.changeSelect=="changeColorScreen"){
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
      }else if(container.changeSelect=="changeSizeScreen"){
        container.message=this.translate.instant("grapheS.msg39")
        formAChangeSizeScreen.style.display="block";
      }
    }else{
      container.changeSelect="";
    }
    

  }
  changeTypeGraphe(container:any):void{
    //DRY
    container.selectedNode=[];
    container.buttonClicked="";
    container.algorithm="";
    container.saveUpload = "";
    container.remove="";
    this.Alphabets=this.alphabets.concat(this.alphabets0.map(letter => letter + '2'));
    this.counter=0;
    //
    
    this.typeGraphe=container.typeGraphe;
    this.resetColors();
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
    const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
    const formAddNode=container.el.nativeElement.querySelector('.formAddNode');
    formAChangeSizeScreen.style.display="none";
    formAddNode.style.display="none";
    formChangeNodeId.style.display="none";
    formAddEdge.style.display="none";
    this.position="";
    container.containerHeight=50;
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
    if(this.typeGraphe!=""){
      //DRY
      container.changeSelect="";
      container.selectedNode=[];
      container.algorithm="";
      container.saveUpload = "";
      container.remove="";
      container.containerHeight=50;
      //
      const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
      const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
      const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
      const formAddNode=container.el.nativeElement.querySelector('.formAddNode');
      formAddNode.style.display="none";
      formAChangeSizeScreen.style.display="none";
      this.position="";
      formAddEdge.style.display="none";
      formChangeNodeId.style.display="none";
    
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
        container.message=this.translate.instant("grapheS.msg6");
        this.Alphabets=this.alphabets.concat(this.alphabets0.map(letter => letter + '2'));
        this.counter=0;
        this.restoreGraphe(container);
      }
    }else{
      container.buttonClicked="";
    }
  }
  changeSizeScreen(container:any,container2:any):void{
    const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
    const screen=container.el.nativeElement.querySelector('.scr');
    if(container2.height){
      screen.style.height =container2.height+'px';
      container.message=this.translate.instant("grapheS.msg37",{height:container2.height});
    }else{
      container.message=this.translate.instant("grapheS.msg38");
    }
    container.changeSelect="";
    container2.height=null;
    formAChangeSizeScreen.style.display="none";
  }
  RejeterChangeSizeScreen(container:any,container2:any):void{
    const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
    container2.height=null;
    container.changeSelect="";
    formAChangeSizeScreen.style.display="none";
    container.message=this.translate.instant("grapheS.msg40")
  }
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
  RejeterAddEdgeWeighted(container:any,container2:any):void{
    container.selectedNode=[];
    container.weight=null;
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    formAddEdge.style.display='none';
    this.resetColors();
    container.message=this.translate.instant("grapheS.msg9");
    container2.weightForm=null;
  }
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
  RejeterChangeNodeId(container:any,container2:any):void{
    const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
    formChangeNodeId.style.display = 'none';
    container.selectedNode=[];
    container2.newNodeId=null;
    this.resetColors();
    container.message=this.translate.instant("grapheS.msg22");
  }
  changeColor(container:any,container2:any){
    const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
    const screen=container.el.nativeElement.querySelector('.scr');
    if(container.changeSelect=="changeColorNodes"){
      this.COLOR_NODE=container2.color;
      this.BACKGROUND_COLOR_NODE=container2.bgColor;
      this.changeColorNodes();
      container.message=this.translate.instant("grapheS.msg30")
    }else if(container.changeSelect=="changeColorEdges"){
      if(this.typeGraphe.split(" ")[1]=="Weighted"){
        this.DATA_EDGE_COLOR=container2.color;
      }
      this.COLOR_LINE_EDGE=container2.bgColor;
      if(this.typeGraphe.split(" ")[0]=="Directed"){
        this.TARGET_ARROW_COLOR=container2.fColor;
      }
      this.changeColorEdges();
      container.message=this.translate.instant("grapheS.msg31")
    }else if(container.changeSelect=="changeColorNodesAlgo"){
      this.COLOR_NODE_ALGO=container2.color;
      this.BACKGROUND_COLOR_NODE_ALGO=container2.bgColor;
      container.message=this.translate.instant("grapheS.msg32")
    }else if(container.changeSelect=="changeColorEdgesAlgo"){
      if(this.typeGraphe.split(" ")[1]=="Weighted"){
        this.DATA_EDGE_COLOR_ALGO=container2.color;
      }
      this.COLOR_LINE_EDGE_ALGO=container2.bgColor;
      if(this.typeGraphe.split(" ")[0]=="Directed"){
        this.TARGET_ARROW_COLOR_ALGO=container2.fColor;
      }
      container.message=this.translate.instant("grapheS.msg33")
    }else if(container.changeSelect=="changeColorScreen"){
      screen.style.backgroundColor=container2.bgColor;
    }
    container.changeSelect="";
    formChangeColor.style.display="none";
  }
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
  RejeterAddNode(container:any,container2:any):void{
    const formAddNode=container.el.nativeElement.querySelector('.formAddNode');
    formAddNode.style.display="none";
    this.position="";
    container2.nodeId=null;
  }
  OnScreenTap(container:any):void{
    this.cy.on('tap', (evt:any)=> {
      if (evt.target === this.cy && container.buttonClicked==="addVertices" && this.typeGraphe!="") {
          let pos = evt.position || evt.cyPosition;
          let node:any;
          if(container.nodeName=="numerique"){
            this.cy.nodes().forEach((node:any)=>{
              if(node.data('id')==this.counter+1){
                ++this.counter;
              }
            })
            node=this.cy.add({ group: 'nodes', data: { id: ++this.counter}, position: pos });
          }else if(container.nodeName=="alphabic"){
            this.cy.nodes().forEach((node:any)=>{
              if(node.data('id')==this.Alphabets[0]){
                this.Alphabets.shift();
              }
            })
            node=this.cy.add({ group: 'nodes', data: { id: this.Alphabets.shift()}, position: pos });
          }else if(container.nodeName=="customText"){
            const formAddNode=container.el.nativeElement.querySelector('.formAddNode');
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
  changeColorNode(node:any,bgcolor:string,color:string,time:number=10): void {
    setTimeout(() => {
      node.style('background-color',bgcolor);
      node.style('color',color);
    },time);
  }
  changeColorEdge(edge:any,color:any,lineEdgeColor:any,targetArrowColor:any,time:number=10): void {
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
  changeColorNodes(): void {
    setTimeout(() => {
      this.cy.nodes().forEach((node:any)=>{
        node.style('background-color',this.BACKGROUND_COLOR_NODE);
        node.style('color',this.COLOR_NODE);
      })
    },10)
  }
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

  onRemoveChange(container:any):void{
    if(container.typeGraphe!=""){
      //DRY
      container.changeSelect="";
      container.buttonClicked="";
      container.containerHeight=50;
      container.selectedNode=[];
      container.algorithm="";
      //
      const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
      const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
      const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
      const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
      formChangeNodeId.style.display="none";
      formAddEdge.style.display="none";
      formChangeColor.style.display="none";
      formAChangeSizeScreen.style.display="none";
      container.grapheS.position="";
      if(container.remove=="reset graphe"){
        container.nodeId=0;
        this.cy.remove(this.cy.elements());
        container.message=this.translate.instant("grapheS.msg17");
      }
    }else{
      container.remove="";
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
  isEdgeRemove(node1:any,node2:any,container:any):void{
      this.cy.edges().forEach((edge:any)=>{
        if((edge.source().id()==node1 && edge.target().id()==node2) || (edge.source().id()==node2 && edge.target().id()==node1)){
          this.cy.remove(edge);
          let elem={status:"remove",element:edge};
          container.restoreArray.push(elem);
        }
      })
  }
}
