export const appRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
];

import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Home Page</h1>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Go to Homepage
      </button>
    </div>
  );
}