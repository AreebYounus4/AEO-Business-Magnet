export function LogoMark() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 1L16.5 5.25V12.75L9 17L1.5 12.75V5.25L9 1Z"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M9 5L12.5 7.25V11.75L9 14L5.5 11.75V7.25L9 5Z" fill="white" />
    </svg>
  );
}

export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8h10M8 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
