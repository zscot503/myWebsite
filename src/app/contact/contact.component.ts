import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private afa: AngularFireDatabase) {
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    const {name, email, message} = this.form.value;
    const date = Date();
    const html = `
    <div>From: ${name}</div>
    <div>Email: <a href="mailto:${email}">${email}</a></div>
    <div>Date: ${date}</div>
    <div>Message: ${message}</div>
    `;

    let formRequest = { name, email, message, date, html };

    this.afa.list('/messages').push(formRequest);
    this.form.reset();
  }

  title = "Contact";
}
