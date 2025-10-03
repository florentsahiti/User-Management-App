import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, selectUserById } from '../store/usersSlice';

const UserForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const existingUser = useSelector((state) =>
    isEdit ? selectUserById(state, id) : null
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
    },
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isEdit && existingUser) {
      setFormData({
        name: existingUser.name || '',
        email: existingUser.email || '',
        username: existingUser.username || '',
        phone: existingUser.phone || '',
        website: existingUser.website || '',
        company: {
          name: existingUser.company?.name || '',
          catchPhrase: existingUser.company?.catchPhrase || '',
          bs: existingUser.company?.bs || '',
        },
        address: {
          street: existingUser.address?.street || '',
          suite: existingUser.address?.suite || '',
          city: existingUser.address?.city || '',
          zipcode: existingUser.address?.zipcode || '',
        },
      });
    }
  }, [isEdit, existingUser]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
    });

    if (!validateForm()) {
      return;
    }

    if (isEdit) {
      dispatch(updateUser({ ...formData, id: parseInt(id) }));
    } else {
      dispatch(addUser(formData));
    }

    navigate('/');
  };

  if (isEdit && !existingUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">User Not Found</h3>
            <p className="mb-4">The user you're trying to edit doesn't exist.</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Back to User List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-primary-600 hover:text-primary-800 font-medium mb-4 inline-flex items-center"
          >
            ← Back to Users
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            {isEdit ? 'Edit User' : 'Add New User'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="card p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Basic Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input-field ${
                    errors.name && touched.name ? 'border-red-500' : ''
                  }`}
                  placeholder="Florent Sahiti"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input-field ${
                    errors.email && touched.email ? 'border-red-500' : ''
                  }`}
                  placeholder="florent.sahiti@example.com"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="florentsahiti"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+383 44 123 456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="florentsahiti.com"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Company Information
            </h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company.name"
                  value={formData.company.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Linkplus Technologies"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catch Phrase
                </label>
                <input
                  type="text"
                  name="company.catchPhrase"
                  value={formData.company.catchPhrase}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Connecting Innovation and Excellence"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business
                </label>
                <input
                  type="text"
                  name="company.bs"
                  value={formData.company.bs}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Software development and IT solutions"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Address
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Rruga Nëna Tereze"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suite
                </label>
                <input
                  type="text"
                  name="address.suite"
                  value={formData.address.suite}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Building 12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Pristina"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zipcode
                </label>
                <input
                  type="text"
                  name="address.zipcode"
                  value={formData.address.zipcode}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="10000"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <button type="submit" className="btn-primary">
              {isEdit ? 'Update User' : 'Add User'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;

