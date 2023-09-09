/**
 * Angular component responsible for generating a graph from an adjacency matrix.
 */
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GrapheService } from 'src/app/AllService/graphe.service';
/**
 * Represents a weighted edge in a graph.
 *
 * @interface IWeightedEdge
 */
interface IWeightedEdge {
  /**
   * The source node of the edge.
   *
   * @type {string}
   * @memberof IWeightedEdge
   */
  source: string;

  /**
   * The target node of the edge.
   *
   * @type {string}
   * @memberof IWeightedEdge
   */
  target: string;

  /**
   * The weight of the edge.
   *
   * @type {number}
   * @memberof IWeightedEdge
   */
  weight: number;
}

/**
 * Represents an unweighted edge in a graph.
 *
 * @interface IUnweightedEdge
 */
interface IUnweightedEdge {
  /**
   * The source node of the edge.
   *
   * @type {string}
   * @memberof IUnweightedEdge
   */
  source: string;

  /**
   * The target node of the edge.
   *
   * @type {string}
   * @memberof IUnweightedEdge
   */
  target: string;
}
@Component({
  selector: 'app-graphe-from-matrix-adja',
  templateUrl: './graphe-from-matrix-adja.component.html',
  styleUrls: ['./graphe-from-matrix-adja.component.css']
})
export class GrapheFromMatrixAdjaComponent {
  /**
   * Input container object for handling graph-related properties.
   */
  @Input() container:any;
  /**
   * The adjacency matrix in text format.
   */
  matrixText:string="";
  /**
   * Constructor for the GrapheFromMatrixAdjaComponent.
   *
   * @param {GrapheService} grapheS - The GrapheService instance for handling graph operations.
   * @param {TranslateService} translate - The TranslateService for language localization.
   */
  constructor(protected grapheS:GrapheService,protected translate:TranslateService){}
  /**
   * Generates a graph based on the provided adjacency matrix.
   */
  generateGraph() {
    // Parse the matrix into a 2D array
    const adjacencyMatrix = this.parseAdjacencyMatrix(this.matrixText);
    if(adjacencyMatrix){
      const elements:Array<any>=this.createGraphElements(adjacencyMatrix);
      this.grapheS.createGrapheFromAdjancyMatrix(elements,!this.isSymmetric(adjacencyMatrix),this.isWeighted(adjacencyMatrix),this.container);
      const screen=this.container.el.nativeElement.querySelector('.screen');
      const buttonManupilation=this.container.el.nativeElement.querySelector('.buttonManupilation');
      const addGrapheWithMatrix=this.container.el.nativeElement.querySelector('.addGrapheWithMatrix');
      screen.style.display="block";
      buttonManupilation.style.display="block";
      addGrapheWithMatrix.style.display="none";
      this.matrixText="";
      this.container.message=this.translate.instant("grapheFromMatrix.msg4");
      this.container.changeSelect="";
    }
  }
  /**
   * Parses the input adjacency matrix in text format and returns a 2D array.
   *
   * @param {string} matrixText - The adjacency matrix in text format.
   * @returns {any} - The parsed 2D array representing the adjacency matrix or `false` if parsing fails.
   */
  parseAdjacencyMatrix(matrixText:string):any {
    // Remove leading and trailing whitespace
    matrixText = matrixText.trim();
    let err:boolean=false;
    let matrix:any;
    // Check if the input is empty
    if (matrixText.length === 0) {
        this.container.message=this.translate.instant('grapheFromMatrix.msg2');
        err=true;
    }
    if(!err){
      // Split the text by newline to get rows
      const rows = matrixText.split('\n');
      const numRows = rows.length;

      // Initialize a flag to check if the matrix is square
      let isSquare = true;

      // Parse each row into an array of numbers and validate the format
      matrix = rows.map((row:any, rowIndex:any) => {
          const values = row.trim().split(/\s+/).map(Number);
          // Check if the matrix is square by comparing the number of columns
          if (values.length !== numRows) {
              isSquare = false;
          }
          return values;
      });
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          if (Number.isNaN(matrix[i][j])) {
            err=true;
            this.container.message=this.translate.instant('grapheFromMatrix.msg1');
            break;
          }
        }
      }
      
      // Check if the matrix is square
      if (!isSquare) {
        err=true;
        this.container.message=this.translate.instant('grapheFromMatrix.msg3');
      }
    }
    if(err==true){
      matrix=false;
    }
    return matrix;
  }
  /**
   * Creates graph elements (nodes and edges) from the parsed adjacency matrix.
   *
   * @param {Array<Array<number>>} adjacencyMatrix - The parsed adjacency matrix.
   * @returns {Array<any>} - An array of graph elements.
   */
  createGraphElements(adjacencyMatrix: Array<Array<number>>): Array<any> {
    let elements: Array<any> = [];
    const isDirected: boolean = !this.isSymmetric(adjacencyMatrix);
    const isWeighted: boolean = this.isWeighted(adjacencyMatrix);
    
    // Create nodes
    for (let i = 0; i < adjacencyMatrix.length; i++) {
      if(this.container.nodeName=="numerique"){
        this.grapheS.counter=i;
        elements.push({id:++this.grapheS.counter});
      }else if(this.container.nodeName=="alphabic"){
        this.grapheS.counter=i;
        elements.push({id:this.grapheS.Alphabets[i]});
      }
    }
    let arrayNemming:Array<any>=[];
    if(this.container.nodeName=="numerique"){
      arrayNemming=this.grapheS.numbersArray;
    }else if(this.container.nodeName=="alphabic"){
      arrayNemming=this.grapheS.Alphabets;
    }
    // Create edges based on adjacency matrix
    for (let i = 0; i < adjacencyMatrix.length; i++) {
      for (let j = 0; j < adjacencyMatrix[i].length; j++) {
        let edge:any;
        if (i !== j && adjacencyMatrix[i][j] !== 0) {
          if (isWeighted) {
            if(this.container.nodeName=="numerique"){
              edge = {
                source: (i+1).toString(),
                target: (j+1).toString(),
                weight: adjacencyMatrix[i][j]
              };
            }else if(this.container.nodeName=="alphabic"){
              edge = {
                source: arrayNemming[i],
                target: arrayNemming[j],
                weight: adjacencyMatrix[i][j]
              };
            }
          }else{
            if(this.container.nodeName=="numerique"){
              edge = {
                source: (i+1).toString(),
                target: (j+1).toString()              };
            }else if(this.container.nodeName=="alphabic"){
              edge = {
                source: arrayNemming[i],
                target: arrayNemming[j],
              };
            }
          }
          elements.push(edge);
        }
      }
    }
    if(this.container.nodeName=="alphabic"){
      for(let i=0;i<this.grapheS.counter;i++){
        this.grapheS.Alphabets.shift();
      }
      this.grapheS.counter=0;
    }
    return elements;
  }
  /**
   * Checks if the adjacency matrix represents a weighted graph.
   *
   * @param {Array<Array<number>>} adjacencyMatrix - The adjacency matrix.
   * @returns {boolean} - `true` if the graph is weighted, otherwise `false`.
   */
  isWeighted(adjacencyMatrix:Array<Array<number>>):boolean{
    let weighted:boolean=false;
    for (let i = 0; i < adjacencyMatrix.length; i++) {
      if(weighted){
        break;
      }
      for (let j = 0; j < adjacencyMatrix[i].length; j++) {
          if (adjacencyMatrix[i][j] != 1 && adjacencyMatrix[i][j] != 0) {
            weighted=true;
            break;
          }
      }
    }
    return weighted;
  }
  /**
   * Checks if the adjacency matrix is symmetric, indicating an undirected graph.
   *
   * @param {Array<Array<number>>} matrix - The adjacency matrix.
   * @returns {boolean} - `true` if the matrix is symmetric, indicating an undirected graph, otherwise `false`.
   */
  isSymmetric(matrix:Array<Array<number>>) {
    if (!Array.isArray(matrix) || matrix.length === 0 || matrix[0].length === 0) {
      return false; // Not a valid matrix
    }
  
    const numRows = matrix.length;
    const numCols = matrix[0].length;
  
    if (numRows !== numCols) {
      return false; // Not a square matrix, so it can't be symmetric
    }
  
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (matrix[i][j] !== matrix[j][i]) {
          return false; // The matrix is not symmetric
        }
      }
    }
  
    return true; // The matrix is symmetric
  }

}