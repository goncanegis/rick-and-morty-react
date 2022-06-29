import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { charactersQuery } from '../../src/charactersQuery';
import { Character, AllCharactersProps } from '../interfaces';
import CharacterCard from './CharacterCard';
import Spinner from './Spinner';

const AllCharacters: React.FC<AllCharactersProps> = ({
  pageNum,
  getComponentData,
}) => {
  const [filteredCharacters, setFilteredCharacters] = useState<
    Character[] | [{}]
  >([{}]);
  const [nextPage, setNextPage] = useState(1);

  // get character data from API
  const {
    loading: l1,
    error: e1,
    data: d1,
  } = useQuery(charactersQuery('Rick', pageNum));

  const {
    loading: l2,
    error: e2,
    data: d2,
  } = useQuery(charactersQuery('Morty', pageNum));

  useEffect(() => {
    if (d1 && d2) {
      const sortedArray = [
        ...d1.characters.results,
        ...d2.characters.results,
      ].sort((a, b) => {
        return a.id - b.id;
      });

      setFilteredCharacters((prevState) => [...prevState, ...sortedArray]);

      if (d1.characters.info.next || d2.characters.info.next) {
        setNextPage(d1.characters.info.next || d2.characters.info.next);
      } else {
        setNextPage(0);
      }

      getComponentData(filteredCharacters.length, nextPage);

      return () => {
        // TODO: clean up
      };
    }
  }, [d1, d2]);

  return (
    <>
      {l1 || (l2 && <Spinner />)}
      {e1 || (e2 && <p>Error</p>)}

      {filteredCharacters.map((char: any) => {
        if (char.id) {
          return (
            <CharacterCard
              key={uuidv4()}
              image={char.image}
              name={char.name}
              id={char.id}
              location={char.location}
            />
          );
        }
      })}
    </>
  );
};

export default AllCharacters;
