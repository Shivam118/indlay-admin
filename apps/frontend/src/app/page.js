import PropertyCard from "@/components/PropertyCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-bgIndlay w-full min-h-screen px-10 py-5">
      <div className="h-[100px] w-full">
        <Image src="/images/logo.png" width={118} height={48} alt={"Indlay"} />
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="grid grid-cols-4 gap-7 w-[800px]">
          <Link
            href="/property"
            className="col-span-2 row-span-2 w-full min-w-[200px] h-full min-h-[200px] bg-gradient-to-br from-[#E6E6FA] to-[#FADADD] rounded-[30px] text-2xl flex items-center justify-center"
          >
            Properties
          </Link>
          <Link
            href="/services"
            className="col-span-1 w-full min-w-[200px] h-full min-h-[200px] bg-gradient-to-br from-[#CCFFCC] to-[#B0E0E6] rounded-[30px] text-2xl flex items-center justify-center"
          >
            Services
          </Link>
          <Link
            href="/info"
            className="col-span-1 w-full min-w-[200px] h-full min-h-[200px] bg-gradient-to-br from-[#FFE5D9] to-[#FFB6C1] rounded-[30px] text-2xl flex items-center justify-center"
          >
            General Info
          </Link>
          <Link
            href="/amenities"
            className="col-span-1 w-full min-w-[200px] h-full min-h-[200px] bg-gradient-to-br from-[#F7DAD9] to-[#DCC5E1] rounded-[30px] text-2xl flex items-center justify-center"
          >
            Amenities
          </Link>
          <Link
            href="/users"
            className="col-span-1 w-full min-w-[200px] h-full min-h-[200px] bg-gradient-to-br from-[#FFF8E1] to-[#E8D3C5] rounded-[30px] text-2xl flex items-center justify-center"
          >
            Users
          </Link>
        </div>
      </div>
    </div>
  );
}
