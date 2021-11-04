// Common
import { useState } from 'react';
// Components
import { Categories, Questions } from 'screens';
import { Modal } from 'components/shared';
import { CreateCategory, CreateQuestion } from 'components/admin';

const FrequentQuestions = () => {
    const [active, setActive] = useState();
    const [refresh, setRefresh] = useState();
    const [create, setCreate] = useState({ type: null, visible: false });

    const [category, setCategory] = useState(null);
    const [faq, setFaq] = useState(null);

    const refreshHandler = () => {
        setCreate({ ...create, visible: false });
        setRefresh((v) => !v);
    };

    const categoryUpdateHandler = (item) => {
        setCategory(item);
        setCreate({ type: 'c', visible: true });
    };

    const faqUpdateHandler = (item) => {
        setFaq(item);
        setCreate({ type: 'q', visible: true });
    };

    const createHandler = (type) => {
        setCategory(null);
        setFaq(null);
        setCreate({ type, visible: true });
    };

    return (
        <>
            <Modal visible={create.visible} size="xl" onClose={() => setCreate({ ...create, visible: false })} 
                title={`${category || faq ? 'Modificar' : 'Crear' } ${create.type === 'c' ? 'categoria' : 'pregunta'}`}>
                {create.type === 'c' ?
                    <CreateCategory onCreated={refreshHandler} defaultCategory={category}
                        close={() => setCreate({ ...create, visible: false })} /> :
                    <CreateQuestion onCreated={refreshHandler} defaultFaq={faq} selected={active}
                        close={() => setCreate({ ...create, visible: false })} />}
            </Modal>
            <section className="space-y-8">
                <div className="space-y-8 bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10">
                    <Categories onRefresh={refresh} onUpdate={categoryUpdateHandler}
                        onCreate={() => createHandler('c')} onActive={(item) => setActive(item)} />
                </div>
                <div className="space-y-8 bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10">
                    <Questions onRefresh={refresh} onUpdate={faqUpdateHandler}
                        onCreate={() => createHandler('q')} selected={active} />
                </div>
            </section>
        </>
    );
};

export default FrequentQuestions;
