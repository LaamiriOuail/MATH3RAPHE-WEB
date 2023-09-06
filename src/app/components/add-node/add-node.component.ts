import { Component,Input } from '@angular/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

/**
 * Angular component representing the add node form.
 */
@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent {
  /**
   * The ID of the new node.
   */
  nodeId:any;
  /**
   * Indicates whether the input field has been touched or focused.
   */
  inputTouched:boolean = false;
  /**
   * Input property to receive data from a parent component.
   */
  @Input() container:any;
  /**
   * Initializes a new instance of the AddNodeComponent class.
   *
   * @param {GrapheService} grapheS - The GrapheService instance.
   */
  constructor(protected grapheS:GrapheService){

  }
  /**
   * Event handler for when the input field receives focus.
   * Sets the `inputTouched` flag to true.
   */
  onInputFocus(){
    this.inputTouched=true;
  }
}
