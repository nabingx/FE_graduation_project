import React, {useEffect} from "react";
import { observer } from "mobx-react";
import {exportQuestionStore} from "../ExportQuestionStore";
import {Modal} from "antd";


const DetailsQuestion = () => {

    useEffect(() => {
        exportQuestionStore.fetchGetQuestion();
    }, []);
    return (
        <Modal
            open={exportQuestionStore.openModal}
            onCancel={()=>{exportQuestionStore.openModal = false}}
        >
            <div className="title">
                <h1>Question</h1>
            </div>
        </Modal>
    );
}

export default observer(DetailsQuestion);
