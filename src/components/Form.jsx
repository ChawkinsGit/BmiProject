import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

export const Form = () => {
  const [data, setData] = useState({name: '', age: '', height: '', weight: '', bmi: '', category: ''})
  const [individual, setIndividual] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [currentIndividual, setCurrentIndividual] = useState(null)
  const [formError, setFormError] = useState('');;  // displays CURRENT info
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
  useEffect(() => {
    const savedIndividuals = localStorage.getItem('individualList');
    if (savedIndividuals) {
      setIndividual(JSON.parse(savedIndividuals));
    }
  }, []);

  useEffect(() =>{
    localStorage.setItem('individualList', JSON.stringify(individual))
  }, [individual])

  const handleChange = (event) => {
    const { name, value } = event.target; 
    const numericValue = name === 'name' ? value : value === '' ? '' : Number(value);
    setData(prevData => {
      const updatedData = {
        ...prevData,
        [name]: numericValue,
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

  const handleDelete = (indexToDelete) => {
    setIndividual(prevList => 
      prevList.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleSubmit = (event) => {
    let checkDup = individual.some((curData) => curData.name === data.name && curData.age === data.age && curData.height === data.height && curData.weight === data.weight) 
    event.preventDefault()

    if (
      !data.name ||
      data.age === '' ||
      data.height === '' ||
      data.weight === ''
    ) {
      setFormError('Please fill out all fields before submitting.');
      
      setTimeout(() => {
        setFormError('')
      }, 4000)
      ; // clear any previous error
      return
    ;
    }
    if(checkDup) {
      setFormError('This info has already been entered.')
      setTimeout(() => {
        setFormError('')
      }, 4000)
      return
    }
    const newIndividual = {
      ...data,
    };

    setCurrentIndividual(newIndividual); 
    
    calculateBmi(data.height, data.weight)
    setIndividual(prevList => [...prevList, data])

    localStorage.setItem(individual)

    console.log(individual)
    console.log("Submitted Data:", data)
  }
  return (
  
  <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light">

    {formError && (
      <div className="alert alert-danger w-100 text-center">{formError}</div>
    )}

    <form
      className="row g-3 justify-content-center p-4 border rounded bg-white shadow w-100"
      style={{ maxWidth: '1000px' }}
      onSubmit={handleSubmit}
    >
      <div className="col-md-6">
        <label htmlFor="inputName" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          placeholder="Enter Name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputAge" className="form-label">Age</label>
        <input
          type="number"
          className="form-control"
          id="inputAge"
          placeholder="Enter Age"
          name="age"
          value={data.age}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputHeight" className="form-label">Height</label>
        <input
          type="number"
          className="form-control"
          id="inputHeight"
          placeholder="Enter Height (in inches)"
          name="height"
          value={data.height}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputWeight" className="form-label">Weight</label>
        <input
          type="number"
          className="form-control"
          id="inputWeight"
          placeholder="Enter Weight (lbs)"
          name="weight"
          value={data.weight}
          onChange={handleChange}
        />
      </div>

      <div className="col-12 text-center mt-3">
        <button type="submit" className="btn btn-primary me-2">Calculate BMI</button>
        <Link to="/">
          <button type="button" className="btn btn-secondary">Back Home</button>
        </Link>
      </div>
    </form>

    <div className="w-100 text-center mt-4" style={{ maxWidth: '1000px' }}>
      <h2>Your BMI</h2>
      {currentIndividual && (
        <div>
          <p><strong>Name:</strong> {currentIndividual.name}</p>
          <p><strong>Age:</strong> {currentIndividual.age}</p>
          <p><strong>Height:</strong> {currentIndividual.height} inches</p>
          <p><strong>Weight:</strong> {currentIndividual.weight} lbs</p>
          <p><strong>BMI:</strong> {currentIndividual.bmi}</p>
          <p><strong>Category:</strong> {currentIndividual.category}</p>
        </div>
      )}

      <button 
        className="btn btn-secondary my-3" 
        onClick={() => setShowAll(prev => !prev)}
      >
        {showAll ? 'Hide All Entries' : 'Show All Entries'}
      </button>

      {showAll && individual.length > 0 && (
        <div className="mt-2">
          <h3>All Entries</h3>
          {individual.map((person, index) => (
            <div key={index} className="border p-2 mb-2 text-start">
              <p><strong>Name:</strong> {person.name}</p>
              <p><strong>Age:</strong> {person.age}</p>
              <p><strong>Height:</strong> {person.height} inches</p>
              <p><strong>Weight:</strong> {person.weight} lbs</p>
              <p><strong>BMI:</strong> {person.bmi}</p>
              <p><strong>Category:</strong> {person.category}</p>
              <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

  
);



}

export default Form