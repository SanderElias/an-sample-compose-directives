import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { CardComponent } from "./card/card.component";
import { CardCLoseDirective } from "./card/card-close.directive";
import { CardElevationDirective } from "./card/card-elevation.directive";
import { CardZoomDirective } from "./card/card-zoom.directive";

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    CardComponent,
    CardElevationDirective,
    CardCLoseDirective,
    CardZoomDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
