// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import * as signalR from '@microsoft/SignalR';
import { NotificationCountResult, NotificationResult } from '../notification/notification';
import { NotificationService } from '../notification/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class NavMenuComponent implements OnInit {

  notification: NotificationCountResult | undefined;
  messages: Array<NotificationResult> | undefined ;
  errorMessage = '';

  constructor(private notificationService: NotificationService, private modalService: ModalService) { }
  isExpanded = false;

  ngOnInit() {
    this.getNotificationCount();
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.baseUrl + 'notify')
      .build();

    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", () => {
      this.getNotificationCount();
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  getNotificationCount() {
    this.notificationService.getNotificationCount().subscribe(
      notification => {
        this.notification = notification;
      },
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      error => this.errorMessage = <any>error
    );
  }

  getNotificationMessage() {
    this.notificationService.getNotificationMessage().subscribe(
      messages => {
        this.messages = messages;
      },
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      error => this.errorMessage = <any>error
    );
  }

  deleteNotifications(): void {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure want to delete all notifications?`)) {
      this.notificationService.deleteNotifications()
        .subscribe(
          () => {
            this.closeModal();
          },
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          (error: any) => this.errorMessage = <any>error
        );
    }
  }
  openModal() {
    this.getNotificationMessage();
    this.modalService.open('custom-modal');
  }

  closeModal() {
    this.modalService.close('custom-modal');
  }
}
