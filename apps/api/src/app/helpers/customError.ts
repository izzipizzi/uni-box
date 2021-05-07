import { ApolloError } from 'apollo-server-express';

export class MyError extends ApolloError {
  constructor(message: string) {
    super(message, 'MY_ERROR_CODE');

    Object.defineProperty(this, 'name', { value: 'MyError' });
  }
}

