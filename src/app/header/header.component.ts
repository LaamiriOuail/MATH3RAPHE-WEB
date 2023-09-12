import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../Services/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  lang:any=localStorage.getItem('language') || "en";
  languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' }
  ];
  constructor(protected darkModeS:DarkModeService,private translate:TranslateService){
  }

  toggleDarkMode():void{
    this.darkModeS.toggleDarkMode();
  }
  changeLanguage(event: any) {
    localStorage.setItem('language', event.target.value);
    this.translate.use(event.target.value);
  }
}
