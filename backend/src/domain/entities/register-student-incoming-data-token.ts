

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { UserActionToken, UserActionTokenProps } from './user-action-token';

export type RegisterStudentIncomingDataTokenProps = Omit<
  UserActionTokenProps,
  'actionType'
>;

export class RegisterStudentIncomingDataToken extends UserActionToken {
  static create(
    props: Optional<RegisterStudentIncomingDataTokenProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const registerStudentIncomingDataToken = new RegisterStudentIncomingDataToken(
      {
        ...props,
        actionType: 'registerStudentIncomingData',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return registerStudentIncomingDataToken;
  }
}
