import './polyfills';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home';
import {AboutComponent} from './pages/about/about';
import {LoginComponent} from './pages/login/login';
import {DataService} from './services/data.service';

import {enableProdMode} from '@angular/core';
enableProdMode();

const routing = RouterModule.forRoot([
    { path: '',           component: HomeComponent },
    { path: 'about',      component: AboutComponent },
    { path: 'login',      component: LoginComponent }   
])

@NgModule({
    imports: [BrowserModule,
    		  routing,
    		  HttpModule,
    		  FormsModule,
    		  ReactiveFormsModule],
    declarations: [AppComponent,
                   AboutComponent,
    			   HomeComponent,
                   LoginComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})

export class AppModule {}