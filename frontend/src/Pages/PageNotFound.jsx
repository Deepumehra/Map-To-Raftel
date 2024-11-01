import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {
    const navigate=useNavigate();
  return (
    <div>
      <h3>404 Page Not Found</h3>
      <button onClick={()=>navigate('/')}>Home</button>
    </div>
  )
}

export default PageNotFound
