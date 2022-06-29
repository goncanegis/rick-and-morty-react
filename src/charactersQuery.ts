import { gql } from '@apollo/client';

export const charactersQuery = (characterName: string, page: number) => {
  return gql`
  query Get${characterName} {
    characters(filter: { name: "${characterName}" }, page: ${page || 1}) {
      info {
        prev
        next
        pages
      }
      results {
        id
        name
        location {
          name
        }
        image
      }
    }
  }
`;
};
