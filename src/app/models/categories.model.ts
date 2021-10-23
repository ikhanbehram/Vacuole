export interface categoriesHelper {
  id: number;
  title: string;
  description: string;
  sub_categories: categoriesHelper[];
}

export interface Categories {
  data: [categoriesHelper];
}
