import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-card",
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ["./card.component.css"]
})
export class CardComponent {
  /**
   * Nothing to see here.
   * the card is just a placeholder item.
   * mostly here so I could style some stuff
   */
}
