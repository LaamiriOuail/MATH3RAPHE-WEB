import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import jsPDF from 'jspdf';
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
  doc:any;
  lastElementHeight:number=0;
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
            for(let k:number=0;k<json.elements.nodes.length;k++){
              const nodeId = parseInt(json.elements.nodes[k].data.id);
              if (nodeId > largestNodeId) {
                largestNodeId = nodeId;
              }
            }
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
        }else if(container.saveUpload=="savePDF"){
          this.doc=new jsPDF({
            orientation: 'portrait', // 'portrait' or 'landscape'
            unit: 'pt', // units of measurement: 'mm', 'cm', 'in', 'pt'
            format: [595.276, 841.890] // page width and height in points (A4 size)
          });
          this.generatePDF(container,"Directed weighted graphe","Ouail Laamiri","waillaamiri22@gmail.com","www.facebook.com");
        }
      }else{
          if(!container.grapheS.cy.nodes().length){
            container.message=this.translate.instant("algoS.msg11");
          } else if(container.typeGraphe==""){
            container.message=this.translate.instant("screenbox.msg23");
          }
          container.saveUpload="";
      }
  }
  infoDOc(docName:string,username:string,emailUser:string,urlSite:string):void{
    // Add a title (LaTeX-like document name)
    let yPosition:number = 300;
    this.doc.setFontSize(24); // Set font size
    this.doc.setFont("helvetica"); // You can specify the font family here
    let widthInPoints:number = this.doc.getStringUnitWidth(docName) * this.doc.getFontSize();
    let docNameArray:string[] =[];
    if(widthInPoints>595.276){
      docNameArray=docName.split(" ");
      docName="";
      this.testAndAddDocName(docName,docNameArray,yPosition);
      this.incrementLastElementHeight(yPosition+this.doc.getFontSize());
      yPosition+=30;
    }else{
      this.doc.text(docName, (595.276-widthInPoints)/2, yPosition); // Replace 'Document Title' with your desired title
      this.incrementLastElementHeight(yPosition+this.doc.getFontSize());
      yPosition+=30;
    }
    while(docNameArray.length){
      widthInPoints = this.doc.getStringUnitWidth(docName) * this.doc.getFontSize();
      this.testAndAddDocName(docName,docNameArray,yPosition);
      yPosition+=30;
    }
    // Add user data
    const userData = {
      userName: username, // Replace with the user's name
      userEmail: emailUser, // Replace with the user's email
      dateTime: this.getDataTime(),
      urlSite: urlSite, // Replace with the user's address
    };

    this.doc.setFontSize(12); // Set font size for user data

    // Loop through user data and add it to the PDF
    for (const [key, value] of Object.entries(userData)) {
      if(value){
        if(key=="urlSite"){
          widthInPoints = this.doc.getStringUnitWidth(`generated by : ${value}`) * this.doc.getFontSize();
          this.doc.text(`generated by : ${value}`, (595.276-widthInPoints)/2, yPosition);
        }else if(key=="userName"){
          widthInPoints = this.doc.getStringUnitWidth(value) * this.doc.getFontSize();
          this.doc.text(`${value}`, (595.276-widthInPoints)/2, yPosition);
        }else{
          widthInPoints = this.doc.getStringUnitWidth(value) * this.doc.getFontSize();
          this.doc.text(`${value}`, (595.276-widthInPoints)/2, yPosition);
        }
        this.incrementLastElementHeight(yPosition+this.doc.getFontSize());
        yPosition += 25; // Increase the vertical position for the next line
      }
    }
    this.doc.addPage();
  }
  getDataTime(): string {
    let currentDate = new Date();

    // Define the months in an array
    let months = [
      "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"
    ];

    // Get the individual components of the date and time
    let day:number = currentDate.getDate();
    let month:string = months[currentDate.getMonth()];
    let year = currentDate.getFullYear();
    let hours:number = currentDate.getHours();
    let minutes:number|string = currentDate.getMinutes();
    let seconds:number|string = currentDate.getSeconds();

    // Add leading zeros to minutes and seconds if they are single digits
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    // Create the formatted date and time string
    return day + " " + month + " " + year + " " + hours + ":" + minutes + ":" + seconds;
  }
  testAndAddDocName(docName:string,docNameArray:string[],yPosition:number): void {
    docName="";
    let length:number=docNameArray.length;
    for(let i:number=0 ;i<length;i++){
      docName+=docNameArray.shift()+" ";
      if(this.doc.getStringUnitWidth(docName) * this.doc.getFontSize()>505.276){
        break;
      }
    }
    let widthInPoints:number = this.doc.getStringUnitWidth(docName) * this.doc.getFontSize();
    this.doc.text(docName, (595.276-widthInPoints)/2, yPosition); // Replace 'Document Title' with your desired title
  }
  incrementLastElementHeight(increment:number):void{
    this.lastElementHeight+=increment;
  }
  isTheLastOfPageAddNewPage():void{
    if(this.lastElementHeight>750){
      this.doc.addPage();
      this.lastElementHeight=50;
    }
  }
  infoGrapheDoc(container:any,lastheight:number):void{
    if(container.grapheS.cy.nodes().length){
      this.doc.setFontSize(22); // Set font size
      let text:string="Graph Information : "
      let arrayString:string[] = [];
      let widthInPoints:number = this.doc.getStringUnitWidth(text) * this.doc.getFontSize();
      this.doc.setTextColor(255, 0, 0);//red
      lastheight+=10;
      this.doc.text(text,  (595.276-widthInPoints)/2, lastheight); // Replace 'Document Title' with your desired title
      this.doc.setTextColor(0, 0, 0);//black
      this.doc.setFontSize(14); // Set font size
      text=`List of nodes : `;
      lastheight+=30;
      this.doc.text(text, 20, lastheight); // Replace 'Document Title' with your desired title
      text=container.grapheS.getListOfNode();
      widthInPoints = this.doc.getStringUnitWidth(text) * this.doc.getFontSize();
      if(widthInPoints>575.276){
        arrayString=text.split("---");
        text="";
        lastheight+=30;
        for(let i:number=0 ;i<length;i++){
          text+=arrayString.shift()+" ,";
          if(this.doc.getStringUnitWidth(text) * this.doc.getFontSize()>505.276){
            break;
          }
        }
        this.doc.text(text, 30, lastheight); 
        // this.lastElementHeight+=10;
      }else{
        lastheight+=30;
        this.doc.text(text, 30, lastheight); // Replace 'Document Title' with your desired title
        // yPosition+=30;
      }
      while(arrayString.length){
        text="";
        lastheight+=30;
        for(let i:number=0 ;i<length;i++){
          text+=arrayString.shift()+" ,";
          if(this.doc.getStringUnitWidth(text) * this.doc.getFontSize()>505.276){
            break;
          }
        }
        this.doc.text(text, 30, lastheight); 
      }
      if(container.grapheS.cy.edges().length){
        //---
        text=`List of edges : `;
        lastheight+=30;
        this.doc.text(text, 20, lastheight); // Replace 'Document Title' with your desired title
        text=container.grapheS.getListeOfEdgeEn();
        widthInPoints = this.doc.getStringUnitWidth(text) * this.doc.getFontSize();
        if(widthInPoints>575.276){
          arrayString=text.split("---");
          text="";
          lastheight+=30;
          for(let i:number=0 ;i<length;i++){
            text+=arrayString.shift()+" ---";
            if(this.doc.getStringUnitWidth(text) * this.doc.getFontSize()>505.276){
              break;
            }
          }
          this.doc.text(text, 30, lastheight); 
          // this.lastElementHeight+=10;
        }else{
          lastheight+=30;
          this.doc.text(text, 30, lastheight); // Replace 'Document Title' with your desired title
          // yPosition+=30;
        }
        while(arrayString.length){
          text="";
          lastheight+=30;
          for(let i:number=0 ;i<length;i++){
            text+=arrayString.shift()+" ,";
            if(this.doc.getStringUnitWidth(text) * this.doc.getFontSize()>505.276){
              break;
            }
          }
          this.doc.text(text, 30, lastheight); 
        }
      }
    }
    
  }
  generatePDF(container:any,docName:string,username:string,emailUser:string,urlSite:string):void{
    this.infoDOc(docName,username,emailUser,urlSite);
    this.infoGrapheDoc(container,50);
    this.doc.save('sample.pdf');
  }
}


