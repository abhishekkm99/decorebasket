import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const data = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post('https://formspree.io/f/xlezqppn',
        { name: data.name, replyto: data.email, contact_info:data.phonenumber, message: data.messages },
        { 'headers': headers }).subscribe(
          response => {
            console.log(response);
          }
        );
    }
  }
   myFunction () {
    alert("Your Request Has been successfully submitted");
  }
}
