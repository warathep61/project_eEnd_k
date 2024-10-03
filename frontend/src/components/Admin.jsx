import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../App';

export default function Admin() {
  const { token } = useContext(DataContext);
  const [data, setData] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [industry, setIndustry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch all data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/company', {
        headers: {
          'Authorization': `Bearer ${token}`, // ส่ง token ใน header
        },
      });
      const result = await response.json();
      setData(result); // Assuming the data is in result.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log('token', token)

  // Function to handle create or update
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const url = editingId ? `http://127.0.0.1:8000/api/company/${editingId}` : 'http://127.0.0.1:8000/api/company';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ส่ง token ใน header
        },
        body: JSON.stringify({
          company_name: companyName,
          registration_number: registrationNumber,
          industry,
          address,
          city,
          state,
          postal_code: postalCode,
          country,
          phone,
          email,
          website,
          annual_revenue: annualRevenue,
          number_of_employees: numberOfEmployees,
          is_active: isActive,
        }),
      });

      if (response.ok) {
        setMessage(editingId ? 'Successfully updated!' : 'Successfully created!');
        fetchData(); // Refresh data
        resetForm();
      } else {
        setMessage('Operation failed!');
      }
    } catch (error) {
      console.error('Error during operation:', error);
      setMessage('An error occurred.');
    }
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/company/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // ส่ง token ใน header
        },
      });

      if (response.ok) {
        setMessage('Successfully deleted!');
        fetchData(); // Refresh data
      } else {
        setMessage('Delete failed!');
      }
    } catch (error) {
      console.error('Error during delete:', error);
      setMessage('An error occurred during delete.');
    }
  };

  // Function to handle edit
  const handleEdit = (item) => {
    setCompanyName(item.company_name);
    setRegistrationNumber(item.registration_number);
    setIndustry(item.industry);
    setAddress(item.address);
    setCity(item.city);
    setState(item.state);
    setPostalCode(item.postal_code);
    setCountry(item.country);
    setPhone(item.phone);
    setEmail(item.email);
    setWebsite(item.website);
    setAnnualRevenue(item.annual_revenue);
    setNumberOfEmployees(item.number_of_employees);
    setIsActive(item.is_active);
    setEditingId(item.id); // Set id for editing
  };

  // Function to reset form
  const resetForm = () => {
    setCompanyName('');
    setRegistrationNumber('');
    setIndustry('');
    setAddress('');
    setCity('');
    setState('');
    setPostalCode('');
    setCountry('');
    setPhone('');
    setEmail('');
    setWebsite('');
    setAnnualRevenue('');
    setNumberOfEmployees('');
    setIsActive(true);
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <div>
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <h6 className="text-2xl font-medium mb-4">Token {token}</h6>
      </div>

      {message && (
        <div className="mb-4 text-center text-green-600 font-semibold">
          {message}
        </div>
      )}

      {/* Form to create or edit data */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)} // Update company name state
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Registration Number</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)} // Update registration number state
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Industry</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)} // Update industry state
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Address</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Update address state
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">City</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={city}
            onChange={(e) => setCity(e.target.value)} // Update city state
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">State</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={state}
            onChange={(e) => setState(e.target.value)} // Update state
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Postal Code</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)} // Update postal code
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Country</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={country}
            onChange={(e) => setCountry(e.target.value)} // Update country state
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} // Update phone state
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Website</label>
          <input
            type="url"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={website}
            onChange={(e) => setWebsite(e.target.value)} // Update website state
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Annual Revenue</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={annualRevenue}
            onChange={(e) => setAnnualRevenue(e.target.value)} // Update annual revenue state
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Number of Employees</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={numberOfEmployees}
            onChange={(e) => setNumberOfEmployees(e.target.value)} // Update number of employees state
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Is Active</label>
          <input
            type="checkbox"
            className="mr-2 leading-tight"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)} // Update isActive state
          />
          <span className="text-gray-700">Active</span>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {editingId ? 'Update Company' : 'Add Company'}
        </button>
      </form>

      {/* Display the list of companies */}
      <h2 className="text-xl font-bold mb-4">Company List</h2>
      <table className="min-w-full bg-white border border-gray-300 mb-[10rem]">
        <thead>
          <tr>
            {/* <th className="py-2 px-4 border-b">#</th> */}
            <th className="py-2 px-4 border-b">Company Name</th>
            <th className="py-2 px-4 border-b">Registration Number</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              {/* <td className="py-2 px-4 border-b">{index + 1}</td> */}
              <td className="py-2 px-4 border-b text-center">{item.company_name}</td>
              <td className="py-2 px-4 border-b text-center">{item.registration_number}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:underline ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
