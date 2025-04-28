import { useState, } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

export const Form = () => {
  const [data, setData] = useState({age: '', height: '', weight: '', bmi: '', category: ''})
  const [individual, setIndividual] = useState([])
  const [currentIndividual, setCurrentIndividual] = useState(null);  // displays CURRENT info
  const calculateBmi = (height, weight) => {
    let bmi 
    height = (height / 39.37)
    weight = (weight / 2.205)
 
    bmi = (weight / (height * height)) 
    let roundedBmi = Math.round(bmi * 10) / 10 
    return roundedBmi
  }

  const bmiCategory = (bmi) => {
    switch (true) {
      case (bmi < 18.5):
        return 'Your Bmi suggests you are Underweight';
  
      case (bmi >= 18.5 && bmi < 24.9):
        return 'Your Bmi suggests you are a Healthy Weight';
  
      case (bmi >= 25 && bmi < 25.9):
        return 'Your Bmi suggests you are Overweight';

      case (bmi >= 30):
        return 'Your Bmi suggests you are Obese';
  
      default:
        return 'Error';;
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target; 
    const numericValue = value === '' ? '' : Number(value)
    setData(prevData => {
      const updatedData = {
        ...prevData,
        [name]: numericValue
      };
  
      if (updatedData.height && updatedData.weight) {
        const bmiVal = calculateBmi(updatedData.height, updatedData.weight);
        const category = bmiCategory(bmiVal)
        updatedData.bmi = bmiVal;
        updatedData.category = category
      }
  
      return updatedData;
    });
  }

const handleSubmit = () => {
  const newIndividual = {
    ...data,
  };
  setCurrentIndividual(newIndividual); 
  
  calculateBmi(data.height, data.weight)
  setIndividual(prevList => [...prevList, data])


 

  console.log(individual)
  console.log("Submitted Data:", data)
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
          <input type="number" className="form-control" id="inputPassword4"     placeholder="Enter Height(In Inches)"
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
      <div></div>
    <Link to="/"><button>Back Home</button></Link>
      <h2>Your BMI</h2>
      {currentIndividual && (
        <div>
          <h2>Current Individual</h2>
          <p>Age: {currentIndividual.age}</p>
          <p>Height: {currentIndividual.height} inches</p>
          <p>Weight: {currentIndividual.weight} lbs</p>
          <p>BMI: {currentIndividual.bmi}</p>
          <p>Category: {currentIndividual.category}</p>
        </div>
      )}
    </>
  )
}

export default Form