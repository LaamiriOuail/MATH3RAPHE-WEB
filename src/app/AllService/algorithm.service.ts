import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  constructor(private translate: TranslateService) { }
  bfsAnimation(rootNodeId: string,container:any): void {
    const root = container.grapheS.cy.$(`#${rootNodeId}`);
    const visited = new Set();
    const path: { [nodeId: string]: string } = {}; // To store the BFS path
    
    container.grapheS.cy.elements().bfs({
      roots: root,
      visit: (v:any, e:any, u:any, i:any, depth:any) => {
        setTimeout(() => {
          visited.add(v.id());
          v.style('background-color', container.grapheS.BACKGROUND_COLOR_NODE_ALGO); // Update node color
          v.style('color',container.grapheS.COLOR_NODE_ALGO);
          if (u && e) {
            u.style('background-color', container.grapheS.BACKGROUND_COLOR_NODE);
            u.style('color', container.grapheS.COLOR_NODE);
            e.style('line-color', container.grapheS.COLOR_LINE_EDGE_ALGO); // Update edge color
            e.style('target-arrow-color', container.grapheS.TARGET_ARROW_COLOR_ALGO);
            e.style('color', container.grapheS.DATA_EDGE_COLOR_ALGO)
            path[v.id()] = u.id();
          }
          if (i === visited.size - 1) {
            this.printBFSPath(rootNodeId, path, v.id(),container); // Print path when all nodes are visited
          }
        }, i * 2000); // Animation delay
      },
      directed: (container.grapheS.typeGraphe.split(" ")[0]=="Directed")
    });
  }
  printBFSPath(rootNodeId: string, path: { [nodeId: string]: string }, targetNodeId: string,container:any): void {
    const pathNodes = [];
    let currentNode = targetNodeId;
  
    while (currentNode !== rootNodeId) {
      pathNodes.push(currentNode);
      currentNode = path[currentNode];
    }
    pathNodes.push(rootNodeId);
  
    const bfsPathString = pathNodes.reverse().join(' -> ');
    container.message=this.translate.instant('algoS.msg1')+ bfsPathString;
  }
  dfsAnimation(rootNodeId: string, container: any): void {
    const root = container.grapheS.cy.$(`#${rootNodeId}`);
    const visited = new Set();
    const path: { [nodeId: string]: string } = {}; // Pour stocker le chemin DFS
    
    container.grapheS.cy.elements().dfs({
        roots: root,
        visit: (v: any, e: any, u: any, i: any, depth: any) => {
            setTimeout(() => {
                visited.add(v.id());
                v.style('background-color', container.grapheS.BACKGROUND_COLOR_NODE_ALGO); // Update node color
                v.style('color',container.grapheS.COLOR_NODE_ALGO);

                if (u && e) {
                  u.style('background-color', container.grapheS.BACKGROUND_COLOR_NODE);
                  u.style('color', container.grapheS.COLOR_NODE);
                  e.style('line-color', container.grapheS.COLOR_LINE_EDGE_ALGO); // Update edge color
                  e.style('target-arrow-color', container.grapheS.TARGET_ARROW_COLOR_ALGO);
                  e.style('color', container.grapheS.DATA_EDGE_COLOR_ALGO)
                    path[v.id()] = u.id();
                }
                if (i === visited.size - 1) {
                    this.printDFSPath(rootNodeId, path, v.id(), container); // Afficher le chemin lorsque tous les nœuds sont visités
                }
            }, i * 2000); // Délai d'animation
        },
        directed: (container.grapheS.typeGraphe.split(" ")[0]=="Directed")
    });
}

printDFSPath(rootNodeId: string, path: { [nodeId: string]: string }, targetNodeId: string, container: any): void {
    const pathNodes = [];
    let currentNode = targetNodeId;

    while (currentNode !== rootNodeId) {
        pathNodes.push(currentNode);
        currentNode = path[currentNode];
    }
    pathNodes.push(rootNodeId);

    const dfsPathString = pathNodes.reverse().join(' -> ');
    container.message = this.translate.instant('algoS.msg2') + dfsPathString;
}

dijkstraAlgorithm(rootNodeId: string, container: any): void {
  const root = container.grapheS.cy.$(`#${rootNodeId}`);
  let directed=false;
  if(container.typeGraphe.split(" ")[0]=="Directed"){
    directed=true;
  }
  const dijkstra = container.grapheS.cy.elements().dijkstra({
      root: root,
      weight: (edge:any) => edge.data('weight')||1,
      directed:directed
  });
  container.message="||";
  container.grapheS.cy.nodes().forEach((node:any) => {
      if (node.id() !== rootNodeId) {
          const targetNodeId = node.data('id');
          const pathToTarget = dijkstra.pathTo(container.grapheS.cy.$(`#${targetNodeId}`));
          const distanceToTarget = dijkstra.distanceTo(container.grapheS.cy.$(`#${targetNodeId}`));
          const pathNodes = pathToTarget.nodes().map((node:any) => node.data('id'));
          const pathString = pathNodes.join(' -> ');
          container.message += this.translate.instant('algoS.msg4', { rootNodeId,targetNodeId,pathString,distanceToTarget });
        }
  });
}
dijkstraAnimation(rootNodeId: string, targetNodeId: string, container: any): void {
  const root = container.grapheS.cy.$(`#${rootNodeId}`);
  let directed = false;
  if (container.typeGraphe.split(" ")[0] === "Directed") {
    directed = true;
  }
  const dijkstra = container.grapheS.cy.elements().dijkstra({
    root: root,
    weight: (edge: any) => edge.data('weight') || 1,
    directed: directed
  });
  let i=1;
  const targetNode = container.grapheS.cy.$(`#${targetNodeId}`);
  const pathToTarget = dijkstra.pathTo(targetNode);
  const distanceToTarget = dijkstra.distanceTo(targetNode);
  const pathNodes = pathToTarget.nodes().map((node: any) => node.data('id'));
  let lastNode:any=pathToTarget.nodes().first();
  container.grapheS.changeColorNode(targetNode, container.grapheS.BACKGROUND_COLOR_NODE,container.grapheS.COLOR_NODE);
  pathToTarget.nodes().forEach((node: any) =>{
    setTimeout(() =>{
      node.style('background-color', container.grapheS.BACKGROUND_COLOR_NODE_ALGO);
      node.style('color',container.grapheS.COLOR_NODE_ALGO);
      console.log(i);
      if(i!=1){
        container.grapheS.searcheEdgeChnageBC(container,lastNode.data('id'),node.data('id'),container.grapheS.COLOR_LINE_EDGE_ALGO);
      }
      lastNode=node;
    },i*2000);
    i++;
  });
  const pathString = pathNodes.join(' -> ');
  container.message = this.translate.instant("algoS.msg3",{rootNodeId,targetNodeId,pathString,distanceToTarget});
}

floydWarshallAlgorithm(container: any): void {
  let directed = false;
  if (container.typeGraphe.split(" ")[0] === "Directed") {
    directed = true;
  }
  
  const cy = container.grapheS.cy;
  const floydWarshall = cy.elements().floydWarshall({
    weight: (edge: any) => edge.data('weight') || 1,
    directed: directed
  });

  container.message = "||";
  let space:string="     ";
  cy.nodes().forEach((nodeA: any) => {
    cy.nodes().forEach((nodeB: any) => {
      if (nodeA.id() !== nodeB.id()) {
        const distance = floydWarshall.distance(nodeA, nodeB);
        const pathToNodeB = floydWarshall.path(nodeA, nodeB);
        let rootNodeId=nodeA.data("id");
        let targetNodeId=nodeB.data("id");
        if (distance !== Infinity) {
          const pathNodes = pathToNodeB.nodes().map((node: any) => node.data('id'));
          const pathString = pathNodes.join(' -> ');
          container.message += this.translate.instant("algoS.msg5", { rootNodeId, targetNodeId, distance, pathString });
        } else {
          container.message += this.translate.instant("algoS.msg6",{rootNodeId, targetNodeId});
        }
      }
    });
  });
}
changeAlgorithm(container:any):void{
  if(container.typeGraphe!="" && container.grapheS.cy.nodes().length){
    //DRY
    container.changeSelect="";
    container.remove="";
    container.buttonClicked="";
    container.saveUpload = "";
    container.containerHeight=50;
    container.selectedNode=[];
    //
    container.grapheS.resetColors();
    const formChangeNodeId=container.el.nativeElement.querySelector('.formChangeNodeId');
    const formAddEdge = container.el.nativeElement.querySelector('.formAddEdges');
    const formAChangeSizeScreen = container.el.nativeElement.querySelector('.formAChangeSizeScreen');
    const formChangeColor = container.el.nativeElement.querySelector('.formChangeColor');
    const formAddNode = container.el.nativeElement.querySelector('.formAddNode');
    formChangeNodeId.style.display="none";
    formAddEdge.style.display="none";
    formAddNode.style.display="none";
    formChangeColor.style.display="none";
    formAChangeSizeScreen.style.display="none";
    container.grapheS.position="";
    container.message=this.translate.instant("algoS.msg7",{algorithm:container.algorithm});
    if(container.algorithm=="floydWarshall"){
      this.floydWarshallAlgorithm(container);
    }else if((container.algorithm=="dijkstra" || container.algorithm=="dijkstraAB")&& !this.isAllEdgePositive(container)){
      container.message=container.translate.instant("algoS.msg10");
      container.algorithm="";
    }else if(container.algorithm=="kruskal" || container.algorithm=="prime"){
      if(this.isGraphConnected(container)==true && container.typeGraphe.split(" ")[0]=="Undirected" /*&& container.typeGraphe.split(" ")[1]=="Weighted"*/){
        container.grapheS.resetColors();
        if(container.algorithm=="kruskal"){
          this.kruskalAnimation(container);
          container.message="Kruskal(MST): ";
        }else{
          this.primeAniamantion(container);
          container.message="Prime(MST): ";
        }
      }else{
        if(container.algorithm=="kruskal"){
          container.message=container.translate.instant("algoS.msg8");
        }else{
          container.message=container.translate.instant("algoS.msg12");
        }
      }
    }
  }else{
    if(!container.grapheS.cy.nodes().length){
      container.message=container.translate.instant("algoS.msg11");
    }
    container.algorithm="";
  }
}
bfs(node:any,visitedNodes:any):void {
  var queue = [node];
  visitedNodes.add(node.id());

  while (queue.length > 0) {
    var currentNode = queue.shift();
    var neighbors = currentNode.neighborhood().nodes();

    neighbors.forEach((neighbor:any) =>{
      if (!visitedNodes.has(neighbor.id())) {
        visitedNodes.add(neighbor.id());
        queue.push(neighbor);
      }
    });
  }
}
isGraphConnected(container:any):boolean{
  var startNode = container.grapheS.cy.nodes().first(); 
  var visitedNodes = new Set();
  this.bfs(startNode,visitedNodes);
  return visitedNodes.size === container.grapheS.cy.nodes().size();
}
isAllEdgePositive(container:any):boolean{
  let allPositive:boolean=true;
  if(container.typeGraphe.split(" ")[1]=="Weighted"){
    container.grapheS.cy.edges().forEach((edge:any)=>{
      if(edge.data('weight')<=0){
        allPositive=false;
      }
    })
  }
  return allPositive;
   
}
MinimumSpanningTreeEdges(container:any): Array<any> {
  const edges = container.grapheS.cy.edges().toArray();
  edges.sort((a:any, b:any) => {
    const weightA = a.data('weight') || 1;
    const weightB = b.data('weight') || 1;
    return weightA - weightB;
  });
  const treeEdges: Array<any> = [];
  const treeNodes = new Set<number>();
  for (const edge of edges) {
    const sourceId:any = edge.source().id();
    const targetId:any = edge.target().id();
    if (!treeNodes.has(sourceId) || !treeNodes.has(targetId)) {
      treeEdges.push(edge);
      treeNodes.add(sourceId);
      treeNodes.add(targetId);
    }
    if (treeEdges.length === container.grapheS.cy.nodes().length - 1) {
      break; // L'arbre de poids minimal est complet
    }
  }
  return treeEdges;
}
kruskalAnimation(container:any):void{
  let i:number=0;
  let j:number=0;
  this.MinimumSpanningTreeEdges(container).forEach((edge:any)=>{
    container.grapheS.changeColorEdge(edge,container.grapheS.DATA_EDGE_COLOR_ALGO,container.grapheS.COLOR_LINE_EDGE_ALGO,container.grapheS.TARGET_ARROW_COLOR_ALGO,j=++i*2000);
    if(i!=container.grapheS.cy.nodes().length - 1){
      setTimeout(()=>{
        container.message+=`(s:${edge.source().id()},t:${edge.target().id()},w:${edge.data("weight")||1})  ||`;
      },j)
    }else{
      setTimeout(()=>{
        container.message+=`(s:${edge.source().id()},t:${edge.target().id()},w:${edge.data("weight")||1})`;
      },j)
    }
  })
  container.grapheS.cy.nodes().forEach((node:any)=>{
     container.grapheS.changeColorNode(node, container.grapheS.BACKGROUND_COLOR_NODE_ALGO,container.grapheS.COLOR_NODE_ALGO,++i*2000);
  })
}
primeAniamantion(container:any):void{
  let i:number=0;
  let j:number=0;
  this.MinimumSpanningTreeEdges(container).forEach((edge:any)=>{
    container.grapheS.changeColorNode(edge.source(), container.grapheS.BACKGROUND_COLOR_NODE_ALGO,container.grapheS.COLOR_NODE_ALGO,++i*2000);
    container.grapheS.changeColorEdge(edge,container.grapheS.DATA_EDGE_COLOR_ALGO,container.grapheS.COLOR_LINE_EDGE_ALGO,container.grapheS.TARGET_ARROW_COLOR_ALGO,j=++i*2000);
    if(i/2!=container.grapheS.cy.nodes().length - 1){
      setTimeout(()=>{
        container.message+=`(s:${edge.source().id()},t:${edge.target().id()},w:${edge.data("weight")||1})  ||`;
      },j)
    }else{
      container.grapheS.changeColorNode(edge.target(), container.grapheS.BACKGROUND_COLOR_NODE_ALGO,container.grapheS.COLOR_NODE_ALGO,j);
      setTimeout(()=>{
        container.message+=`(s:${edge.source().id()},t:${edge.target().id()},w:${edge.data("weight")||1})`;
      },j)
    }
  })
}
}