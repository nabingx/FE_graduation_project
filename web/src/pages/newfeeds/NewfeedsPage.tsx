import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    useMediaQuery,
    Stack,
    Typography,
    Divider,
    FormControlLabel,
    Checkbox,
    IconButton,
    Box,
    Button,
    Modal,
} from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import { apiURL } from '../../common/constant';
import { apiConfig } from '../../common/service/BaseService';
import Question from '../../components/common/Question';
import DefaultLayout from '../../components/layout/default_layout';
import { MoreVert } from '@mui/icons-material';
import { observer } from "mobx-react";
import { exportQuestionStore } from "./ExportQuestionStore";
import { getRequest } from '../../common/helpers/RequestHelper';

const NewfeedsPage = () => {
    const accessToken = localStorage.getItem('auth_token');
    const smUp = useMediaQuery('(min-width:700px)');
    const mdUp = useMediaQuery('(min-width:1000px)');
    const lgUp = useMediaQuery('(min-width:1400px)');

    const [openModal, setOpenModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [questionList, setQuestionList] = useState<Array<any>>([]);

    const [isShowCorrectAnswer, setIsShowCorrectAnswer] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<any>();

    useEffect(() => {
        getPageData();
        getUserInfo();
    }, []);

    const handleOpenModal = (topic: string) => {
        setSelectedTopic(topic);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedTopic(null);
    };

    const handleAction = async (action: string) => {
        if (!selectedTopic) return;

        switch (action) {
            case 'Export Aiken':
                exportQuestionStore.dataExportQuestion.name = selectedTopic;
                await exportQuestionStore.fetchExportQuestion();
                break;
            case 'Export Moodle':
                exportQuestionStore.dataExportQuestion.name = selectedTopic;
                await exportQuestionStore.fetchExportQuestionMoodle();
                break;
            case 'Edit Question':
                console.log(`Edit Question for topic: ${selectedTopic}`);
                break;
            default:
                console.log(`Unknown action: ${action}`);
        }
        handleCloseModal();
    };

    const getUserInfo = async () => {
        try {
            const res = await getRequest('/user-info');
            if (res?.data?.status === 200) {
                setCurrentUser(res?.data?.username);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const getPageData = () => {
        setLoading(true);
        axios
            .get(`${apiURL}/random-questions`, {
                headers: {
                    ...apiConfig,
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
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
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            });
    };

    return (
        <DefaultLayout>
            <Stack
                gap={3}
                sx={{
                    background: '#F2F2F2',
                    overflow: 'auto',
                    padding: '24px',
                }}
            >
                <LoadingScreen loading={loading} />
                <Typography variant="h2" sx={{ textAlign: 'center', }}>
                    Newsfeed
                </Typography>

                <FormControlLabel
                    label="Hiện đáp án đúng"
                    control={<Checkbox
                        checked={isShowCorrectAnswer}
                        onChange={(e) => setIsShowCorrectAnswer(e.target.checked)}
                    />}
                />

                <Stack gap={6}>
                    {questionList?.length ? (
                        questionList.map((topics, index) => (
                            <Stack
                                key={topics?.topic}
                                gap={4}
                                sx={{
                                    background: 'white',
                                    padding: '32px',
                                    position: 'relative',
                                }}
                            >
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h3">
                                        Chủ đề:&nbsp;
                                        <span style={{ fontStyle: 'italic' }}>{topics.topic}</span>
                                    </Typography>
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: '16px',
                                            right: '16px',
                                        }}
                                        onClick={() => handleOpenModal(topics.topic)}
                                    >
                                        <MoreVert />
                                    </IconButton>
                                </Stack>
                                {topics.questions?.length ? (
                                    topics.questions.map((question: any) => (
                                        <React.Fragment key={question.id}>
                                            <Question
                                                isShowCorrectAnswer={isShowCorrectAnswer}
                                                canRate={currentUser !== question?.username}
                                                {...question}
                                            />
                                            <Divider />
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <Typography variant="body2">Chưa có câu hỏi nào được tạo</Typography>
                                )}
                            </Stack>
                        ))
                    ) : (
                        <Typography variant="body2">Chưa có câu hỏi nào được tạo</Typography>
                    )}
                </Stack>

                {/* Modal */}
                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: '8px',
                        }}
                    >
                        <Typography variant="h6" mb={2}>
                            Options for {selectedTopic}
                        </Typography>
                        <Stack spacing={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAction('Export Aiken')}
                            >
                                Export Question Aiken
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleAction('Export Moodle')}
                            >
                                Export Questions Moodle
                            </Button>
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() => handleAction('Edit Question')}
                            >
                                Edit Question
                            </Button>
                        </Stack>
                    </Box>
                </Modal>
            </Stack>
        </DefaultLayout>
    );
};

export default observer(NewfeedsPage);