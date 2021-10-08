// Components
import { Footer, Header, Chatbot, Faqs, Tracking } from 'components/landing';
import { ScrollToTop } from 'components/shared';

const Landing = () => {
    return (
        <>
            <Header />
            <Chatbot/>
            <Faqs/>
            <Tracking/>
            <Footer />
            <ScrollToTop />
        </>
    )
}

export default Landing
