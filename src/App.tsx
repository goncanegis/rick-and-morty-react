import React from 'react';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AllCharacters from './components/AllCharacters';
import SingleCharacter from './components/SingleCharacter';
import Spinner from './components/Spinner';
import Header from './components/Header';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState('Rick');
  const [filterUsed, setFilterUsed] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);

  // helper function to get character data length and next page from child components
  const getComponentData = (dataLength: number, nextPage: number) => {
    setDataLength(dataLength);
    setNextPage(nextPage);
  };

  // helper function to set selected character from modal
  const handleFilter = (e: React.SetStateAction<string>) => {
    setSelectedCharacter(e);
    setIsOpen(false);
    if (!filterUsed) {
      setFilterUsed(true);
    }
  };

  return (
    <div className="container">
      <Header
        title={!filterUsed ? 'Rick and Morty' : selectedCharacter}
        handleFilter={handleFilter}
        selectedCharacter={selectedCharacter}
        filterUsed={filterUsed}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <main>
        <InfiniteScroll
          className="card-grid"
          dataLength={dataLength}
          next={() => setPageNum((prevNum) => prevNum + 1)}
          hasMore={nextPage ? true : false}
          loader={<Spinner />}
          endMessage={
            <h3
              style={{
                textAlign: 'center',
                marginTop: '2rem',
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              onClick={() => window.scrollTo(0, 0)}
            >
              Wubba Lubba Dub Dub! You have seen it all. Back to top?
            </h3>
          }
        >
          {!filterUsed && (
            <AllCharacters
              pageNum={pageNum}
              getComponentData={getComponentData}
            />
          )}
          {filterUsed && (
            <SingleCharacter
              selectedCharacter={selectedCharacter}
              pageNum={pageNum}
              setPageNumApp={setPageNum}
              getComponentData={getComponentData}
              setNextPageApp={setNextPage}
            />
          )}
        </InfiniteScroll>
      </main>

      <div className="bg-color" />
    </div>
  );
};

export default App;
