import { gql } from '@apollo/client';
import { BOOK_DETAIL } from './fragments';

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetail
    }
  }
  ${BOOK_DETAIL}
`;
