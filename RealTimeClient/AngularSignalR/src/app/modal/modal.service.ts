// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ModalService {

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() { }

  private modals: any[] = [];

    add(modal: any) {
        this.modals.push(modal);
    }

    remove(id: string) {
        this.modals = this.modals.filter(x => x.id !== id);
    }

    open(id: string) {
        const modal = this.modals.find(x => x.id === id);
        modal.open();
    }

    close(id: string) {
        const modal = this.modals.find(x => x.id === id);
        modal.close();
    }
}
