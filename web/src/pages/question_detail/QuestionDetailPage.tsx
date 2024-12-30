import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    useMediaQuery,
    Stack,
    Typography,
    Divider,
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

const QuestionDetailsPage = () => {
    const accessToken = localStorage.getItem('auth_token');
    const smUp = useMediaQuery('(min-width:700px)');
    const mdUp = useMediaQuery('(min-width:1000px)');
    const lgUp = useMediaQuery('(min-width:1400px)');

    const [openModal, setOpenModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [questionList, setQuestionList] = useState<Array<any>>([]);

    useEffect(() => {
        getPageData();
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
                // Gửi yêu cầu POST tới API để xuất file Aiken
                await downloadFile(selectedTopic);
                break;
            case 'Export Moodle':
                // exportQuestionStore.dataExportQuestion.name = selectedTopic;
                // await exportQuestionStore.fetchExportQuestionMoodle();
                await downloadFileXml(selectedTopic);
                break;
            // case 'Detail Question':
            //
            //     break;
            default:
                console.log(`Unknown action: ${action}`);
        }
        handleCloseModal();
    };

    const downloadFile = async (topic: string) => {
        try {
            const response = await fetch('http://103.138.113.68/export-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    uid: '',  // Thay bằng UID thực tế
                    name: topic,  // Dùng chủ đề đã chọn
                }),
            });

            // Kiểm tra xem yêu cầu có thành công không
            if (!response.ok) {
                throw new Error('Error downloading file');
            }

            // Lấy tên file từ header Content-Disposition
            const disposition = response.headers.get('Content-Disposition');
            let fileName = 'downloaded_file.txt';

            if (disposition) {
                const fileNameMatch = disposition.match(/filename="(.+)"/);
                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = fileNameMatch[1];
                }
            }

            // Tạo blob từ response content và tạo URL tải file
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };
    const downloadFileXml = async (topic: string) => {
        try {
            const response = await fetch('http://103.138.113.68/export-questions-moodle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    uid: '',  // Thay bằng UID thực tế
                    name: topic,  // Dùng chủ đề đã chọn
                }),
            });

            // Kiểm tra xem yêu cầu có thành công không
            if (!response.ok) {
                throw new Error('Error downloading file');
            }

            // Lấy tên file từ header Content-Disposition
            const disposition = response.headers.get('Content-Disposition');
            let fileName = 'downloaded_file.xml';

            if (disposition) {
                const fileNameMatch = disposition.match(/filename="(.+)"/);
                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = fileNameMatch[1];
                }
            }

            // Tạo blob từ response content và tạo URL tải file
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };

    const getPageData = () => {
        setLoading(true);
        axios
            .get(`${apiURL}/user-all-topics-questions`, {
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
                <Typography variant="h2" sx={{ textAlign: 'center' }}>
                    All generated questions of user
                </Typography>

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
                                        Topic:&nbsp;
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
                                            <Question {...question} />
                                            <Divider />
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <Typography variant="body2">No question found</Typography>
                                )}
                            </Stack>
                        ))
                    ) : (
                        <Typography variant="body2">No questions found</Typography>
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
                            {/*<Button*/}
                            {/*    variant="contained"*/}
                            {/*    color="info"*/}
                            {/*    onClick={() => handleAction('Edit Question')}*/}
                            {/*>*/}
                            {/*    Edit Question*/}
                            {/*</Button>*/}
                        </Stack>
                    </Box>
                </Modal>
            </Stack>
        </DefaultLayout>
    );
};

export default observer(QuestionDetailsPage);
