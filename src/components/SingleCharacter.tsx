import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { charactersQuery } from '../../src/charactersQuery';
import { Character, SingleCharacterProps } from '../interfaces';
import CharacterCard from './CharacterCard';
import Spinner from './Spinner';

const SingleCharacter: React.FC<SingleCharacterProps> = ({
  selectedCharacter,
  pageNum,
  getComponentData,
  setPageNumApp,
}) => {
  const [filteredCharacters, setFilteredCharacters] = useState<
    Character[] | [{}]
  >([{}]);
  const [nextPage, setNextPage] = useState(1);
  const [init, setInit] = useState(false);

  const { loading, error, data } = useQuery(
    charactersQuery(selectedCharacter, pageNum)
  );

  // when character is changed, reset array, next page, and page number
  useEffect(() => {
    setFilteredCharacters([{}]);
    setNextPage(1);
    setPageNumApp(1);
    setInit(false);
  }, [selectedCharacter]);

  // fetch data and set array
  useEffect(() => {
    if (!!data) {
      const sortedArray = [...data.characters.results].sort((a, b) => {
        return a.id - b.id;
      });

      setFilteredCharacters((prevState) => [...prevState, ...sortedArray]);

      setNextPage(data.characters.info.next);

      // send data to parent component
      getComponentData(filteredCharacters.length, nextPage);

      setInit(true);

      return () => {
        setInit(false);
      };
    }
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      {error && <p>Error</p>}

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

export default SingleCharacter;
