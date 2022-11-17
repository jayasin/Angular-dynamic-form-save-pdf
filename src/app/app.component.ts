import { Component, ElementRef, ViewChild } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoading = false;




  public SavePDF(): void {
    this.isLoading = true;

    /* Hiding elements panel */
    let elementsPanel: any = document.getElementsByClassName("pull-right")[0];
    elementsPanel.style.display = "none";




    let content = document.getElementById('fbeditor');
    const options = {
      background: 'white',
      scale: 3,
    };

    html2canvas(content, options)
      .then((canvas) => {
        var img = canvas.toDataURL('image/PNG');
        var doc = new jsPDF('l', 'mm', 'a4', true);

        // Add image Canvas to PDF
        const bufferX = 5;
        const bufferY = 5;
        const imgProps = (<any>doc).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );

        return doc;
      })
      .then((doc) => {
        doc.save('sample.pdf');
        elementsPanel.style.display = "block";
        this.isLoading = false;
      }).catch(() => {
        elementsPanel.style.display = "block";
        this.isLoading = false;
      });

      
  }
}
