import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenboxComponent } from './components/screenbox/screenbox.component';
import { AddWeightedEdgeComponent } from './components/add-weighted-edge/add-weighted-edge.component';
import { ChangeIdNodeComponent } from './components/change-id-node/change-id-node.component';
import { ChangeColorComponent } from './components/change-color/change-color.component';
import { AddNodeComponent } from './components/add-node/add-node.component';
import { RemoveEdgeComponent } from './components/remove-edge/remove-edge.component';
import { RemoveNodeComponent } from './components/remove-node/remove-node.component';
import { ChangeSizeScreenComponent } from './components/change-size-screen/change-size-screen.component';


const routes: Routes = [
  // {component:ScreenboxComponent,path:''},
  {component:AddWeightedEdgeComponent,path:'add-weighted-edge'},
  {component:ChangeIdNodeComponent,path:'change-id-node'},
  {component:ChangeColorComponent,path:'change-color'},
  {component:AddNodeComponent,path:'add-node'},
  {component:RemoveEdgeComponent,path:'remove-edge'},
  {component:RemoveNodeComponent,path:'remove-node'},
  {component:ChangeSizeScreenComponent,path:'change-size-screen'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
