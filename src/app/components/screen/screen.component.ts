import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/AllService/dark-mode.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent {
  constructor(protected darkModeS:DarkModeService){
    
  }
}
