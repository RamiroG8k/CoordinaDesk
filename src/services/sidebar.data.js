import { FiUsers, FiInbox, FiLayers } from 'react-icons/fi';
import { AiOutlineRobot } from 'react-icons/ai';

const sections = [
    {
        title: 'Usuarios',
        icon: <FiUsers />,
        type: 'sub',
        path: '/users',
        roles: ['COORDINATOR'],
        children: [
            { path: '/users', title: 'Todos', type: 'link' },
        ],
    },
    {
        title: 'Tickets',
        icon: <FiInbox />,
        type: 'sub',
        path: '/tickets',
        roles: ['COORDINATOR', 'ASSISTANT'],
        children: [
            { path: '/tickets', title: 'Todos', type: 'link' },
            { path: '/high-classifications', title: 'Clasificaciones prioritarias', type: 'link', roles: ['COORDINATOR'] },
            { path: '/tickets/inactive', title: 'Inactivos', type: 'link' },
        ],
    },
    {
        title: 'Preguntas frecuentes',
        icon: <FiLayers />,
        type: 'link',
        path: '/faqs',
        roles: ['COORDINATOR', 'ASSISTANT'],
    },
    {
        title: 'Chatbot',
        icon: <AiOutlineRobot />,
        type: 'link',
        path: '/chatbot',
        roles: ['COORDINATOR', 'ASSISTANT'],
    },
];

export default sections;
