import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormInputComponent } from './core/components/user-form-input/user-form-input.component';
import { PathTextOutputComponent } from "./core/components/path-text-output/path-text-output.component";

@NgModule({
    declarations: [
        AppComponent,
        UserFormInputComponent,
        PathTextOutputComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class AppModule { }
