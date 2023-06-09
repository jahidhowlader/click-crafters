import { CircleLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div
      className='
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    '
    >
      <CircleLoader size={100} color="#18D7DA" />
    </div>
  )
}

export default Loader