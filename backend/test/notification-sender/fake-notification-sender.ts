import {
  NotificationSender,
  SendAccountActivationNotificationParams,
  SendIncomingStudentRegistrationNotificationParams,
  SendPasswordResetNotificationParams,
} from "@/domain/application/notification-sender/notification-sender";

export class FakeNotificationSender implements NotificationSender {
  async sendAccountActivationNotification(
    params: SendAccountActivationNotificationParams
  ): Promise<void> {
    void params;
  }

  async sendPasswordResetNotification(
    params: SendPasswordResetNotificationParams
  ): Promise<void> {
    void params;
  }

  async sendIncomingStudentRegistrationNotification(
    params: SendIncomingStudentRegistrationNotificationParams
  ): Promise<void> {
    void params;
  }

  async sendEmailConfirmationReminderNotification(
    params: SendAccountActivationNotificationParams
  ): Promise<void> {
    void params;
  }
}
