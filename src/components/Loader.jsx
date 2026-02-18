import { FidgetSpinner } from 'react-loader-spinner'

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <FidgetSpinner
        height={80}
        width={80}
        color="#ff2d55"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="loading-spinner"
        secondaryColor="#ff7a18"
        strokeWidth={3}
        strokeWidthSecondary={3}
      />
    </div>
  )
}
export default Loader;