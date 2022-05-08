export interface Details {
  description: string;
  id: number;
  image: string;
  title: string;
  rating: number;
  comments: [
    {
      comment: string;
      user: {
        id: number;
        name: string;
        image: string;
      };
    }
  ];
}
