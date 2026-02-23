import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { MobileLayoutService } from '@/app/core/layout/services/mobile-layout.service';
import { SidenavVisibilityStore } from '@/app/core/layout/stores/sidenav-visibility.store';

@Component({
  selector: 'app-toggle-sidenav-visibility',
  imports: [MatIcon, MatButtonModule],
  templateUrl: './toggle-sidenav-visibility.component.html',
  styleUrl: './toggle-sidenav-visibility.component.scss',
})
export class ToggleSidenavVisibilityComponent {
  readonly #mobileLayoutService = inject(MobileLayoutService);
  readonly #sidenavVisibilityStore = inject(SidenavVisibilityStore);

  public readonly isMobile = this.#mobileLayoutService.isMobile();

  public toggleSidenavVisibility() {
    this.#sidenavVisibilityStore.toggle();
  }
}
