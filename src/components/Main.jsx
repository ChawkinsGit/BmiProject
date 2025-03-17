import { Link } from 'react-router-dom';

export function Main() {
  return (
       <div>
            <h1>Welcome!</h1>
            <Link to="/Form">
                <button>Find Your BMI</button>
            </Link>
        </div>

  )
}

export default Main