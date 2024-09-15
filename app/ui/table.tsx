export default function Table({ data, step }: {data: object, step: number}) {
  return(
    <table className='w-full text-base text-left text-white-600 table-auto border-2 border-white-400 rounded-lg mt-1'>
      <caption className="text-lg font-semibold text-left text-white-600 bg-white mb-1">
            Grenzen
            <p className="mt-1 mb-1 text-base font-normal text-white-600">Zeigt die Entwicklung der Grenzen beim Intervallhalbierungsverfahren für die angegebene Genauigkeit.</p>
        </caption>
      <thead className='text-lg text-gray-500 uppercase bg-gray-50 border-2 border-white-400 rounded-lg'>
        <tr>
          <th key={"step"} className='border-r-white-400 border-r-2 w-2/12'>Schritt</th>
          <th key={"left"} className='border-r-white-400 border-r-2 w-5/12'>Linke Grenze</th>
          <th key={"right"} className='border-r-white-400 border-r-2 w-5/12'>Rechte Grenze</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value], index) => {
          if(index<step && value.left) {
            return(
            <tr key={key} className="odd:bg-white even:bg-gray-600 border-b-2 border-b-white-400 border-r-white-400 border-r-2">
              <td className='border-b-2 border-b-white-400 border-r-white-400 border-r-2'>{key}</td>
              <td className='border-b-2 border-b-white-400 border-r-white-400 border-r-2'>{value.left}</td>
              <td className='border-b-2 border-b-white-400 border-r-white-400 border-r-2'>{value.right}</td>
            </tr>
            )
          }
        })}
      </tbody>
    </table>
  )
}
