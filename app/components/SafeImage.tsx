'use client';

import Image, { ImageProps } from 'next/image';
import * as React from 'react';

export default function SafeImage(props: ImageProps) {
  const [errored, setErrored] = React.useState(false);
  const { alt, className, ...rest } = props;

  if (errored) {
    // Simple graceful fallback; customize as you like
    return <div role="img" aria-label={alt} className={className || ''}>{alt}</div>;
  }

  return (
    <Image
      {...rest}
      alt={alt}
      className={className}
      // Important: handler is defined INSIDE the client component
      onError={() => setErrored(true)}
    />
  );
}
