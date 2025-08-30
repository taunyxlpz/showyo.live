import Image from 'next/image';

export default function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/ShowYo Yellow.png"
      alt="ShowYo"
      width={240}
      height={80}
      className={className}
    />
  );
}
