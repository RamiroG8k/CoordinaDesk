import { BsTrash, BsEnvelope, BsFileEarmarkText } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';

const sections = [
    {
        name: 'FAQs',
        goTo: '#faqs',
    },
    {
        name: 'Ticket Tracking',
        goTo: '#tracking',
    },
    {
        name: 'Concept',
        goTo: '#',
    },
    {
        name: 'About',
        goTo: '#about',
    },
];

const socials = [
    { icon: <FaFacebookF />, url: 'https://www.google.com' },
    { icon: <FaInstagram />, url: 'https://www.google.com' },
    { icon: <FaLinkedinIn />, url: 'https://www.google.com' },
    { icon: <FaTwitter />, url: 'https://www.google.com' },
    { icon: <FaYoutube />, url: 'https://www.google.com' },
];

const userActions = [
    {
        name: 'Detalles',
        action: 'details',
        description: 'Informacion general de usuario',
        icon: <BsFileEarmarkText />,
    },
    {
        name: 'Borrar',
        action: 'delete',
        description: 'Eliminar usuario del registro',
        icon: <BsTrash />,
    },
    {
        name: 'Reenviar email',
        action: 'resend-email',
        description: 'Mandar correo de activacion',
        icon: <BsEnvelope />,
    }
];

const ticketStatus = [
    { label: 'To do', value: 'ASIGNED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Done', value: 'RESOLVE' },
];


export { sections, socials, userActions, ticketStatus };