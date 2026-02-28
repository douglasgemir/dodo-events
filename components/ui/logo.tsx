import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Dodo Events"
      width={150}
      height={100}
      priority
    />
  );
}
