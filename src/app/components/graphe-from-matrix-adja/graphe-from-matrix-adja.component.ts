import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

@Component({
  selector: 'app-graphe-from-matrix-adja',
  templateUrl: './graphe-from-matrix-adja.component.html',
  styleUrls: ['./graphe-from-matrix-adja.component.css']
})
export class GrapheFromMatrixAdjaComponent {
  @Input() container:any;
  matrixText:string="";
  constructor(protected grapheS:GrapheService,protected translate:TranslateService){}
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
  createGraphElements(adjacencyMatrix: Array<Array<number>>): Array<any> {
    let elements: Array<any> = [];
    const isDirected: boolean = !this.isSymmetric(adjacencyMatrix);
    const isWeighted: boolean = this.isWeighted(adjacencyMatrix);
  
    // Create nodes
    for (let i = 0; i < adjacencyMatrix.length; i++) {
      elements.push({ id: i.toString() });
    }
  
    // Create edges based on adjacency matrix
    for (let i = 0; i < adjacencyMatrix.length; i++) {
      for (let j = 0; j < adjacencyMatrix[i].length; j++) {
        if (i !== j && adjacencyMatrix[i][j] !== 0) {
          let edge:any = {
            source: i.toString(),
            target: j.toString(),
          };
          if (isWeighted) {
            edge = {
              source: i.toString(),
              target: j.toString(),
              weight: adjacencyMatrix[i][j]
            };
          }
          elements.push(edge);
        }
      }
    }
  
    return elements;
  }

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
