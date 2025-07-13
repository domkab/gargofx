import { ContentBlock } from './iPost';

export type postFormData = {
  title: {
    bold: string;
    regular?: string;
  };
  slug: string;
  heroImage: {
    url: string;
    alt?: string;
  };
  description?: string;
  optionalDescription?: string;
  content: ContentBlock[];
  credits: string;
};