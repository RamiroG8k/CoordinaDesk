import { Categories, Faqs } from 'components/admin';
import { useEffect, useState } from 'react';

const FrequentQuestions = () => {
    const [active, setActive] = useState();

    return (
        <section className="space-y-8">
            <div className="space-y-8 bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-10">
                <Categories onActive={({ _id }) => setActive(_id)} />
            </div>
            <div className="space-y-8 bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-10">
                <Faqs selected={active} />
            </div>
        </section>
    );
};

export default FrequentQuestions;
