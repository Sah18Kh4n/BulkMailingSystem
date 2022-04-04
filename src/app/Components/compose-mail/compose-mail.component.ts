import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import readXlsxFile from 'read-excel-file';
import { COMMA, ENTER } from '@angular/cdk/keycodes';



@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss']
})
export class ComposeMailComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  composeMail: FormGroup
  recipientMail: string[] = ['xyz45gmail.com@', 'pqr@gmail.com', 'mno@45gmmail.com', 'nvsjs@gmail.com', 'sds@gmaily@gmail.com'];
  modules = {}
  constructor(public fb: FormBuilder) {
    const modules = {
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
    this.composeMail = this.fb.group({
      recipient: new FormControl(),
      subject: new FormControl(),
      content: new FormControl()
    })

  }

  ngOnInit(): void {

  }

  //add method here

  remove(fruit: string): void {
    const index = this.recipientMail.indexOf(fruit);
    if (index >= 0) {
      this.recipientMail.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.recipientMail.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.composeMail.controls['recipient'].setValue(null);
  }
  onSubmit(){
    console.log(this.composeMail.controls.values)
  }
}