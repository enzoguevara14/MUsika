import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit.components';
import { ArtistListComponent } from './components/artist-list.components';
import { HomeComponent } from './components/home.components';
import { ArtistAddComponent } from './components/artitst-add.components';
@NgModule({
  declarations: [
    AppComponent, 
    UserEditComponent,
    ArtistListComponent,
    HomeComponent,
    ArtistAddComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    routing
  ], 
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
