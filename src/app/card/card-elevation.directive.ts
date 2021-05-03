import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "app-card[elevate]"
})
export class CardElevationDirective  {
  elm = this.elmRef.nativeElement as HTMLHtmlElement;
  /** use a setter so it updates on changes */
  @Input() set elevate(n: number) {
    this.elm.style.setProperty("--backHover", calculateColor(n, 0x40));
  }

  constructor(private elmRef: ElementRef) {}
}





























































/**
 * Calcualte the elevation backgroundColor
 * As I'm usinff grayscals I don't need just one, and not RGB
 */
function calculateColor(n: number, baseBackgroundColor: number) {
  const elevation = Object.values(getElevations())[n];
  const newOpacity = (100 - elevation) / 100;
  const white = 0xff;
  const color = Math.floor(
    white - newOpacity * (white - baseBackgroundColor)
  ).toString(16);
  return `#${color}${color}${color}`;
}

/** return the elevations as defined by MD */
function getElevations() {
  return {
    "00dp": 0,
    "01dp": 5,
    "02dp": 7,
    "03dp": 8,
    "04dp": 9,
    "06dp": 11,
    "08dp": 12,
    "12dp": 14,
    "16dp": 15,
    "24dp": 16
  };
}
