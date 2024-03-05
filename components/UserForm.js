'use client'
// components/UserForm.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../store/usersSlice';
import { useRouter } from 'next/router'

const UserForm = ({ existingUser }) => {
  const router = useRouter();

  const [userData, setUserData] = useState(existingUser || {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingUser) {
      dispatch(updateUser(userData));
      router.push('/');
      setUserData({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
      });
    } else {
      dispatch(addUser(userData));
      setUserData({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
      });
    }
    // Reset form or give feedback
  };

  const handleCancel = () => {
    router.push('/')
  };

  return (
    <div  >
        <form onSubmit={handleSubmit}>
            <input className="w-full px-2 py-1 border-2 border-indigo-600 mb-2 rounded focus:border-teal focus:outline-none focus:ring-2" type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Name" required />
            <input className="w-full px-2 py-1 border-2 border-indigo-600 mb-2 rounded focus:border-teal focus:outline-none focus:ring-2" type="text" name="lastName" value={userData.lastName} onChange={handleChange} placeholder="Last Name" required />
            <input className="w-full px-2 py-1 border-2 border-indigo-600 mb-2 rounded focus:border-teal focus:outline-none focus:ring-2" type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
            <input className="w-full px-2 py-1 border-2 border-indigo-600 mb-2 rounded focus:border-teal focus:outline-none focus:ring-2" type="tel" name="phone" value={userData.phone} onChange={handleChange} placeholder="Phone" required />
            <input className="w-full px-2 py-1 border-2 border-indigo-600 mb-2 rounded focus:border-teal focus:outline-none focus:ring-2" type="text" name="address" value={userData.address} onChange={handleChange} placeholder="Address" required />
            {existingUser && <button className='w-full mb-2 bg-red-600 hover:bg-red-800 rounded text-white p-2' type="button" onClick={handleCancel}>Cancel</button>}
            <button className="w-full px-2 py-1 border-2 border-indigo-600 mb-2 rounded bg-indigo-600 hover:bg-indigo-800 text-white transition-all" type="submit">{!existingUser ? 'Submit' : 'Update'}</button>
        </form>
    </div>
  );
};

export default UserForm;
