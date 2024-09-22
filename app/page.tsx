import Link from 'next/link';
import Image from 'next/image'

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-normal text-justify p-2">
        <h1 className="font-bold text-2xl">Näherung von Quadratwurzeln</h1>
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
        <Card heading='Intervallhalbierungsverfahren' imgSrc='ival.png'/>
      </main>
  );
}

function Card({heading, imgSrc}: {heading: string, imgSrc: string}) {
  return (
    <div className='flex flex-col w-1/4 mb-2 mt-8 p-2 border-2 rounded-md transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:text-blue-400 hover:border-blue-400 cursor-pointer'>
      <h1 className='text-xl mb-2 font-extrabold underline'>{heading}</h1>
      <p className='text-lg mb-3'>
        Ein einfaches rekursives Verfahren zur näherungsweisen Bestimmung des Werts des Wurzelterms durch sukzessives Halbieren eines Intervalls, in dem der Wert liegt.
      </p>
      <Image
        src={`/${imgSrc}`}
        width={500}
        height={500}
        alt="Bild der Zahlengeraden"
      />
    </div>
  )
}
