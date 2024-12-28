import {makeAutoObservable, toJS} from "mobx";
import { HttpStatusCode } from "axios";
import {exportQuestionService} from "./ExportQuestionService";
import {toastUtils} from "../../common/utils/Toastutils";

class ExportQuestionStore {

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

    async fetchExportQuestion() {
        let {name} = this.dataExportQuestion;
        const params = {
            uid: "",
            name: name,
        };
        const result = await exportQuestionService.fetchExportQuestion(params);
        if (result.status === HttpStatusCode.Ok) {
            toastUtils.success("Export thành công", "");
        } else {
            toastUtils.error("Export error", "");
        }
    }

    async fetchExportQuestionMoodle() {
        let {name} = this.dataExportQuestion;
        const params = {
            uid: "",
            name: name,
        };
        const result = await exportQuestionService.fetchExportQuestionMoodle(params);
        if (result.status === HttpStatusCode.Ok) {
            toastUtils.success("Export thành công", "");
        } else {
            toastUtils.error("Export error", "");
        }
    }
}



export const exportQuestionStore = new ExportQuestionStore();