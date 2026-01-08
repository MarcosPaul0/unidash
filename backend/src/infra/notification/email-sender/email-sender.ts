import {
  SendAccountActivationNotificationParams,
  SendIncomingStudentRegistrationNotificationParams,
  SendPasswordResetNotificationParams,
} from "@/domain/application/notification-sender/notification-sender";

export abstract class EmailSender {
  abstract sendAccountActivationEmail(
    params: SendAccountActivationNotificationParams
  ): Promise<void>;

  abstract sendPasswordResetEmail(
    params: SendPasswordResetNotificationParams
  ): Promise<void>;

  abstract sendIncomingStudentRegistrationEmail(
    params: SendIncomingStudentRegistrationNotificationParams
  ): Promise<void>;
}
