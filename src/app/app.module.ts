import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormInputComponent } from './core/components/user-form-input/user-form-input.component';
import { PathTextOutputComponent } from "./core/components/path-text-output/path-text-output.component";
import { PriceViewComponent } from './core/components/price-view/price-view.component';
import { PathTableComponent } from './core/components/path-table/path-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        UserFormInputComponent,
        PathTextOutputComponent,
        PriceViewComponent,
        PathTableComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ]
})
export class AppModule { }
