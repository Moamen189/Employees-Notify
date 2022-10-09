// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
  encapsulation: ViewEncapsulation.None
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ModalComponent implements OnInit, OnDestroy {

  @Input() id: string | any;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
      if (el.target.className === 'app-modal') {
        this.close();
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('app-modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('app-modal-open');
  }
}
