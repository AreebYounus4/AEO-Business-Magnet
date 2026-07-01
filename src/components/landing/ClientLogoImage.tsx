import Image from "next/image";

interface ClientLogoImageProps {
  name: string;
  src: string;
  height?: number;
}

export function ClientLogoImage({
  name,
  src,
  height = 28,
}: ClientLogoImageProps) {
  return (
    <Image
      src={src}
      alt={name}
      width={120}
      height={height}
      className="client-logo-img"
      style={{ width: "auto", height, maxWidth: 110 }}
    />
  );
}
