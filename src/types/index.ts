export type Card = {
  id: string;
  title: string;
  rank: string;
};

export type List = {
  id: string;
  name: string;
  rank: string;
  color: string;
  cards: Card[];
};
