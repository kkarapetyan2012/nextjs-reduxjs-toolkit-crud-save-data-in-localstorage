// components/UserItem.js
import Link from 'next/link';

const UserItem = ({ user, onDelete }) => {
  return (
    <li className='text-sm mb-2'>
      {user.name} {user.lastName} - {user.email} - {user.phone} - {user.address}{' '}
      <button className='bg-red-600 hover:bg-red-800 rounded text-white p-2' onClick={() => onDelete(user.id)}>Delete</button>{' '}
      <Link href={`/users/${user.id}`} className='bg-indigo-600 hover:bg-indigo-800 rounded text-white p-2'>
        Edit
      </Link>
    </li>
  );
};

export default UserItem;
