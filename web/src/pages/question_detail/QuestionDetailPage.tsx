import axios from 'axios';
import { useEffect, useState } from "react";
import {
    useMediaQuery,
    Stack,
    Typography,
    Divider,
} from "@mui/material";

import LoadingScreen from '../../components/LoadingScreen';

// import "./CreateQuestion.scss";

import { apiURL } from "../../common/constant";
import { apiConfig } from "../../common/service/BaseService";
import Question from '../../components/common/Question';
import DefaultLayout from '../../components/layout/default_layout';

export default function QuestionDetailsPage() {

    const accessToken = localStorage.getItem('auth_token');
    const smUp = useMediaQuery('(min-width:700px)');
    const mdUp = useMediaQuery('(min-width:1000px)');
    const lgUp = useMediaQuery('(min-width:1400px)');

    const [loading, setLoading] = useState<boolean>(false);
    const [questionList, setQuestionList] = useState<Array<any>>([]);

    useEffect(() => {
        getPageData();
    }, []);

    const getPageData = () => {
        setLoading(true);
        axios.get(`${apiURL}/user-all-topics-questions`,
            {
                headers: {
                    ...apiConfig,
                    "Authorization": `Bearer ${accessToken}`,
                }
            }
        )
            .then(res => {
                if (res?.data?.status === 200) {
                    let data = res?.data?.data;
                    let list: Array<any> = [];
                    for (var key in data) {
                        list.push({
                            topic: key,
                            questions: data[key],
                        });
                    }
                    setQuestionList(list);
                }
                setLoading(false);
                console.log(res);
            })
            .catch(err => {
                setLoading(false);
                console.error(err);
            });
    }

    return (
        <DefaultLayout>
            <Stack gap={3}
                sx={{
                    background: '#F2F2F2',
                    overflow: 'auto',
                    padding: '24px',
                }}
            >
                <LoadingScreen loading={loading} />
                <Typography variant="h2" sx={{ textAlign: 'center', }}>
                    All generated question of user
                </Typography>

                <Stack gap={6}>
                    {
                        questionList?.length ?
                            questionList?.map((topics, index) => {
                                return (
                                    <>
                                        <Stack key={topics?.topic}
                                            gap={4}
                                            sx={{
                                                background: 'white',
                                                padding: '32px',
                                            }}
                                        >
                                            <Typography variant="h3">
                                                Topic:&nbsp;
                                                <span style={{ fontStyle: 'italic' }}>
                                                    {topics.topic}
                                                </span>
                                            </Typography>
                                            {
                                                topics.questions?.length ?
                                                    topics.questions?.map((question: any) => {
                                                        return (
                                                            <>
                                                                <Question
                                                                    {...question}
                                                                />
                                                                <Divider />
                                                            </>
                                                        )
                                                    }) :
                                                    <Typography variant="body2">No question found</Typography>
                                            }
                                        </Stack>
                                    </>
                                )
                            })
                            : 'No questions found'
                    }
                </Stack>
            </Stack >
        </DefaultLayout>
    );
};