import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
Optional,
  Output
} from "@angular/core";
import { fromEvent } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { CardCLoseDirective } from "./card-close.directive";

@Directive({
  selector: "app-card[zoomable]"
})
export class CardZoomDirective implements OnDestroy {
  #canBeZoomed = true;
  #isZoomed = false;
  #elm = this.elmRef.nativeElement as HTMLElement;
  #parent: any;
  #sibling: any;
  @Input("zoomable") set canBeClosed(x: any) {
    if (x !== false) {
      this.#canBeZoomed = true;
      this.#elm.classList.add("zoomable");
    } else {
      this.#canBeZoomed = false;
      this.#elm.classList.remove("zoomable");
    }
  }
  @Output() zoomable = new EventEmitter<boolean>();

  /**
   * Handle the click on the 'zoom' button
   */
  #clickSub = fromEvent<MouseEvent>(this.#elm, "click")
    .pipe(
      filter(() => this.#canBeZoomed),
      /** is the click on the target area? */
      filter(e => {
        const { left, top, width, height } = this.#elm.getBoundingClientRect();
        var x = e.clientX - left;
        var y = e.clientY - top;
        return y > height - 29 && x > width - 30;
      }),
      /** trigger the side-effect */
      tap(e => {
        this.#isZoomed ? this.unzoom() :this.zoom();
        e.preventDefault();
        e.stopImmediatePropagation();
      })
    )
    .subscribe();

  #canBeClosedSub = this.ccd && this.ccd.canBeClosed() ? 
    /** when the panel is closed, it should be unZoomed too */
    this.ccd.closeable.subscribe(() => this.unzoom()) : 
    undefined;

  constructor(private elmRef: ElementRef, @Optional() private ccd:CardCLoseDirective) {
  }

  private zoom() {
    /** create element to be the backdrop */
    const backdrop = document.createElement("div");
    backdrop.classList.add("backDrop");
    backdrop.addEventListener("click", e => this.unzoom(e));
    this.#isZoomed = true;
    /** keep the current "position" */
    this.#parent = this.#elm.parentNode;
    this.#sibling = this.#elm.nextSibling;
    /** put in the backDrop */
    document.body.appendChild(backdrop);
    /** move the panel onto the backdorp */
    backdrop.appendChild(this.#elm);
    this.#elm.classList.add("zoomed");
    this.zoomable.emit(true);
  }

  private unzoom(ev?: MouseEvent) {
    const backDrop = this.#elm.parentElement;
    if (ev===undefined || ev.target === backDrop) {
      /** move panel back to original location */
      this.#parent.insertBefore(this.#elm, this.#sibling);
      this.#elm.classList.remove("zoomed");
      /** kill off the backdrop, will be garbage collected */
      backDrop.parentElement.removeChild(backDrop);
      this.#isZoomed=false;
      this.zoomable.emit(false)
    }
  }

  ngOnDestroy() {
    this.#clickSub.unsubscribe();
    this.#canBeClosedSub && this.#canBeClosedSub.unsubscribe()
  }
}
