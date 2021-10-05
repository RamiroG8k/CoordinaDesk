import { FiUsers, FiHome, FiInbox } from 'react-icons/fi';

const sections = [
    {
        title: 'Inicio',
        icon: <FiHome/>,
        type: 'link',
        path: '/home',
    },
    {
        title: 'Usuarios',
        icon: <FiUsers/>,
        type: 'sub',
        path: '/users',
        children: [
            { path: '/users', title: 'Todos', type: 'link' },
        ],
    },
    {
        title: 'Tickets',
        icon: <FiInbox/>,
        type: 'sub',
        path: '/tickets',
        children: [
            { path: '/tickets', title: 'Todos', type: 'link' },
            { path: '/tickets', title: 'Inactivos', type: 'link' },
        ],
    },
];

export default sections;
