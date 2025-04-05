import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

export const Form = () => {
  const [data, setData] = useState({age: '', height: '', weight: '' })
  const [inputVal, setInputVal] = useState()
  const calculateBmi = (height, weight) => {
    let bmi 
    height = (height / 39.37)
    weight = (weight / 2.205)

    bmi = (weight / (height * height)) 
    console.log(bmi) 
  }

  const handleChange = (event) => {
    const { name, value } = event.target; 
    setData((prevData) => ({
        ...prevData,
        [name]: value === '' ? '' : Number(value) , // Update only the changed field
    }));
};

const handleSubmit = (event) => {
  event.preventDefault()
  console.log("Submitted Data:", formData)

}
  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Age</label>
          <input type="number" className="form-control" id="inputEmail4" placeholder="Enter Age"
                name='age'
                value={data.age} 
                onChange={handleChange}  
/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Height</label>
          <input type="number" className="form-control" id="inputPassword4" placeholder="Enter Height(In Inches)"
                name='height'
                value={data.height} 
                onChange={handleChange}  
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">Weight</label>
          <input type="number" className="form-control" id="inputAddress" placeholder="Enter Weight(lb)" 
                name='weight'
                value={data.weight} 
                onChange={handleChange}  
          />
        </div>
        
       
        
        <div className="col-12">
          <button onClick={calculateBmi} type="submit" className="btn btn-primary">Caclulate BMI</button>
        </div>
      </form>
    <Link to="/"><button>Back Home</button></Link>
    </>
  )
}

export default Form