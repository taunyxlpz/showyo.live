import Image from 'next/image';

export default function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/showyo-yellow.png"   // lives in /public
      alt="ShowYo"
      width={240}
      height={80}
      className={className}
      priority
    />
  );
}
