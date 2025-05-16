// src/app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8">
      <main>
        <h1 className="text-xl font-bold">Hola desde Next.js</h1>
        <Image src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
      </main>
    </div>
  );
}
