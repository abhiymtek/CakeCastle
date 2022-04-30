import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  //directive gives common functionality to tml elements

  // we need elements to implement the functionality
  constructor(private elem:ElementRef) { 
    console.log("Element we got ", this.elem.nativeElement)
    this.elem.nativeElement.style.color="yellow"
  }

}
