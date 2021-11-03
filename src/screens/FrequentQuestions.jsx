// Common
import { useState } from 'react';
// Components
import { Categories, Questions } from 'screens';
import { Modal } from 'components/shared';
import { CreateCategory, CreateQuestion } from 'components/admin';
// Services | Data
// import { apiInstance } from 'services';

const FrequentQuestions = () => {
    // const [training, setTraining] = useState(false);
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
            <Modal visible={create.visible} size="2xl"
                title={`${category || faq ? 'Modificar' : 'Crear' } ${create.type === 'c' ? 'categoria' : 'pregunta'}`}
                onClose={() => setCreate({ ...create, visible: false })} >
                {create.type === 'c' ?
                    <CreateCategory onCreated={refreshHandler} defaultCategory={category}
                        close={() => setCreate({ ...create, visible: false })} /> :
                    <CreateQuestion onCreated={refreshHandler} defaultFaq={faq} selected={active}
                        close={() => setCreate({ ...create, visible: false })} />}
            </Modal>
            <section className="space-y-8">
                {/* <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="flex flex-col bg-white shadow-md dark:bg-gray-700 sm:w-1/2 justify-between rounded-3xl sm:rounded-4xl p-4 sm:p-8 space-y-4">
                        <p className="text-justify leading-5">Este boton es solo para uso en caso de no ver reflejados los cambios en el chatbot.</p>
                        <button type="button" onClick={() => trainNlp()} disabled={training}
                            className="btn btn-animated bg-blue-300 border-2 border-blue-500 py-1 rounded-2xl">
                            <p className="text-white text-xl">
                                {training ? 'Entrenando..' : 'Reentrenar'}
                            </p>
                        </button>
                    </div>
                    <div className="space-y-3 bg-white shadow-md dark:bg-gray-700 sm:w-1/2 rounded-3xl sm:rounded-4xl p-4 sm:p-8">
                        <div className="space-y-1">
                            <h4 className="text-xl font-medium">Categoria <span className="font-semibold">'CHATBOT'</span></h4>
                            <p className="leading-4 text-sm">Esta categoria solo puede estar en estado 'Inactivo', para pasar desapercivida en la Landing page</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-lg font-medium">Preguntas y respuestas en <span className="font-semibold">'CHATBOT'</span></h4>
                            <p className="leading-4 text-sm">No es posible inhabilitar / habilitar las preguntas ya que...</p>
                        </div>
                    </div>
                </div> */}
                <div className="space-y-8 bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10">
                    <Categories onRefresh={refresh} onUpdate={categoryUpdateHandler}
                        onCreate={() => createHandler('c')}
                        onActive={(item) => setActive(item)} />
                </div>
                <div className="space-y-8 bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10">
                    <Questions onRefresh={refresh} onUpdate={faqUpdateHandler}
                        onCreate={() => createHandler('q')}
                        selected={active} />
                </div>
            </section>
        </>
    );
};

export default FrequentQuestions;
