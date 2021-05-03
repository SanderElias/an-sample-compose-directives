import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular Nation simple-sample";
  /** generate some data for the cards */
  cards = Array.from({ length: 6 }, createItem);


  activate(id: number) {
    /** there can by only 1 */
    this.cards.forEach(c => (c.active = c.id === id ? !c.active : false));
  }

  addNew(oldId) {
    /** add a new data item */
    this.cards.push(createItem(`I'm replacing ${oldId} with a pleasure`));
  }
}












































let lastId = -1;
const sampleDesc = [
  'click me to activate',
  'click the × to close me',
  'hover me to see the 🔎 icon',
  'click the 🔎 to zoom the card'
]
function createItem(o = "") {
  return {
    id: ++lastId,
    active: false,
    closed: false,
    description: o || sampleDesc[lastId] || ''
  };
}
