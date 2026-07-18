import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logo.png"
        alt="RentSathi Nepal"
        width={50}
        height={50}
        priority
      />

      <div className="hidden sm:block">
        <h1 className="text-xl font-bold text-violet-700">
          RentSathi
        </h1>

        <p className="text-xs text-gray-500">
          Nepal
        </p>
      </div>
    </Link>
  );
}
