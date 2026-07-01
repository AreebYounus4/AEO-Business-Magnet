import Image from "next/image";
import {
  PLATFORM_META,
  type PlatformId,
} from "@/components/landing/logos";

interface PlatformLogoProps {
  platform: PlatformId;
  size?: number;
  className?: string;
}

export function PlatformLogo({
  platform,
  size = 18,
  className = "",
}: PlatformLogoProps) {
  const meta = PLATFORM_META[platform];

  return (
    <span
      className={`plat-badge inline-flex shrink-0 items-center justify-center overflow-hidden ${className}`}
      style={{
        width: size + 12,
        height: size + 12,
        background: meta.bg,
        borderRadius: 7,
      }}
      aria-hidden="true"
    >
      <Image
        src={meta.logo}
        alt=""
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
      />
    </span>
  );
}
