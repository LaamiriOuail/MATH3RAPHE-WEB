import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
/**
 * Service responsible for handling save and upload operations.
 * It provides methods to save and upload data, and uses the TranslateService for localization.
 */
@Injectable({
  providedIn: 'root'
})
export class SaveUploadService {
  /**
   * Initializes a new instance of the SaveUploadService.
   *
   * @param {TranslateService} translate - The TranslateService for localization.
   */
  constructor(private translate: TranslateService) { }
  /**
   * Saves the current graph as a JSON file.
   *
   * @param {ScreenboxComponent} container - The container object containing the Cytoscape instance and other data.
   */
  saveJSON(container:any) {
    // Get the Cytoscape elements in JSON format
    let elementsJson = container.grapheS.cy.json();
    elementsJson.typeGraphe = container.typeGraphe;
    // Create a Blob from the JSON data
    const blob = new Blob([JSON.stringify(elementsJson)], { type: 'application/json' });
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create an anchor element for the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'graphe.json';
    // Trigger the download
    a.click();
    container.saveUpload="";
    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  }
  
  /**
   * Saves the current graph as a JPG image.
   *
   * @param {ScreenboxComponent} container - The container object containing the Cytoscape instance and other data.
   * @param {boolean} [fullGraphe=true] - Whether to export the full graph or just the current viewport view.
   */
  saveJPG(container:any,fullGraphe:boolean=true):void{
  // Get a reference to the Cytoscape instance
  const cy = container.grapheS.cy;
  // Export the current graph view as a JPG image
  const jpgPromise = cy.jpg({
      output: 'blob-promise', // Use 'blob-promise' to make it non-blocking
      quality: 1, // Set the quality to 1 (highest quality)
      bg: 'white', // Set the background color to white (optional)
      full: fullGraphe, // Export the current viewport view (change to true for full graph)
      scale: 1, // Set the scale (1 for original size)
      maxWidth: 900, // Maximum width (optional)
      maxHeight: 800, // Maximum height (optional)
  });
  jpgPromise.then((blob:any) => {
      // Create an anchor element for the download
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'graph.jpg';
      // Trigger the download
      a.click();
      container.saveUpload="";
  });
  }
  /**
   * Saves the current graph as a PNG image.
   *
   * @param {ScreenboxComponent} container - The container object containing the Cytoscape instance and other data.
   * @param {boolean} [fullGraph=true] - Whether to export the full graph or just the current viewport view.
   */
  savePNG(container:any,fullGraph:boolean=true):void{
    // Get a reference to the Cytoscape instance
    const cy = container.grapheS.cy;
      
    // Export the current graph view as a PNG image
    const pngPromise = cy.png({
        output: 'blob-promise', // Use 'blob-promise' to make it non-blocking
        bg: 'white', // Set the background color to white (optional)
        full: fullGraph, // Export the current viewport view (change to true for full graph)
        scale: 1, // Set the scale (1 for original size)
        maxWidth: 900, // Maximum width (optional)
        maxHeight: 800, // Maximum height (optional)
    });
    
    pngPromise.then((blob: any) => {
        // Create an anchor element for the download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'graph.png';
        
        // Trigger the download
        a.click();
        
        // Optionally, you can perform additional actions after the download
        container.saveUpload = "";
    });
  }
  /**
   * Uploads a JSON file and updates the graph with the uploaded data.
   *
   * @param {ScreenboxComponent} container - The container object containing the Cytoscape instance and other data.
   */
  uploadJSON(container:any) {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target?.result as string);
            let largestNodeId = 0;
            json.elements.nodes.forEach((node: any) => {
              const nodeId = parseInt(node.data.id);
              if (nodeId > largestNodeId) {
                largestNodeId = nodeId;
              }
            });
            container.nodeId=largestNodeId;
            // Check if the typeGraphe property exists
            if (json.typeGraphe) {
              // Clear existing elements
              container.grapheS.cy.elements().remove();
              // Add new elements from the uploaded JSON
              container.typeGraphe=json.typeGraphe;
              container.grapheS.changeTypeGraphe(container);
              container.grapheS.cy.add(json.elements);
              // Fit the graph to the viewport
              container.saveUpload="";
              container.message=this.translate.instant("saveUploadS.msg1");
              container.grapheS.cy.fit();
              container.grapheS.cy.reset()
              container.restoreArray=[];

            } else {
              container.saveUpload="";
              container.message=this.translate.instant("saveUploadS.msg2");
            }
          } catch (error) {
            container.saveUpload="";
            container.message=this.translate.instant("saveUploadS.msg2");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }
  /**
   * Handles the change in the save/upload option and performs the corresponding action.
   *
   * @param {ScreenboxComponent} container - The container object containing the Cytoscape instance and other data.
   */
  OnSaveUploadChange(container:any):void{
      container.changeSelect="";
      container.remove="";
      container.buttonClicked="";
      container.containerHeight=50;
      container.selectedNode=[];
      container.algorithm="";
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
      if(container.saveUpload=="upload"){
        this.uploadJSON(container);
      }else if(container.typeGraphe!="" && container.grapheS.cy.nodes().length){
        if(container.saveUpload=="save"){
          this.saveJSON(container);
        }else if(container.saveUpload=="saveJPG"){
          this.saveJPG(container);
        }else if(container.saveUpload=="saveJPGScreen"){
          this.saveJPG(container,false);
        }else if(container.saveUpload=="savePNG"){
          this.savePNG(container);
        }else if(container.saveUpload=="savePNGScreen"){
          this.savePNG(container,false);
        }
      }else{
          if(!container.grapheS.cy.nodes().length){
            container.message=this.translate.instant("algoS.msg11");
          } else if(container.typeGraphe==""){
            container.message=this.translate.instant("screenbox.msg23");
          }
          container.typeGraphe="";
      }
  }
}


