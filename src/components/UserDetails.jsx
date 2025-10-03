import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from '../store/usersSlice';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => selectUserById(state, id));

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">User Not Found</h3>
            <p className="mb-4">The user you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Back to User List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-7">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-gray-700 hover:text-primary-600 font-semibold mb-6 inline-flex items-center transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 h-24 relative">
            <div className="absolute -bottom-6 left-6">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-600">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-10 px-6 md:px-8 pb-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user.name}
              </h1>
              <p className="text-gray-600 text-base">@{user.username}</p>
            </div>

            <div className="mb-7">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a href={`mailto:${user.email}`} className="text-base font-medium text-primary-600 hover:text-primary-700 truncate block">
                      {user.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <a href={`tel:${user.phone}`} className="text-base font-medium text-gray-900">
                      {user.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Website</p>
                    <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-primary-600 hover:text-primary-700 truncate block">
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {user.address && (
              <div className="mb-7">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Address
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-base text-gray-700 leading-relaxed">
                    {user.address.street}
                    {user.address.suite && <>, {user.address.suite}</>}
                    <br />
                    {user.address.city}, {user.address.zipcode}
                  </p>
                  {user.address.geo && (
                    <p className="text-sm text-gray-500 mt-2">
                      GPS: {user.address.geo.lat}, {user.address.geo.lng}
                    </p>
                  )}
                </div>
              </div>
            )}

            {user.company && (
              <div className="mb-7">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Company
                </h3>
                <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg p-4">
                  <p className="text-xl font-bold text-gray-900 mb-2">
                    {user.company.name}
                  </p>
                  {user.company.catchPhrase && (
                    <p className="text-base text-gray-700 italic mb-2">
                      "{user.company.catchPhrase}"
                    </p>
                  )}
                  {user.company.bs && (
                    <p className="text-sm text-gray-600">{user.company.bs}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate(`/edit-user/${user.id}`)}
                className="btn-primary"
              >
                Edit User
              </button>
              <button onClick={() => navigate('/')} className="btn-secondary">
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

