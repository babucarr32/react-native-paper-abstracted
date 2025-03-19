import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

type ImageWithFallbackProps = ImageProps & {
  fallback: string;
};

const ImageWithFallback = ({ fallback, alt, src, ...props }: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallback : src}
      {...props}
    />
  );
};

export default ImageWithFallback;
