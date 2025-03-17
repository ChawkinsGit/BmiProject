import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

export const Form = () => {
  const [bmi, setBmi] = useState({age: '', height: Number, weight: Number })
  const [inputVal, setInputVal] = useState()
  const calculateBmi = (height, weight) => {
    let bmi 
    height = (height / 39.37)
    weight = (weight / 2.205)

    bmi = (weight / (height * height)) 
    return bmi
  }
  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Age</label>
          <input type="text" className="form-control" id="inputEmail4" placeholder="Enter Age"/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Height</label>
          <input type="password" className="form-control" id="inputPassword4" placeholder="Enter Height(In Inches)"/>
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">Weight</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="Enter Weight(lb)" />
        </div>
        
       
        
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Caclulate BMI</button>
        </div>
      </form>
    <Link to="/"><button>Back Home</button></Link>
    </>
  )
}

export default Form