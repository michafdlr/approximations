import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon } from '@heroicons/react/24/solid';

export default function TopNav() {
  return (
    <nav className="flex w-full px-2 py-0 bg-gray-700 sticky top-0 z-50 text-white-600 mb-2">
      <Link
        className="flex items-start justify-start p-1"
        href="/"
        key={"home"}
      >
        <HomeIcon className="size-8 text-white-600 hover:text-blue-400" />
      </Link>
      <div className="flex grow flex-row justify-end space-x-0">
        {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div> */}
        <Link
        href="/intervallhalbierung"
        key={"Intervallhalbierung"}
        >
          <button className="flex h-[48px] items-center justify-center gap-2 p-3 text-lg font-medium hover:text-blue-400">
            {/* <PowerIcon className="w-6" /> */}
            <div className="md:block">Intervallhalbierung</div>
          </button>
        </Link>
        <Link
        href="/heron"
        key={"Heron"}
        >
          <button className="flex h-[48px] items-center justify-center gap-2 p-3 text-lg font-medium hover:text-blue-400">
            {/* <PowerIcon className="w-6" /> */}
            <div className="md:block">Heron-Verfahren</div>
          </button>
        </Link>
      </div>
    </nav>
  );
}
