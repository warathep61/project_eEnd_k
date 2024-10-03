import React, { useEffect, useState } from 'react';

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/company');
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  // Fetch a single company by id when card is clicked
  const handleCardClick = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/company/${id}`);
      const data = await response.json();
      setSelectedCompany(data); // Set the selected company to state
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Companies</h1>
      
      {/* Company Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white shadow-md rounded-lg p-6 cursor-pointer transition transform hover:-translate-y-2 hover:shadow-lg"
            onClick={() => handleCardClick(company.id)} // Fetch company details on click
          >
            <h2 className="text-lg font-semibold mb-2">{company.company_name}</h2>
            <p className="text-gray-600 mb-4">Industry: {company.industry}</p>
            <p className="text-gray-600 mb-4">Location: {company.city}, {company.country}</p>
            <p className="text-blue-500 hover:text-blue-700">View Details</p>
          </div>
        ))}
      </div>

      {/* Selected Company Details */}
      {selectedCompany && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Company Details</h2>
          <p><strong>Name:</strong> {selectedCompany.company_name}</p>
          <p><strong>Industry:</strong> {selectedCompany.industry}</p>
          <p><strong>Address:</strong> {selectedCompany.address}, {selectedCompany.city}, {selectedCompany.state}, {selectedCompany.country}, {selectedCompany.postal_code}</p>
          <p><strong>Phone:</strong> {selectedCompany.phone}</p>
          <p><strong>Email:</strong> {selectedCompany.email}</p>
          <p><strong>Website:</strong> <a href={selectedCompany.website} className="text-blue-500" target="_blank" rel="noopener noreferrer">{selectedCompany.website}</a></p>
          <p><strong>Annual Revenue:</strong> ${selectedCompany.annual_revenue}</p>
          <p><strong>Number of Employees:</strong> {selectedCompany.number_of_employees}</p>
          <p><strong>Status:</strong> {selectedCompany.is_active ? 'Active' : 'Inactive'}</p>
        </div>
      )}
    </div>
  );
}
