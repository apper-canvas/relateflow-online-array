import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <ApperIcon name="FileQuestion" className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-xl text-gray-600 mb-4">Page Not Found</h2>
          <p className="text-gray-500 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <Link
          to="/"
          className="inline-flex items-center btn-primary"
        >
          <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound