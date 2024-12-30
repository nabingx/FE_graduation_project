import {makeAutoObservable, toJS} from "mobx";
import { HttpStatusCode } from "axios";
import {exportQuestionService} from "./ExportQuestionService";
import {toastUtils} from "../../common/utils/Toastutils";

class ExportQuestionStore {
    openModal: boolean = false;

    dataExportQuestion: {
        uid: string;
        name: string;
    } = {
        uid: "",
        name: "",
    }

    constructor() {
        makeAutoObservable(this);
    }
    async fetchGetQuestion() {
        const result = await exportQuestionService.fetchGetQuestion();
        if (result.status === HttpStatusCode.Ok) {
            this.dataExportQuestion = result.body.data;
            console.log("dataQs", toJS(this.dataExportQuestion));
        } else {
            toastUtils.error(result.body.message, "");
        }
    }


}



export const exportQuestionStore = new ExportQuestionStore();