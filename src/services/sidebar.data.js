import { FiUsers, FiHome, FiInbox } from 'react-icons/fi';

const sections = [
    {
        title: 'Home',
        icon: <FiHome/>,
        type: 'link',
        path: '/home',
    },
    {
        title: 'Users',
        icon: <FiUsers/>,
        type: 'sub',
        path: '/users',
        children: [
            { path: '/users', title: 'All Users', type: 'link' },
            // { path: '/users/brand-partners', title: 'Brand Partners', type: 'link' }
        ],
    },
    {
        title: 'Tickets',
        icon: <FiInbox/>,
        type: 'sub',
        path: '/users',
        children: [
            { path: '/users', title: 'All Users', type: 'link' },
            // { path: '/users/brand-partners', title: 'Brand Partners', type: 'link' }
        ],
    },
];

export default sections;
