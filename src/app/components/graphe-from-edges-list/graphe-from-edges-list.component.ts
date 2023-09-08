import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

@Component({
  selector: 'app-graphe-from-edges-list',
  templateUrl: './graphe-from-edges-list.component.html',
  styleUrls: ['./graphe-from-edges-list.component.css']
})
export class GrapheFromEdgesListComponent {
  constructor(protected grapheS:GrapheService,protected translate:TranslateService){}
  listEdgeTextArea:string="";
  @Input() container:any;
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
  parseEdge(line:string):any {
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
  sendElements():any{
    if(this.isSameTypeGraphe(this.parseExtendedFormat())){
      return this.parseExtendedFormat();
    }else{
      this.container.message=this.translate.instant("grapheFromEdgeList.msg3");
      return false;
    }
  }
  containsInvalidCharacters(inputString:string) :boolean{
    // Define a regular expression pattern for valid characters
    const invalidCharactersPattern = /[<> ()&;:-]/;
    // Test the inputString against the pattern
    return invalidCharactersPattern.test(inputString);
  }
}
