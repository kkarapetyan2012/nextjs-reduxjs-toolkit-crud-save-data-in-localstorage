// 'use client'
// // pages/index.js
// import { useEffect, useMemo, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addUser, deleteUser } from '../store/usersSlice';
// import UserForm from '../components/UserForm';
// import Link from 'next/link';

// export default function Home({ initialUsers }) {
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState('');
//   // const { users, isLoading } = useSelector((state) => state.users.users);
//   const users = useSelector((state) => state.users.users);

//   if(!users.length) return <p>No data</p>

//   // Filter items based on the search query
//   const filteredItems = useMemo(() => {
//     if (!searchQuery) return users;

//     // Convert search query to lowercase for case-insensitive comparison
//     const lowercasedQuery = searchQuery.toLowerCase();

//     // Filter items that match the query in any field
//     return users.filter((user) =>
//       Object.values(user).some(
//         (value) =>
//           typeof value === 'string' && value.toLowerCase().includes(lowercasedQuery)
//       )
//     );
//   }, [users, searchQuery]);

//   // Hydrate the store with the initial server-side fetched users
//   // useEffect(() => {
//   //   if (initialUsers.length > 0) {
//   //     initialUsers.forEach(user => {
//   //       dispatch(addUser(user));
//   //     });
//   //   }
//   // }, [dispatch, initialUsers]);

//   useEffect(() => {
//     if (initialUsers.length > 0) {
//       initialUsers.forEach(user => {
//         dispatch(addUser(user));
//       });
//     }
//   }, [dispatch, initialUsers]);

//   return (
//     <div>
//       <UserForm />
//       <input
//         type="text"
//         placeholder="Search items..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       {filteredItems.length > 0 ? (
//       <ul className='user-list'>
//         {/* {!searchQuery ? filteredItems.map(user => (
//           <li className='user-item' key={user.id}>
//             {user.name} {user.lastName} - {user.email} - {user.phone} - {user.address}
//             <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
//             <Link href={`/users/${user.id}`}>
//               Edit
//             </Link>
//           </li>
//         )): <li>not match</li>} */}
//         {filteredItems.map((user) => (
//           <li key={user.id}>{user.name} {user.lastName} - {user.email} - {user.phone} - {user.address} {' '} 
//           <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>{' '}
//           <Link href={`/users/${user.id}`}>
//             Edit
//           </Link></li>
//         ))}
//       </ul>): (
//         <p>No match found.</p> // Displayed when no items match the search query
//       )}
//     </div>
//   );
// }

// // This function runs on the server for each request
// export async function getServerSideProps(context) {
//   // Fetch data from an API or other data source

//   const initialUsers = [];
  
//   // Return the initialUsers as props
//   return {
//     props: { initialUsers }, // will be passed to the page component as props
//   };
// }

// // pages/index.js
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from '../store/usersSlice';
import UserForm from '../components/UserForm';

import dynamic from 'next/dynamic';
import Header from '@/components/Header';

const UserList = dynamic(() => import('../components/UserList'), { ssr: false });
const NoData = dynamic(() => import('../components/NoData'), { ssr: false });

export default function Home({ initialUsers }) {
  const dispatch = useDispatch();
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const users = useSelector((state) => state.users.users);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return users;

    const lowercasedQuery = searchQuery.toLowerCase();

    return users.filter((user) =>
      Object.values(user).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [users, searchQuery]);

  // useEffect(() => {
  //   if (initialUsers.length > 0) {
  //     initialUsers.forEach(user => {
  //       dispatch(addUser(user));
  //     });
  //   }
  //   console.log('initialUsers', initialUsers)
  // }, [dispatch, initialUsers]);

  useEffect(() => {
    // Fetch data from localStorage
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        users.forEach(user => {
          dispatch(addUser(user));
        });
      }
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <Header />
      <div className='pt-2 w-full	max-w-[690px] px-2 m-auto'>
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          className='focus:border-teal focus:outline-none focus:ring-0 border-0 border-b-2 border-indigo-600 focus:border-blue-500 mb-2 px-2 py-1 w-full'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <UserForm />
        {users.length !== 0 ? <UserList users={filteredItems} onDelete={handleDelete} /> : <NoData />}
      </div>
    </>
  );
}

// getServerSideProps remains the same
// This function runs on the server for each request
export async function getServerSideProps(context) {
  // Fetch data from an API or other data source

  const initialUsers = [];
  
  // Return the initialUsers as props
  return {
    props: { 
      initialUsers
    }, // will be passed to the page component as props
  };
}
