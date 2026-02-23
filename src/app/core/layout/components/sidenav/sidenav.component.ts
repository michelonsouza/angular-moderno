import { Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SidenavItemsComponent } from './components/sidenav-items/sidenav-items.component';
import { MobileLayoutService } from '../../services/mobile-layout.service';
import { SidenavVisibilityStore } from '../../stores/sidenav-visibility.store';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, SidenavItemsComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  readonly #mobileLayoutService = inject(MobileLayoutService);
  readonly #sidenavVisibilityStore = inject(SidenavVisibilityStore);

  readonly isMobile = this.#mobileLayoutService.isMobile();

  public readonly sidenavMode = computed(() => (this.isMobile() ? 'over' : 'side'));

  public toggleVisibility() {
    this.#sidenavVisibilityStore.toggle();
  }

  public readonly isSidenavOpened = computed(() => {
    if (!this.isMobile()) {
      return true;
    }

    return this.#sidenavVisibilityStore.isVisible();
  });

  public closeSidenav() {
    this.#sidenavVisibilityStore.close();
  }
}
