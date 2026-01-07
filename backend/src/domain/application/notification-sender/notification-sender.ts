import { User } from "../../entities/user";

export type SendAccountActivationNotificationParams = {
  user: User;
  activationToken: string;
};

export type SendPasswordResetNotificationParams = {
  user: User;
  passwordResetToken: string;
};

export type SendIncomingStudentRegistrationNotificationParams = {
  name: string;
  password: string;
  email: string;
  incomingStudentToken: string;
};

export abstract class NotificationSender {
  abstract sendAccountActivationNotification(
    params: SendAccountActivationNotificationParams
  ): Promise<void>;

  abstract sendPasswordResetNotification(
    params: SendPasswordResetNotificationParams
  ): Promise<void>;

  abstract sendIncomingStudentRegistrationNotification(
    params: SendIncomingStudentRegistrationNotificationParams
  ): Promise<void>;
}
