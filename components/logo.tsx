import Image from "next/image";
import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link className={`brand-logo ${inverted ? "brand-logo--inverted" : ""}`} href="/" aria-label="H Infinity home">
      <Image
        src="/brand/hinfinity-header-logo.png"
        alt="H Infinity 社會文化實踐計劃"
        width={719}
        height={216}
        priority
      />
    </Link>
  );
}
