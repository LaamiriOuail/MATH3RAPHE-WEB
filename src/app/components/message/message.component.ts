import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DarkModeService } from 'src/app/Services/dark-mode.service';
import { GrapheService } from 'src/app/Services/graphe.service';

/**
 * Angular component for displaying messages.
 */
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnChanges {
  /**
   * Input property representing the message to be displayed.
   */
  @Input() message: string = "";

  /**
   * Input property to receive data from a parent component.
   */
  @Input() container: any;

  /**
   * Initializes a new instance of the MessageComponent class.
   *
   * @param {DarkModeService} darkModeS - The DarkModeService instance.
   * @param {GrapheService} grapheS - The GrapheService instance.
   */
  constructor(protected darkModeS: DarkModeService, protected grapheS: GrapheService) {}

  /**
   * Angular lifecycle hook called when input properties change.
   *
   * @param {SimpleChanges} changes - The changes in input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.OnMessageLengthChange();
  }

  /**
   * Adjusts the message box's height based on the length of the message.
   */
  OnMessageLengthChange(): void {
    const msgBox = this.container.el.nativeElement.querySelector('#msgBox');
    const msgBoxC = this.container.el.nativeElement.querySelector('.msgBoxC');
    const height = 50;

    if (this.message.length > 103) {
      msgBoxC.style.height = height * (this.message.length / 103 + 0.7) + 'px';
      msgBox.style.height = msgBoxC.style.height;
    } else {
      msgBoxC.style.height = height + 20 + 'px';
      msgBox.style.height = height + 'px';
    }

    if (this.message.length > 103 * 2) {
      msgBoxC.style.height = height * (this.message.length / 103 - 1) + 'px';
      msgBox.style.height = msgBoxC.style.height;
    }
  }
}
