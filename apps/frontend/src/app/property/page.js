"use client";
import PropertyCard from "@/components/PropertyCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CgAdd } from "react-icons/cg";

export default function Page() {
  return (
    <div className="bg-bgIndlay w-full min-h-screen px-10 py-5">
      <div className="h-[100px] w-full">
        <Image src="/images/logo.png" width={118} height={48} alt={"Indlay"} />
      </div>
      <h1 className="font-youth font-medium text-[32px] text-center mb-10">
        Welcome back,
      </h1>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <Link
          href="/"
          className="min-w-[300px] min-h-[300px] h-full border border-borderIndlay rounded-[20px] text-4xl flex items-center justify-center shadow-md"
        >
          <CgAdd />
        </Link>
        {Array(20)
          ?.fill(0)
          ?.map((_, i) => (
            <PropertyCard key={i} tag={i % 2 === 0 ? "" : "Best Seller"} />
          ))}
      </div>
    </div>
  );
}
