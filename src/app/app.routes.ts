import {Routes} from '@angular/router';
import {ListViewComponent} from "./list-view/list-view.component";
import {FormComponent} from "./form/form.component";
import {SettingsComponent} from "./settings/settings.component";

export const routes: Routes = [
  {
    path: "",
    component: ListViewComponent,
    title: "Liste"
  },
  {
    path: "new",
    component: FormComponent,
    title: "Neues Todo"
  },
  {
    path: "settings",
    component: SettingsComponent,
    title: "Einstellungen"
  }
];
