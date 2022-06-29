export interface HeaderProps {
  title: string;
  handleFilter: (character: string) => void;
  selectedCharacter: string;
  filterUsed: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface Character {
  id: number;
  name: string;
  location: {
    name: string;
  };
  image: string;
}

export interface AllCharactersProps {
  pageNum: number;
  getComponentData: (dataLength: number, nextPage: number) => void;
}

export interface SingleCharacterProps {
  selectedCharacter: string;
  pageNum: number;
  getComponentData: (dataLength: number, nextPage: number) => void;
  setNextPageApp: (nextPage: number) => void;
  setPageNumApp: (pageNum: number) => void;
}
