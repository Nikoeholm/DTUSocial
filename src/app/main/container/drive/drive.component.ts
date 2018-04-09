import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css']
})
export class DriveComponent implements OnInit {
  @ViewChild('urlInput') urlInputRef: ElementRef;

  url = 'https://drive.google.com/embeddedfolderview?id=';
  urlGiven: boolean;
  expression: any = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  onGetURL(){
    const getUrl = this.urlInputRef.nativeElement.value;
    this.url = this.url + getUrl + '#list';
    this.urlGiven = true;
  }

}
