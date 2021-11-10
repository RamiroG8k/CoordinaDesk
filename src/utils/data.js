import { BsTrash, BsEnvelope, BsFileEarmarkText, BsFillXSquareFill } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

const sections = [
    {
        name: 'Concepto',
        goTo: '#concept',
    },
    {
        name: 'FAQs',
        goTo: '#faqs',
    },
    {
        name: 'Acerca de',
        goTo: '#about',
    },
    {
        name: 'Seguimiento',
        goTo: '#tracking',
    },
];

const socials = [
    { icon: <FaFacebookF />, url: 'https://www.facebook.com/ing.cucei' },
    // { icon: <FaInstagram />, url: 'https://www.google.com' },r
    // { icon: <FaLinkedinIn />, url: 'https://www.google.com' },
    // { icon: <FaTwitter />, url: 'https://www.google.com' },
    // { icon: <FaYoutube />, url: 'https://www.google.com' },
];

const userActions = [
    {
        name: 'Detalles',
        action: 'details',
        description: 'Información general de usuario',
        icon: <BsFileEarmarkText />,
    },
    {
        name: 'Desactivar',
        action: 'deactivate',
        description: 'Deshabilitar usuario',
        icon: <BsTrash />,
    },
    {
        name: 'Eliminar',
        action: 'delete',
        description: 'Eliminar usuario',
        icon: <BsFillXSquareFill />,
    },
    {
        name: 'Reenviar email',
        action: 'resend-email',
        description: 'Mandar correo de activación',
        icon: <BsEnvelope />,
    }
];

const ticketActions = [
    {
        name: 'Detalles',
        action: 'details',
        description: 'Información general de ticket',
        icon: <BsFileEarmarkText />,
    },
];

const ticketStatus = [
    { label: 'Esperando Asignación', value: 'WAITING_ASIGNATION', visible: false },
    { label: 'Asignado', value: 'ASIGNED', visible: true },
    { label: 'En progreso', value: 'IN_PROGRESS', visible: true },
    { label: 'Esperando respuesta', value: 'WAITING_RESPONSE', visible: true },
    { label: 'Resuelto', value: 'RESOLVE', visible: true },
    { label: 'Finalizado', value: 'FINAL_RESOLVE', visible: true },
    { label: 'Cerrado por inactividad', value: 'CLOSED_DUE_TO_INACTIVITY', visible: false },
];

const ticketPriority = [
    { priority: 'LOW', label: 'BAJA', color: 'green' },
    { priority: 'MODERATE', label: 'MEDIA', color: 'yellow' },
    { priority: 'HIGH', label: 'ALTA', color: 'red' },
];

const errorMessages = [
    // Common
    { customText: 'No se ha encontrado el elemento', message: 'ERROR.COMMON.ID_NOTFOUND' },
    { customText: 'Necesita ser unico', message: 'ERROR.COMMON.UNIQUE_ID' },
    { customText: 'No es posible inhabilitar, aun tiene dependencias por resolver', message: 'ERROR.COMMON.DELETE_HAS_DEPENDENCIES' },
    { customText: 'La actualizacion tiene dependencias', message: 'ERROR.COMMON.UPDATE_HAS_DEPENDENCIES' },
    { customText: 'El nombre tiene que ser unico', message: 'ERROR.COMMON.UNIQUE_NAME' },
    { customText: 'Los campos no deben estar vacios', message: 'ERROR.COMMON.FIELD_MAY_NOT_BE_EMPTY' },
    { customText: 'Parametro no valido', message: 'ERROR.COMMON.INVALID_PARAM' },
    { customText: 'Operacion no permitida', message: 'ERROR.COMMON.OPERATION_NOT_ALLOWED' },
    { customText: 'Peticion invalida', message: 'ERROR.COMMON.INVALID_QUERY_PARAMS' },
    { customText: 'Contacta con soporte', message: 'ERROR.COMMON.CONTACT_SUPPORT' },
    { customText: 'No encontrado, Por favor contacta con un Coordinador', message: 'ERROR.COMMON.UNDEFINED' },
    { customText: 'Mala peticion', message: 'ERROR.COMMON.BAD_REQUEST' },
    { customText: 'Error, Debe ser unico, se encontro una coincidencia', message: 'ERROR.COMMON.MUST_BE_UNIQUE' },
    { customText: 'No hay coincidencias', message: 'ERROR.COMMON.ID_DOES_NOT_MATCH' },

    // Auth
    { customText: 'Credenciales erróneas, por favor intente de nuevo', message: 'ERROR.AUTH.BAD_CREDENTIALS' },

    // User
    { customText: 'Email ya en uso, intente de nuevo', message: 'ERROR.USER.EMAIL_ALREADY_IN_USE' },
    { customText: 'Usuario no encontrado, por favor revisa tus credenciales e intenta de nuevo', message: 'ERROR.USER.NOT_FOUND' },
    { customText: 'Error, Usuario activo', message: 'ERROR.USER.USER_IS_ACTIVE' },
    { customText: 'Usuario ya eliminado', message: 'ERROR.USER.USER_IS_DELETED' },

    // MONGOOSE
    { customText: 'MONGOOSE_ERROR', message: 'ERROR.MONGOOSE' },

    // TICKET
    { customText: 'Estatus invalido', message: 'ERROR.TICKET.INVALID_STATUS' },
    { customText: 'Prioridad invalida', message: 'ERROR.TICKET.INVALID_PRIORITY' },

    // FAQ
    { customText: 'Position invalida', message: 'ERROR.FAQ.INVALID_POSITION' },
];

const CHART_COLORS = {
    purple: '#A5B4FC',
    purpleB: '#818CF8',
    blue: '#DBEAFE',
    charcoal: '#9E9CAB',
    littleBoy: '#60A5FA',
    prussian: '#2C3D55',
    seaGreen: '#1AFFD5',
    navy: '#1E3A8A',
    pink: '#FBCFE8',
    pinkB: '#F9A8D4',
    old: '#6A687A',
}

export { sections, socials, ticketActions, userActions, ticketStatus, ticketPriority, errorMessages, CHART_COLORS };