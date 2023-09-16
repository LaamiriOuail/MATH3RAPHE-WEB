import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../Services/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  lang:string="";
  constructor(protected darkModeS:DarkModeService,private translate:TranslateService){
  }
  ngOnInit(): void {
    this.lang="en";
  }
  toggleDarkMode():void{
    this.darkModeS.toggleDarkMode();
  }
  changeLanguage(event: any) {
    this.translate.use(event.target.value);
  }
}
