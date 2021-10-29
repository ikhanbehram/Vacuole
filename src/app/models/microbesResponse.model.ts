import { MicrobeCard } from './microbeCard.model';

export interface links {
  url: string;
  label: number;
  active: boolean;
}

export interface responseData {
  data: MicrobeCard[];
  prev_page_url: string;
  next_page_url: string;
  links: links[];
}
