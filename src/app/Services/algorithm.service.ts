import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
/**
 * Service for performing algorithms.
 *
 * @description This service provides functionality for algorithm animations.
 */
@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {
  /**
   * Creates an instance of AlgorithmService.
   *
   * @param {TranslateService} translate - The translation service.
   */
  constructor(private translate: TranslateService) { }

  /**
   * Perform a breadth-first search (BFS) animation.
   *
   * @param {string} rootNodeId - The ID of the root node for BFS.
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   */
  bfsAnimation(rootNodeId: string,container:any): void {
    const root = container.grapheS.cy.$(`#${rootNodeId}`);
    const visited:Array<string> = [];
    const path: { [nodeId: string]: string } = {}; // To store the BFS path
    let j:number=0;
    let bfs:any=container.grapheS.cy.elements().bfs({
      roots: root,
      visit: (v:any, e:any, u:any, i:any, depth:any) => {
        setTimeout(() => {
          visited.push(v.id());
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
          if (i == visited.length-1 ) {
            this.printBFSPath(rootNodeId, path, v.id(),container); // Print path when all nodes are visited
          }
        }, i * 2000); // Animation delay
        j=i;
      },
      directed: (container.grapheS.typeGraphe.split(" ")[0]=="Directed")
    });
    setTimeout(() => {
      let path:string="";
      for(let i:number=0;i<visited.length;i++) {
        if(i!=visited.length-1){
          path+=`\t${visited[i]}\t,`;
        }else{
          path+=`\t${visited[i]}\t`;
        }
      }
      container.message=`Bfs path: ${path}`;
    },++j*2000)
    container.algorithm="";
  }
  /**
   * Print the BFS path in the container message.
   *
   * @param {string} rootNodeId - The ID of the root node for BFS.
   * @param {Object} path - The BFS path object.
   * @param {string} targetNodeId - The ID of the target node.
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   */
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
  /**
 * Perform a depth-first search (DFS) animation and update node and edge styles.
 *
 * @param {string} rootNodeId - The ID of the root node for DFS.
 * @param {ScreenboxComponent} container - The container for the graph and visualization.
 */
  dfsAnimation(rootNodeId: string, container: any): void {
    const root = container.grapheS.cy.$(`#${rootNodeId}`);
    const visited:Array<string> = [];
    const path: { [nodeId: string]: string } = {}; // Pour stocker le chemin DFS
    let j:number=0;
    container.grapheS.cy.elements().dfs({
        roots: root,
        visit: (v: any, e: any, u: any, i: any, depth: any) => {
            setTimeout(() => {
                visited.push(v.id());
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
                if (i === visited.length - 1) {
                    this.printDFSPath(rootNodeId, path, v.id(), container); // Afficher le chemin lorsque tous les nœuds sont visités
                }
            }, i * 2000); // Délai d'animation
            j=i;
        },
        directed: (container.grapheS.typeGraphe.split(" ")[0]=="Directed")
    });
    setTimeout(() => {
      let path:string="";
      for(let i:number=0;i<visited.length;i++) {
        if(i!=visited.length-1){
          path+=`\t${visited[i]}\t,`;
        }else{
          path+=`\t${visited[i]}\t`;
        }
      }
      container.message=`Dfs path: ${path}`;
    },++j*2000)
    container.algorithm="";
  }

  /**
   * Print the DFS path and update the container's message.
   *
   * @param {string} rootNodeId - The ID of the root node for DFS.
   * @param {Object} path - The DFS path object.
   * @param {string} targetNodeId - The ID of the target node.
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   */
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

  /**
   * Perform Dijkstra's algorithm to find the shortest path and update node and edge styles.
   *
   * @param {string} rootNodeId - The ID of the root node for Dijkstra's algorithm.
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   */
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
    let lastMessage:string="||";
    let i:number=0;
    container.grapheS.cy.nodes().forEach((node:any) => {
        if (node.id() !== rootNodeId) {
            const targetNodeId = node.data('id');
            const pathToTarget = dijkstra.pathTo(container.grapheS.cy.$(`#${targetNodeId}`));
            const distanceToTarget = dijkstra.distanceTo(container.grapheS.cy.$(`#${targetNodeId}`));
            const pathNodes = pathToTarget.nodes().map((node:any) => node.data('id'));
            const pathString = pathNodes.join(' -> ');
            setTimeout(()=>{
              container.grapheS.resetColors();
              this.dijkstraAnimation(rootNodeId,targetNodeId,container);
              lastMessage += this.translate.instant('algoS.msg4', { rootNodeId,targetNodeId,pathString,distanceToTarget });
            },i++*10000);
          }
    });
    setTimeout(()=>{
      container.grapheS.resetColors();
      container.message=lastMessage;
    },i*10000)
    container.algorithm="";
  }
  /**
   * Animate Dijkstra's algorithm by updating node and edge styles.
   *
   * @param {string} rootNodeId - The ID of the root node for Dijkstra's algorithm.
   * @param {string} targetNodeId - The ID of the target node.
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   */
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
    container.algorithm="";
  }

  /**
   * Perform Bellman-Ford algorithm to find the shortest path and update node and edge styles.
   *
   * @param {string} rootNodeId - The ID of the root node for Bellman-Ford algorithm.
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   */
  bellmanFordAnimation(rootNodeId: string, targetNodeId: string, container: any): void {
    const root = container.grapheS.cy.$(`#${rootNodeId}`);
    let directed = false;
    if (container.typeGraphe.split(" ")[0] === "Directed") {
      directed = true;
    }
    const bellmanFord = container.grapheS.cy.elements().bellmanFord({
      root: root,
      weight: (edge: any) => edge.data('weight') || 1,
      directed: directed
    });
    let i=1;
    const targetNode = container.grapheS.cy.$(`#${targetNodeId}`);
    const pathToTarget = bellmanFord.pathTo(targetNode);
    const distanceToTarget = bellmanFord.distanceTo(targetNode);
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
    container.algorithm="";
  }

  /**
   * Animate Bellman-Ford algorithm by updating node and edge styles.
   *
   * @param {string} rootNodeId - The ID of the root node for Bellman-Ford algorithm.
   * @param {string} targetNodeId - The ID of the target node.
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   */
  bellmanFordAlgorithm(rootNodeId: string, container: any): void {
    const root = container.grapheS.cy.$(`#${rootNodeId}`);
    let directed=false;
    if(container.typeGraphe.split(" ")[0]=="Directed"){
      directed=true;
    }
    const bellmanFord = container.grapheS.cy.elements().bellmanFord({
        root: root,
        weight: (edge:any) => edge.data('weight')||1,
        directed:directed
    });
    let lastMessage:string="||";
    let i:number=0;
    container.grapheS.cy.nodes().forEach((node:any) => {
        if (node.id() !== rootNodeId) {
            const targetNodeId = node.data('id');
            const pathToTarget = bellmanFord.pathTo(container.grapheS.cy.$(`#${targetNodeId}`));
            const distanceToTarget = bellmanFord.distanceTo(container.grapheS.cy.$(`#${targetNodeId}`));
            const pathNodes = pathToTarget.nodes().map((node:any) => node.data('id'));
            const pathString = pathNodes.join(' -> ');
            setTimeout(()=>{
              container.grapheS.resetColors();
              this.bellmanFordAnimation(rootNodeId,targetNodeId,container);
              lastMessage += this.translate.instant('algoS.msg4', { rootNodeId,targetNodeId,pathString,distanceToTarget });
            },i++*10000);
          }
    });
    setTimeout(()=>{
      container.grapheS.resetColors();
      container.message=lastMessage;
    },i*10000)
    container.algorithm="";
  }

  /**
   * Perform Floyd-Warshall algorithm to find all-pairs shortest paths and update messages.
   *
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   */
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
    container.algorithm="";
  }

  /**
   * Change the selected algorithm and update the container's message.
   *
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   */
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
      const formRemoveEdge = container.el.nativeElement.querySelector('.formRemoveEdge');
      const formRemoveNode = container.el.nativeElement.querySelector('.formRemoveNode');
      formRemoveNode.style.display="none";
      formChangeNodeId.style.display="none";
      formAddEdge.style.display="none";
      formChangeColor.style.display="none";
      formAChangeSizeScreen.style.display="none";
      formAddNode.style.display="none";
      formRemoveEdge.style.display="none";
      container.grapheS.position="";
      container.message=this.translate.instant("algoS.msg7",{algorithm:container.algorithm});
      if(container.algorithm=="floydWarshall"){
        this.floydWarshallAlgorithm(container);
      }else if(container.algorithm=="tarjan"){
        if(container.typeGraphe.split(" ")[0]=="Directed"){
          this.tarjanStronglyComponentAnimation(container);
        }else{
          container.message=this.translate.instant("algoS.msg14");
          container.algorithm=""
        }
      }
      else if((container.algorithm=="dijkstra" || container.algorithm=="dijkstraAB")&& !this.isAllEdgePositive(container)){
        container.message=container.translate.instant("algoS.msg10");
        container.algorithm="";
      }else if(container.algorithm=="kruskal" || container.algorithm=="prime"){
        if(this.isGraphConnected(container)==true && container.typeGraphe.split(" ")[0]=="Undirected" /*&& container.typeGraphe.split(" ")[1]=="Weighted"*/){
          container.grapheS.resetColors();
          if(container.algorithm=="kruskal"){
            container.message="Kruskal(MST): ";
            this.kruskalAnimation(container);
          }else{
            container.message="Prime(MST): ";
            this.primeAniamantion(container);
          }
          container.algorithm=""
        }else{
          if(container.algorithm=="kruskal"){
            container.message=container.translate.instant("algoS.msg8");
          }else{
            container.message=container.translate.instant("algoS.msg12");
          }
          setTimeout(()=>{
            container.algorithm="";
          },2);
        }
      }
    }else{
      if(!container.grapheS.cy.nodes().length){
        container.message=container.translate.instant("algoS.msg11");
      }else if(container.typeGraphe==""){
        container.message=this.translate.instant("screenbox.msg23");
      }
      container.algorithm="";
    }
  }
  /**
   * Perform breadth-first search (BFS) starting from a given node and mark visited nodes.
   *
   * @param {any} node - The starting node for BFS.
   * @param {Set<string>} visitedNodes - A set to track visited node IDs.
   */
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

  /**
   * Check if the graph is connected by performing a breadth-first search (BFS) from a starting node.
   *
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   * @returns {boolean} True if the graph is connected; otherwise, false.
   */
  isGraphConnected(container:any):boolean{
    if(container.grapheS.cy?.nodes().length){
      var startNode = container.grapheS.cy.nodes().first(); 
      var visitedNodes = new Set();
      this.bfs(startNode,visitedNodes);
      return visitedNodes.size === container.grapheS.cy.nodes().size();
    }
    return false;
  }

  /**
   * Check if all edges in the graph are positive (weight > 0).
   *
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   * @returns {boolean} True if all edges have positive weights; otherwise, false.
   */
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

  /**
   * Find the minimum spanning tree edges using Kruskal's algorithm and return them as an array.
   *
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   * @returns {Array<any>} An array of minimum spanning tree edges.
   */
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

  /**
   * Animate Kruskal's algorithm by changing edge and node colors to visualize the minimum spanning tree.
   *
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   */
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
    container.algorithm="";
  }

  /**
   * Animate Prim's algorithm by changing edge and node colors to visualize the minimum spanning tree.
   *
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   */
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
    container.algorithm="";
  }
  /**
   * Get a random color.
   *
   * @returns {string} - A randomly generated color in hexadecimal format.
   */
  getRandomColor():string {
    const letters:string = '0123456789ABCDEF';
    let color:string = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  /**
   * Animate Tarjan's strongly connected components algorithm by changing node and edge colors.
   *
   * @param {ScreenboxComponent} container - The container for the graph and visualization.
   */
  tarjanStronglyComponentAnimation(container:any):void{
    const { cut, components } = container.grapheS.cy.elements().tarjanStronglyConnected();
    let message:string="";
    let i:number=0;
    container.message="Tarjan(SCCs): ";
    components.forEach((component:any, index:any) => {
      setTimeout(()=>{
        message=this.translate.instant("algoS.msg13",{index:++i});
        container.algorithm="";
        const color:string = this.getRandomColor(); 
        const backgroundColor:string = this.getRandomColor();
        const fleshColor:string=this.getRandomColor();
        setTimeout(()=>{
          component.nodes().style({
            'background-color': backgroundColor,
            'border-color': color,
            'color': color,
          });
        },10)
        component.nodes().forEach((node:any)=>{
          message+=node.data('id')+","
        })
        message=message.substring(0, message.length-1);
        setTimeout(()=>{
          component.edges().style({
            'line-color':backgroundColor,
          });
        },10)
       
        if(container.typeGraphe.split(" ")[1]=="Weighted"){
          setTimeout(()=>{
            component.edges().style({
              'color': color,
            });
          },10)
          
        }
        if(container.typeGraphe.split(" ")[0]=="Directed"){
          setTimeout(()=>{
            component.edges().style({
              'target-arrow-color': fleshColor,
            });
          },10)
        }
        container.message+=message+" || ";
      },i*20000)
    });
  }
  
  aStarAnimation(container:any):void{

  }
}