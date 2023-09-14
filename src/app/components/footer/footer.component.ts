import { Component } from '@angular/core';
import { DarkModeService } from '../../Services/dark-mode.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(protected darkModeS:DarkModeService){
    
  }
}
