export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Kanha Glow BH
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Backend API service is running successfully
        </p>
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">API Status</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Contact API:</span>
              <span className="text-green-600">✓ Active</span>
            </div>
            <div className="flex justify-between">
              <span>Admin Panel:</span>
              <span className="text-green-600">✓ Available</span>
            </div>
            <div className="flex justify-between">
              <span>Origin Validation:</span>
              <span className="text-blue-600">⚙ Configurable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
