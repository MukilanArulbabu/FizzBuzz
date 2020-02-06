import React from 'react';
import Loader from 'react-loader-spinner'

function Spinner() {
  return (
    <div className="flex justify-center items-center fullpage-overlap"><Loader type="Puff" color="#48bb78" height={100} width={100} /> </div>
  );
}

export default Spinner;