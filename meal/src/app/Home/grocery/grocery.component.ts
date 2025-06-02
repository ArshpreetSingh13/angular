import { Component, OnInit } from '@angular/core';
import { GenaiService } from '../../service/genai/genai.service';
import { ActivatedRoute, Router } from '@angular/router';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {  NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-grocery',
  imports: [NgxSpinnerModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent implements OnInit {
constructor(private ai:GenaiService,
  private router:ActivatedRoute,
  private sanitizer: DomSanitizer,
  private spinner:NgxSpinnerService
){}

res:any
  healthRes:any

  

  formattedRes: SafeHtml = '';
  formattedHealthy: SafeHtml = '';
  ngOnInit() {

    this.spinner.show();
    const id:any= this.router.snapshot.paramMap.get('id')


    this.ai.generateContent(`Give me Grocery List of ${id}`).subscribe({
      next: (result) => {
        this.res = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

        const html:any = marked.parse(this.res);  // convert markdown to HTML
        this.formattedRes = this.sanitizer.bypassSecurityTrustHtml(html);
        console.log("AI Response:", this.res);
        this.spinner.hide();
      },
      error: (err) => {
        console.error("API Error:", err);
      }
    });


    
  }
  
  heath(){
    this.spinner.show();
    const id: any = this.router.snapshot.paramMap.get('id')


    this.ai.generateContent(`Is ${id} healty or not`).subscribe({
      next: (healthResult) => {
        this.healthRes = healthResult?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

        const healthHtml: any = marked.parse(this.healthRes);  // convert markdown to HTML
        this.formattedHealthy = this.sanitizer.bypassSecurityTrustHtml(healthHtml);
        console.log("AI Response:", this.healthRes);
        this.spinner.hide();
      },
      error: (err) => {
        console.error("API Error:", err);
      }
    });


  }

}
