import { Component } from '@angular/core';
import { ChatServiceService } from '../chat-service.service';
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-chat-entry',
  templateUrl: './chat-entry.component.html',
  styleUrl: './chat-entry.component.scss'
})
export class ChatEntryComponent {
  chatSent = '';
  sugestedQuestion = '';
  isSuggestion = false;
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  tempWords: any;
  transcript_arr: any = [];
  confidence_arr: any = [];
  isStarted = false; //<< this Flag to check if the user stop the service
  isStoppedAutomatically = true; //<< this Flag to check if the service stopped automaticically.
  // globalWindow: any = window;
  // recognition = this.globalWindow.SpeechRecognition() || this.globalWindow.webkitSpeechRecognition();
  // speechRecognitionList = this.globalWindow.SpeechGrammarList() || this.globalWindow.webkitSpeechGrammarList();
  // SpeechRecognitionEvent = this.globalWindow.SpeechRecognitionEvent || this.globalWindow.webkitSpeechRecognitionEvent;
  constructor(private chatServiceService: ChatServiceService) {
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results).map((result: any) => result[0]).map((result) => result.transcript).join('');
      if (transcript) {
        this.transcript_arr.push(transcript);
        this.tempWords = transcript;
        const confidence = Array.from(e.results)
          .map((result: any) => result[0])
          .map((result) => result.confidence)
          .join('');
        this.confidence_arr.push(confidence);
      }
    });
    this.recognition.addEventListener('end', (condition: any) => {
      this.wordConcat();
      if (this.isStoppedAutomatically) {
        this.recognition.stop();
        this.recognition.start();
        this.isStoppedAutomatically = true;
      }
    });
  }
  wordConcat(): void {
    this.chatSent = this.chatSent + ' ' + this.tempWords;
    this.tempWords = '';
  }
  start(): void {
    if (!this.isStarted) {
      this.recognition.start();
      this.isStarted = true;
    }
  }
  stop(): void {
    if (this.isStarted) {
      this.isStoppedAutomatically = false;
      this.wordConcat();
      this.recognition.stop();
      this.isStarted = false;
    }
  }
  sentTo(): void {
    if(this.chatSent) {
      const payload = {
        ques: this.chatSent
      };
      this.chatServiceService.chatHistory.push({ msg: this.chatSent, sentChat: true, receiveChat: false });
      this.isSuggestion = false;
      this.chatServiceService.getques(payload).subscribe((data: any) => {
        if (data.numOfRec && data.ans) {
          this.chatServiceService.chatHistory.push({ msg: data.ans, sentChat: false, receiveChat: true });
        } else {
          this.isSuggestion = true;
          this.sugestedQuestion = this.chatSent;
          this.chatServiceService.chatHistory.push({ msg: `We don't have any update on this! is there any suggestion that you like to provide for this question?`, sentChat: false, receiveChat: true });
        }
        this.chatSent = '';
      });
    } else {
      this.chatServiceService.chatHistory.push({ msg: 'Enter your text before senting', sentChat: false, receiveChat: true });
    }


  }

  sentSuggestion(): void {
    if(this.sugestedQuestion) {
      const payload = {
        ques: this.sugestedQuestion, 
        suggestion: this.chatSent
      };
      this.chatServiceService.suggestedans(payload).subscribe((data: any) => {
          this.chatServiceService.chatHistory.push({ msg: this.chatSent, sentChat: true, receiveChat: false });
          this.chatServiceService.chatHistory.push({ msg: data.reply, sentChat: false, receiveChat: true });
          this.chatSent = '';
          this.sugestedQuestion = '';
          this.isSuggestion = false;
        });
    } else {
      this.chatServiceService.chatHistory.push({ msg: 'Enter your text before senting suggesstion', sentChat: false, receiveChat: true });
    }

  }
}
