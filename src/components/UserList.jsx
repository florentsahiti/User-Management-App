import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchUsers,
  setSearchQuery,
  deleteUser,
  selectFilteredAndSortedUsers,
  selectLoading,
  selectError,
  selectSearchQuery,

} from '../store/usersSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectFilteredAndSortedUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const searchQuery = useSelector(selectSearchQuery);
  const hasFetched = useSelector((state) => state.users.hasFetched);

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchUsers());
    }
  }, [dispatch, hasFetched]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleDelete = (userId) => {
    // More mobile-friendly confirmation
    const user = users.find(u => u.id === userId);
    const userName = user ? user.name : 'this user';
    
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      dispatch(deleteUser(userId));
    }
  };

  const handleRowClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 max-w-md">
          <h3 className="font-semibold text-lg mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-7">
      <div className="mb-9">
        <div className="flex items-end justify-between mb-7 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              LinkPlus Team
            </h1>
            <p className="text-gray-500 text-base">
              {users.length} {users.length !== 1 ? 'people' : 'person'} in your team
            </p>
          </div>
        </div>

        <div className="relative max-w-lg">
          <input
            type="text"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="input-field pl-10"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-primary-600 text-white border-b-4 border-primary-700">
                <th className="px-5 py-4 text-left text-base font-bold">
                  NAME
                </th>
                <th className="px-5 py-4 text-left text-base font-bold">
                  EMAIL
                </th>
                <th className="px-5 py-4 text-left text-base font-bold">
                  COMPANY
                </th>
                <th className="px-5 py-4 text-right text-base font-bold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-100 hover:bg-gray-50/80 transition-all cursor-pointer group ${user.isNew ? 'bg-green-50/30' : ''
                    } ${idx % 2 === 1 ? 'bg-gray-50/30' : ''}`}
                >
                  <td
                    className="px-5 py-5"
                    onClick={() => handleRowClick(user.id)}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors text-base">
                        {user.name}
                      </span>
                      {user.isNew && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-500 text-white uppercase tracking-wide">
                          New
                        </span>
                      )}
                    </div>
                  </td>
                  <td
                    className="px-5 py-5 text-gray-600 text-base"
                    onClick={() => handleRowClick(user.id)}
                  >
                    {user.email}
                  </td>
                  <td
                    className="px-5 py-5"
                    onClick={() => handleRowClick(user.id)}
                  >
                    <span className="text-gray-700 text-base font-medium">
                      {user.company?.name || 'N/A'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/edit-user/${user.id}`);
                        }}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="text-sm font-semibold text-black hover:text-gray-700 px-4 py-3 rounded-md hover:bg-gray-100 transition-all border border-gray-300 hover:border-gray-400 min-h-[44px] min-w-[60px] touch-manipulation"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(user.id);
                        }}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="text-sm font-semibold text-red-600 hover:text-red-700 px-4 py-3 rounded-md hover:bg-red-50 transition-all border border-red-300 hover:border-red-400 min-h-[44px] min-w-[70px] touch-manipulation"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="lg:hidden space-y-4">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`bg-white rounded-xl p-5 cursor-pointer hover:shadow-md transition-all border-l-4 ${user.isNew
              ? 'bg-green-50/40 border-green-500'
              : index % 3 === 0
                ? 'border-primary-600'
                : index % 3 === 1
                  ? 'border-blue-500'
                  : 'border-purple-500'
              } shadow-sm border-r border-t border-b border-gray-200`}
            onClick={() => handleRowClick(user.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900 truncate">
                {user.name}
              </h3>
              {user.isNew && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-500 text-white uppercase tracking-wide ml-2">
                  New
                </span>
              )}
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-gray-600 text-base truncate">{user.email}</p>
              <p className="text-gray-500 text-sm">
                <span className="font-medium">Company:</span> {user.company?.name || 'N/A'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/edit-user/${user.id}`);
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="flex-1 text-black hover:text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all text-base border border-gray-300 hover:border-gray-400 min-h-[48px] touch-manipulation"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(user.id);
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="flex-1 text-red-600 hover:text-red-700 font-semibold py-3 px-4 rounded-lg hover:bg-red-50 transition-all text-base border border-red-300 hover:border-red-400 min-h-[48px] touch-manipulation"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No users found</p>
        </div>
      )}
    </div>
  );
};

export default UserList;

