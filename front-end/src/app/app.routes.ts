import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ChatPageComponent } from "./chat-page/chat-page.component";
import { authGuard } from "./auth/guards/auth.guard";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  { path: "chat-page", component: ChatPageComponent, canActivate: [authGuard] },
  { path: "**", component: LoginComponent },
];
