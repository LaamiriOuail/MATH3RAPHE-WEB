import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ScreenboxComponent } from './screenbox/screenbox.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';

import { GrapheService } from './AllService/graphe.service';
import { AlgorithmService } from './AllService/algorithm.service';
import { SaveUploadService } from './AllService/save-upload.service';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { InfoComponent } from './component/info/info.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './component/message/message.component';
import { ScreenComponent } from './component/screen/screen.component';
import { AddWeightedEdgeComponent } from './component/add-weighted-edge/add-weighted-edge.component';
import { MatrixComponent } from './component/matrix/matrix.component';
import { SelectComponent } from './component/select/select.component';


// Function to load translations
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScreenboxComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    InfoComponent,
    MessageComponent,
    ScreenComponent,
    AddWeightedEdgeComponent,
    MatrixComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CommonModule
    
  ],
  providers: [GrapheService,AlgorithmService,SaveUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
