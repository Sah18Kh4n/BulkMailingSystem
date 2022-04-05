import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import readXlsxFile from 'read-excel-file';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Binary } from '@angular/compiler';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss']
})
export class ComposeMailComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  composeMail: FormGroup
  recipientMail: any[] = [];
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

  remove(mail: string): void {
    const index = this.recipientMail.indexOf(mail);
    if (index >= 0) {
      this.recipientMail.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our mails
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

  uploadFile(event){
    for(var i=0; i < event.target.files.length; i++){
    const selectedFiles = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsBinaryString(selectedFiles)

    fileReader.onload=(data)=>{
      const BinaryData = data.target.result
      let workbook = XLSX.read(BinaryData,{type:"binary"})
      

      workbook.SheetNames.map(sheet =>{
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        
        data.map(item=>{
          console.log(item);
          this.recipientMail.push(item)
        })
      })
    }
  }
}
}