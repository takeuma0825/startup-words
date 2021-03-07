// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

/**
 * 用語の説明
 */
export type Word = {
  alphabet?: string;
  category: string;
  description: string;
  fullword?: string;
  investment_round: string;
  syllabary?: string;
  word: string;
};

// export type Words = typeof words;

export type Words = {
  key: string;
  words: Word[];
};
