"use client";

import { Card } from "./ui/Card";
import { details } from "@/lib/types";
import Image from "next/image";

export default function MemberCard({
  name,
  role,
  image,
  description,
}: details) {
  return (
    <Card className="w-full max-w-sm rounded-xl border">
      <div className="p-6 grid gap-4">
        <div className="flex gap-8 items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Image
              src={image}
              width={96}
              height={96}
              alt={name[0]}
            />
          </div>
          <div className="grid gap-1.5">
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Card>
  );
}
