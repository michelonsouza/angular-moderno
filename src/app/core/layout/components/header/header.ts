import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

import { ToggleSidenavVisibilityComponent } from './components/toggle-sidenav-visibility/toggle-sidenav-visibility.component';
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterLink, ToggleSidenavVisibilityComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
