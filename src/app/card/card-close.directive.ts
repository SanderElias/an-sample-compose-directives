import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { fromEvent } from "rxjs";
import { filter, tap } from "rxjs/operators";

@Directive({
  selector: "app-card[closeable]"
})
export class CardCLoseDirective implements OnDestroy {
  #canBeClosed = true;
  elm = this.elmRef.nativeElement as HTMLElement;
  @Input("closeable") set iCanBeClosed(x:boolean) {
    if (x !==false) {
      this.#canBeClosed=true
      this.elm.classList.add('closeable')
    } else {
      this.#canBeClosed=false
      this.elm.classList.remove('closeable')
    }
  }
  @Output() closeable = new EventEmitter<void>();

  /** 
   * Handle the click on the 'close' button
   */
  clickSub = fromEvent<MouseEvent>(this.elm, "click")
    .pipe(
      filter(() => this.#canBeClosed),
      /** is the click on the target area? */
      filter(e => {
        const { left, top, width } = this.elm.getBoundingClientRect();
        var x = e.clientX - left; 
        var y = e.clientY - top; 
        return y < 32 && x > width - 30
      }),
      /** trigger the side-effect */
      tap(e => {
          this.close();
          e.preventDefault();
          e.stopImmediatePropagation();        
      })
    )
    .subscribe();

  constructor(private elmRef: ElementRef) {}

  canBeClosed() {return this.#canBeClosed}

  private close() {
    this.elm.style.display = "none";
    this.closeable.emit();
  }

  private open() {
    this.elm.style.display = "block";
  }

  ngOnDestroy() {
    this.clickSub.unsubscribe();
  }
}