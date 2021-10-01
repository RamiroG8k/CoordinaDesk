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

export { sections, socials };