import { createContext, useState, useContext } from 'react';

// type MenuSelectionType = 'Menu' | 'Board Info' | 'Settings';
// See my payload project on how to organize these

const BoardMenuContext = createContext<{
  isOpen: boolean;
  currentSelection: string;
  openBoardMenu: () => void;
  closeBoardMenu: () => void;
}>({
  isOpen: false,
  currentSelection: 'Menu',
  openBoardMenu: () => {},
  closeBoardMenu: () => {},
});

export const BoardMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentSelection, setCurrentSelection] = useState<string>('Menu');

  const openBoardMenu = () => {
    if (!isOpen) setIsOpen(true);
  };

  const closeBoardMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <BoardMenuContext.Provider
      value={{
        isOpen,
        currentSelection,
        openBoardMenu,
        closeBoardMenu,
      }}
    >
      {children}
    </BoardMenuContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBoardMenu = () => useContext(BoardMenuContext);
