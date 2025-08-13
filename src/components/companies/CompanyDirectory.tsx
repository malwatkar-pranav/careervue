import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Building, MapPin, Users, Calendar } from 'lucide-react';
import { indianCompanies, sectors } from '../../data/companies';
import { Company } from '../../types';

export const CompanyDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCompanies = indianCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'All Sectors' || company.sector === selectedSector;
    
    return matchesSearch && matchesSector;
  });

  const handleVisitWebsite = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleViewCareers = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Company Directory</h1>
        <p className="text-gray-600">Explore career opportunities at top Indian companies</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filter by Sector</span>
          </button>
        </div>

        {showFilters && (
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Company Directory Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Building className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Private Company Career Links</h2>
        </div>
        <div className="hidden md:grid md:grid-cols-4 gap-4 text-sm font-medium">
          <div className="flex items-center space-x-2">
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">SR NO</span>
            <span>COMPANY NAME</span>
          </div>
          <div className="text-center">OFFICIAL WEBSITE</div>
          <div className="text-center">CAREER LINK</div>
          <div className="text-center">DETAILS</div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {filteredCompanies.length} of {indianCompanies.length} companies
        </p>
        <div className="flex items-center space-x-2">
          <Building className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            {filteredCompanies.filter(c => c.sector === 'Government').length} Government • {' '}
            {filteredCompanies.filter(c => c.sector !== 'Government').length} Private
          </span>
        </div>
      </div>

      {/* Company List */}
      <div className="space-y-4">
        {filteredCompanies.map((company, index) => (
          <div key={company.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {/* Company Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{company.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        company.sector === 'Government' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {company.sector}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Official Website */}
                <div className="text-center">
                  <button
                    onClick={() => handleVisitWebsite(company.officialWebsite)}
                    className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Visit Website</span>
                  </button>
                </div>

                {/* Career Link */}
                <div className="text-center">
                  <button
                    onClick={() => handleViewCareers(company.careerLink)}
                    className="inline-flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    <Building className="h-4 w-4" />
                    <span>View Careers</span>
                  </button>
                </div>

                {/* Company Details */}
                <div className="text-center md:text-left">
                  <div className="space-y-1 text-sm text-gray-600">
                    {company.headquarters && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{company.headquarters}</span>
                      </div>
                    )}
                    {company.employees && (
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{company.employees} employees</span>
                      </div>
                    )}
                    {company.founded && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Founded {company.founded}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Description */}
              {company.description && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">{company.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};