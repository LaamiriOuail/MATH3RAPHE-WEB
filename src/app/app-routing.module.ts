import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenboxComponent } from './screenbox/screenbox.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { InfoComponent } from './component/info/info.component';

const routes: Routes = [
  {component:ContactComponent,path:'contact'},
  {component:AboutComponent,path:'about'},
  {component:ScreenboxComponent,path:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
