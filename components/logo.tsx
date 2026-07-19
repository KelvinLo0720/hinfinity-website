import Image from "next/image";
import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link className={`brand-logo ${inverted ? "brand-logo--inverted" : ""}`} href="/" aria-label="H Infinity 首頁">
      <Image
        src="/brand/hinfinity-logo-transparent.png"
        alt="H Infinity 社會文化實踐計劃"
        width={174}
        height={70}
        priority
      />
    </Link>
  );
}
