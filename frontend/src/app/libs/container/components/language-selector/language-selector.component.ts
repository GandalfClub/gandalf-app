import { Component, OnInit } from '@angular/core';
import { Language } from './models/language'

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  languages: Language[] = [
    { name: 'Russian', code: 'Ru' },
    { name: 'English', code: 'En' },
  ];

  currentLanguage: string = this.languages[0].code;

  constructor() { }
  
  ngOnInit(): void {
  }
}
