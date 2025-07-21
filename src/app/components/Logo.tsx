import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link
      href="/"
      className="self-center"
    >
      <Image
        src="/icons/Logo.svg"
        alt="GARGOFX Logo"
        width={120}
        height={100}
        priority
      />
    </Link>
  );
}