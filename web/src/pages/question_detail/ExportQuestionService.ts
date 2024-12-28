import {postRequest} from "../../common/helpers/RequestHelper";


class ExportQuestionService {
    apiExportQuestion = '/export-questions'
    apiExportQuestionMoodule = '/export-questions-moodle'

    public fetchExportQuestion(params: any): Promise<any> {
        return postRequest(`${this.apiExportQuestion}`,params);
    }
    public fetchExportQuestionMoodle(params: any): Promise<any> {
        return postRequest(`${this.apiExportQuestionMoodule}`,params);
    }
}

export const exportQuestionService = new ExportQuestionService()