import React, { useState } from 'react';
import { Calendar, Users, Mail, RotateCcw } from 'lucide-react';

const EmployeeDataScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [employeeData, setEmployeeData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Sample employee data
  const sampleEmployees = [
    {
      id: 1,
      name: 'John Smith',
      position: 'Software Engineer',
      department: 'IT',
      email: 'john.smith@company.com',
      phone: '+1-555-0101',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Product Manager',
      department: 'Product',
      email: 'sarah.johnson@company.com',
      phone: '+1-555-0102',
      joinDate: '2022-03-20'
    },
    {
      id: 3,
      name: 'Mike Davis',
      position: 'Designer',
      department: 'Design',
      email: 'mike.davis@company.com',
      phone: '+1-555-0103',
      joinDate: '2023-06-10'
    },
    {
      id: 4,
      name: 'Emily Brown',
      position: 'HR Manager',
      department: 'Human Resources',
      email: 'emily.brown@company.com',
      phone: '+1-555-0104',
      joinDate: '2021-11-05'
    },
    {
      id: 5,
      name: 'David Wilson',
      position: 'Sales Representative',
      department: 'Sales',
      email: 'david.wilson@company.com',
      phone: '+1-555-0105',
      joinDate: '2023-02-28'
    }
  ];

  const handleFetch = () => {
    if (!selectedDate) {
      alert('Please select a date first');
      return;
    }
    
    // Simulate fetching data based on selected date
    setEmployeeData(sampleEmployees);
    setShowData(true);
  };

  const handleClear = () => {
    setSelectedDate('');
    setEmployeeData([]);
    setShowData(false);
    setSelectedEmployees([]);
  };

  const handleSendEmail = () => {
    if (selectedEmployees.length === 0) {
      alert('Please select employees to send email');
      return;
    }
    
    const selectedEmails = employeeData
      .filter(emp => selectedEmployees.includes(emp.id))
      .map(emp => emp.email)
      .join(', ');
    
    alert(`Email would be sent to: ${selectedEmails}`);
  };

  const handleEmployeeSelect = (employeeId) => {
    setSelectedEmployees(prev => {
      if (prev.includes(employeeId)) {
        return prev.filter(id => id !== employeeId);
      } else {
        return [...prev, employeeId];
      }
    });
  };

  const selectAllEmployees = () => {
    if (selectedEmployees.length === employeeData.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employeeData.map(emp => emp.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Employee Data Management
          </h1>

          {/* Control Panel */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Calendar Input */}
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <label htmlFor="date" className="text-sm font-medium text-gray-700">
                Select Date:
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleFetch}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Fetch Data
              </button>
              
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="h-4 w-4" />
                Clear
              </button>
              
              <button
                onClick={handleSendEmail}
                disabled={selectedEmployees.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center gap-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </button>
            </div>
          </div>

          {/* Selected Date Display */}
          {selectedDate && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Selected Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          )}
        </div>

        {/* Employee Data Table */}
        {showData && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Employee Data ({employeeData.length} records)
                </h2>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="selectAll"
                    checked={selectedEmployees.length === employeeData.length && employeeData.length > 0}
                    onChange={selectAllEmployees}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="selectAll" className="text-sm text-gray-700">
                    Select All
                  </label>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Select
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employeeData.map((employee) => (
                    <tr 
                      key={employee.id}
                      className={`hover:bg-gray-50 ${selectedEmployees.includes(employee.id) ? 'bg-blue-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={() => handleEmployeeSelect(employee.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        EMP-{employee.id.toString().padStart(3, '0')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                        {employee.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(employee.joinDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer with Selected Count */}
            {selectedEmployees.length > 0 && (
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-700">
                  <strong>{selectedEmployees.length}</strong> employee(s) selected for email
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initial State Message */}
        {!showData && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Data to Display</h3>
            <p className="text-gray-500">Select a date and click "Fetch Data" to display employee information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDataScreen;