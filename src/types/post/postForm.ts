import { ContentBlock } from './iPost';

export type postFormData = {
  title: {
    bold: string;
    regular?: string;
  };
  shortDescription: string;
  heroImage: string;
  description?: string;
  optionalDescription?: string;
  credits: string;
  content: ContentBlock[];
  images: {
    main: {
      url: string;
    };
  };
};