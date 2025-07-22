import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={clsx('self-center', className)}>
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