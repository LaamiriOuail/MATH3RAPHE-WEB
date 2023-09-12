import { Component, Input } from '@angular/core';
import { GrapheService } from 'src/app/AllService/graphe.service';

/**
 * Angular component representing the form for changing the size of the screen.
 */
@Component({
  selector: 'app-change-size-screen',
  templateUrl: './change-size-screen.component.html',
  styleUrls: ['./change-size-screen.component.css']
})
export class ChangeSizeScreenComponent {
  /**
   * Input property to receive data from a parent component.
   */
  @Input() container: any;

  /**
   * The height input field for changing the screen height.
   */
  height: any = localStorage.getItem('screenHeight');

  /**
   * Initializes a new instance of the ChangeSizeScreenComponent class.
   *
   * @param {GrapheService} grapheS - The GrapheService instance.
   */
  constructor(protected grapheS: GrapheService) {}
}
