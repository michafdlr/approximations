import Link from 'next/link';

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-normal text-justify p-2">
        <h1 className="font-bold text-xl">Näherung von Quadratwurzeln</h1>
        <p>
          Auf diesen Seiten kannst Du zwei verschiedene Verfahren zur näherungsweisen Berechnung von Quadratwurzeln kennenlernen, das <Link
            href="/intervallhalbierung"
            key={"Intervallhalbierung"}
          >
            <strong className='hover:text-blue-400'>
              Intervallhalbierungsverfahren
            </strong>
          </Link> und das <Link
            href="/heron"
            key={"Heron"}
          >
            <strong className='hover:text-blue-400'>
              Heron-Verfahren
            </strong>
          </Link>.
        </p>
      </main>
  );
}
