import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ScreenhistoryComponent } from './screenhistory/screenhistory.component';
import { ChatEntryComponent } from './chat-entry/chat-entry.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChatServiceService } from './chat-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScreenhistoryComponent,
    ChatEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    HttpClientModule
  ],
  providers: [ChatServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
