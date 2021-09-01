import { FiUsers, FiHome } from 'react-icons/fi';

const sections = [
    {
        title: 'Stock',
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
            { path: '/users/brand-partners', title: 'Brand Partners', type: 'link' }
        ],
    },
];

export default sections;
