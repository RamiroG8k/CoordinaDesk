// Common
import { useEffect, useState } from 'react';
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

    const createHandler = (type) => {
        setCategory(null);
        setFaq(null);
        setCreate({ type, visible: true });
    };

    return (
        <>
            <Modal visible={create.visible} size="xl"
                title={`Crear ${create.type === 'c' ? 'categoria' : 'pregunta'}`}
                onClose={() => setCreate({ ...create, visible: false })} >
                {create.type === 'c' ?
                    <CreateCategory onCreated={refreshHandler} defaultCategory={category}
                        close={() => setCreate({ ...create, visible: false })} /> :
                    <CreateQuestion onCreated={refreshHandler}
                        close={() => setCreate({ ...create, visible: false })} />}
            </Modal>
            <section className="space-y-8">
                <div className="space-y-8 bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-10">
                    <Categories onRefresh={refresh} onUpdate={categoryUpdateHandler}
                        onCreate={() => createHandler('c')}
                        onActive={({ _id }) => setActive(_id)} />
                </div>
                <div className="space-y-8 bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-10">
                    <Questions
                        onCreate={() => createHandler('q')}
                        selected={active} />
                </div>
            </section>
        </>
    );
};

export default FrequentQuestions;
