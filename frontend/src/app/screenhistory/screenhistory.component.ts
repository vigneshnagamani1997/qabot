import { Component } from '@angular/core';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-screenhistory',
  templateUrl: './screenhistory.component.html',
  styleUrl: './screenhistory.component.scss'
})
export class ScreenhistoryComponent {
  constructor(public chatServiceService:ChatServiceService) {

  }
}
