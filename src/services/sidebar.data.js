import { FiUsers, FiHome, FiInbox, FiLayers } from 'react-icons/fi';
import { AiOutlineRobot } from 'react-icons/ai';

const sections = [
    {
        title: 'Inicio',
        icon: <FiHome/>,
        type: 'link',
        path: '/home',
        roles: ['COORDINATOR', 'ASSISTANT'],
    },
    {
        title: 'Usuarios',
        icon: <FiUsers/>,
        type: 'sub',
        path: '/users',
        roles: ['COORDINATOR'],
        children: [
            { path: '/users', title: 'Todos', type: 'link' },
        ],
    },
    {
        title: 'Tickets',
        icon: <FiInbox/>,
        type: 'sub',
        path: '/tickets',
        roles: ['COORDINATOR', 'ASSISTANT'],
        children: [
            { path: '/tickets', title: 'Todos', type: 'link' },
            { path: '/tickets/inactive', title: 'Inactivos', type: 'link' },
        ],
    },
    {
        title: 'Preguntas frecuentes',
        icon: <FiLayers/>,
        type: 'link',
        path: '/faqs',
        roles: ['COORDINATOR'],
    },
    {
        title: 'Chatbot',
        icon: <AiOutlineRobot/>,
        type: 'link',
        path: '/chatbot',
        roles: ['COORDINATOR'],
    },
];

export default sections;
