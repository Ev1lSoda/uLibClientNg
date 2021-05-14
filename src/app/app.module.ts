import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LibraryComponent } from './views/library.component';
import { MyapiserviceService } from './myapiservice.service';

@NgModule({
  declarations: [AppComponent, LibraryComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [MyapiserviceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
