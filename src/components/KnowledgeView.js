import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

const KnowledgeView = () => {
    const history = useHistory();
    const { id } = useParams();

    return (
        <div>
            <h2>ナレッジ</h2>
            <button onClick={() => history.push('/knowledge-management')}>Back to List</button>
            {/* PDFの表示に関するコード */}
        </div>
    );
};

export default KnowledgeView;