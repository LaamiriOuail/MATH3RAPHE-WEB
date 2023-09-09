/**
 * Angular component responsible for parsing and handling graph data from a list of edges.
 */
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GrapheService } from 'src/app/AllService/graphe.service';
/**
 * Represents a weighted edge in a graph.
 *
 * @interface IWeightedEdgeTyped
 */
interface IWeightedEdgeTyped {
  /**
   * The source node of the edge.
   *
   * @type {string}
   * @memberof IWeightedEdgeTyped
   */
  source: string;

  /**
   * The target node of the edge.
   *
   * @type {string}
   * @memberof IWeightedEdgeTyped
   */
  target: string;

  /**
   * The weight of the edge.
   *
   * @type {number}
   * @memberof IWeightedEdgeTyped
   */
  weight: number;

  /**
   * The type of the edge.
   *
   * @type {string}
   * @memberof IWeightedEdgeTyped
   */
  type: string;
}

/**
 * Represents an unweighted edge in a graph.
 *
 * @interface IUnweightedEdgeTyped
 */
interface IUnweightedEdgeTyped {
  /**
   * The source node of the edge.
   *
   * @type {string}
   * @memberof IUnweightedEdgeTyped
   */
  source: string;

  /**
   * The target node of the edge.
   *
   * @type {string}
   * @memberof IUnweightedEdgeTyped
   */
  target: string;

  /**
   * The type of the edge.
   *
   * @type {string}
   * @memberof IUnweightedEdgeTyped
   */
  type: string;
}

@Component({
  selector: 'app-graphe-from-edges-list',
  templateUrl: './graphe-from-edges-list.component.html',
  styleUrls: ['./graphe-from-edges-list.component.css']
})
export class GrapheFromEdgesListComponent {
  /**
   * Constructor for the GrapheFromEdgesListComponent.
   *
   * @param {GrapheService} grapheS - The GrapheService instance for handling graph operations.
   * @param {TranslateService} translate - The TranslateService for language localization.
   */
  constructor(protected grapheS:GrapheService,protected translate:TranslateService){}
  /**
   * The text area input for the list of edges.
   */
  listEdgeTextArea:string="";
  /**
   * Input container object for handling graph-related properties.
   */
  @Input() container:any;
  /**
   * Parses the extended format list of edges and returns an array of parsed edge objects.
   *
   * @returns {Array<any>} - An array of parsed edge objects.
   */
  parseExtendedFormat():Array<any> {
    const lines = this.listEdgeTextArea.split('\n');
    const edges:Array<any> = [];
    if(lines.length==0){
      this.container.message=this.translate.instant("grapheFromEdgeList.msg2");
    }
    for (const line of lines) {
      const edge = this.parseEdge(line);
      if (edge && !this.containsInvalidCharacters(edge?.source) && !this.containsInvalidCharacters(edge?.source)) {
        edges.push(edge);
      }else{
        this.container.message=this.translate.instant("grapheFromEdgeList.msg1");
        break;
      }
    }
  
    return edges;
  }
  /**
   * Parses a single edge from a line of text and returns an edge object.
   *
   * @param {string} line - The input line containing edge information.
   * @returns {IWeightedEdgeTyped|IUnweightedEdgeTyped|null} - The parsed edge object.
   */
  parseEdge(line:string):IWeightedEdgeTyped|IUnweightedEdgeTyped|null {
    const matchDirectedWeighted = line.match(/\s*([^(-]*)\s*-\(([\d.]+)\)->\s*([^(-]*)\s*/);
    const matchDirected = line.match(/\s*([^(-]*)\s*>\s*([^(-]*)\s*/);
    const matchUndirectedWeighted = line.match(/\s*([^(-]*)\s*-\(([\d.]+)\)-\s*([^(-]*)\s*/);
    const matchUndirected = line.match(/\s*([^(-]*)\s*-\s*([^(-]*)\s*/);
  
    if (matchDirectedWeighted) {//OK
      return {
        source: matchDirectedWeighted[1].trim(),
        target: matchDirectedWeighted[3].trim(),
        weight: Number(matchDirectedWeighted[2]),
        type: 'Directed Weighted',
      };
    } else if (matchDirected) {//OK
      return {
        source: matchDirected[1].trim(),
        target: matchDirected[2].trim(),
        type: 'Directed Unweighted',
      };
    } else if (matchUndirectedWeighted) {
      console.log(matchUndirectedWeighted[2]);
      console.log(matchUndirectedWeighted[1]);
      console.log(matchUndirectedWeighted[3]);
      return {
        source: matchUndirectedWeighted[1].trim(),
        target: matchUndirectedWeighted[3].trim(),
        weight: Number(matchUndirectedWeighted[2]),
        type: 'Undirected Weighted',
      };
    } else if (matchUndirected) {//OK
      return {
        source: matchUndirected[1].trim(),
        target: matchUndirected[2].trim(),
        type: 'Undirected Unweighted',
      };
    }
  
    return null;
  }
  /**
  * Checks if all edges have the same type of graph (e.g., Directed Weighted).
  *
  * @param {Array<IUnweightedEdge|IWeightedEdge|null>} edges - An array of edge objects to check.
  * @returns {boolean} - `true` if all edges have the same type, otherwise `false`.
  */
  isSameTypeGraphe(edges:Array<any>): boolean {
    let isSameTypeGraphe:boolean=true;
    let firstType:string=edges[0]?.type;
    if(firstType){
      for (const edge of edges) {
        if(edge.type!=firstType){
          console.log(" Type Error")
          isSameTypeGraphe=false;
          break;
        }
      }
    }else{
      isSameTypeGraphe=false;
    }
    return isSameTypeGraphe;
  }
  /**
   * Sends the parsed graph elements to the parent component.
   *
   * @returns {any} - The parsed graph elements or `false` if there is a type mismatch.
   */
  sendElements():any{
    if(this.isSameTypeGraphe(this.parseExtendedFormat())){
      return this.parseExtendedFormat();
    }else{
      this.container.message=this.translate.instant("grapheFromEdgeList.msg3");
      return false;
    }
  }
  /**
   * Checks if a given input string contains invalid characters.
   *
   * @param {string} inputString - The input string to check for invalid characters.
   * @returns {boolean} - `true` if the input contains invalid characters, otherwise `false`.
   */
  containsInvalidCharacters(inputString:string) :boolean{
    // Define a regular expression pattern for valid characters
    const invalidCharactersPattern = /[<> ()&;:-]/;
    // Test the inputString against the pattern
    return invalidCharactersPattern.test(inputString);
  }
}
