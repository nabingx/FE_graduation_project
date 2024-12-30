import { getRequest} from "../../common/helpers/RequestHelper";


class ExportQuestionService {
    apiGetQuestion = '/user-all-topics-questions'

    public fetchGetQuestion(): Promise<any> {
        return getRequest(`${this.apiGetQuestion}`, '');
    }

}

export const exportQuestionService = new ExportQuestionService()