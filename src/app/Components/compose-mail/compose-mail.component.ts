import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface _emails{
  email:string;
}

@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss']
})
export class ComposeMailComponent implements OnInit {

  modules = {}
  content = ''
   emailCtrl = new FormControl();
   emails: string[]= [];

  emailsControl = new FormControl();
  options : _emails[]= [];
  filteredOptions: Observable<_emails[]>;

  // emails: string[] = ['sam@test.com'];

  // @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;

  constructor() { 
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      'toolbar': [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        // ['link', 'image', 'video'],                         // link and image, video
        ['emoji']

      ]
    }
  }

  ngOnInit(): void {
    // this.filteredOptions = this.emailsControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => (typeof value === 'string' ? value : value.email)),
    //   map(email => (email ? this._filter(email) : this.options.slice))
    // )
  }

  displayFn(email: _emails): string {
    return email && email.email ? email.email : '';
  }

  private _filter(name: string): _emails[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.email.toLowerCase().includes(filterValue));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our emails
    if (value) {
      this.emails.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.emailCtrl.setValue(null);
  }

  //remove emails
  remove(email: string): void {
    const index = this.emails.indexOf(email);
    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.emails.push(event.option.viewValue);
    this.emailCtrl.setValue(null);
  }

  // Quill Editor
  addBindingCreated(quill) {
    quill.keyboard.addBinding({
      key: 'b'
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING B', range, context)
    })

    quill.keyboard.addBinding({
      key: 'B',
      shiftKey: true
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING SHIFT + B', range, context)
    })
  }

  emailRecords:any=[];
 excelRead(e:any){
let filereaded:any;
filereaded = e.target.files[0];
let type = e.target.files[0].name.split('.').pop();
this.emailRecords=[];
const schema = {
'ID':{
    prop: 'Id',
    type: String,
    required: false},
'Name':{
    prop: 'name',
    type: String,
    required: false},
 'Cource':{
  prop:'course',
  type: String,
  required: false},
  'email':{
    prop:'email',
    type: String,
    required: false
  }
 };

readXlsxFile(e.target.files[0],{schema}).then((data)=>{

  if(data.rows)
  {
    for(let i of data.rows)
    {
      this.emailRecords.push(i);
    }
  }
  console.log(this.emailRecords);
})
 }

 deleteAddress(i:number){
  this.emailRecords.remove(i)
}

}
