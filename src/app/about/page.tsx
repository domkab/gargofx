import { SITE_TITLE, CHARACTER_NAME } from '@/lib/constants';
import { aboutMetadata } from '@/lib/metadata/about';

export const metadata = aboutMetadata;

export default function AboutPage() {
  return (
    <main className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-6">About {SITE_TITLE}</h1>

      <p className="text-sm text-muted-foreground mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </p>

      <p className="text-sm text-muted-foreground mb-4">
        Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
      </p>

      <p className="text-sm text-muted-foreground">
        This site is managed by <strong>{CHARACTER_NAME}</strong>, your friendly guide through all things tech.
      </p>
    </main>
  );
}