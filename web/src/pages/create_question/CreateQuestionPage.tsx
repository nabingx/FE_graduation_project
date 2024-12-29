import axios from 'axios';
import { useState } from "react";
import {
    useMediaQuery,
    Radio,
    Stack,
    Typography,
    FormControlLabel,
    RadioGroup,
    Divider,
    Checkbox,
} from "@mui/material";

import InputFile from '../../components/common/FileInput';
import { MainButton, BasicButton, StyledTextField as TextField } from '../../components/common';
import LoadingScreen from '../../components/LoadingScreen';

import "./CreateQuestion.scss";

import Question from '../../components/common/Question';
import DefaultLayout from '../../components/layout/default_layout';

import { apiURL } from "../../common/constant";
import { apiConfig, multipartApiConfig } from "../../common/service/BaseService";

export default function CreateQuestionPage() {

    const accessToken = localStorage.getItem('auth_token');
    const smUp = useMediaQuery('(min-width:700px)');
    const mdUp = useMediaQuery('(min-width:1000px)');
    const lgUp = useMediaQuery('(min-width:1400px)');

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [createUsingParagraph, setCreateUsingParagraph] = useState(0);
    const [tagList, setTagList] = useState<Array<any>>([]);
    const [formValue, setFormValue] = useState({
        name: '',
        context: '',
        file: '',
    });

    const inputTextCaption = [
        'Nhập vào 1 câu đơn, tối đa 2 vế của câu và 100 ký tự.',
        'Nhập vào 1 đoạn văn gồm tối đa 5 câu đơn, tối đa 1 câu gồm 2 vế và 100 ký tự.',
        'Tải lên 1 file pdf chứa các đoạn text có thể sử dụng để tạo các câu hỏi.',
        'Tải lên 1 hình ảnh chứa các đoạn text có thể sử dụng để tạo các câu hỏi.',
    ];

    const [resultQuestions, setResultQuestions] = useState<Array<any>>([]);
    const [isShowCorrectAnswer, setIsShowCorrectAnswer] = useState<boolean>(false);

    const handleRefresh = () => {
        setTagList([]);
        setFormValue({
            name: '',
            context: '',
            file: '',
        });
        setResultQuestions([]);
        setCreateUsingParagraph(0);
    }

    const handleSubmit = () => {
        let tags: Array<any> = [];
        let newTags: Array<any> = [];
        tagList?.forEach((tag: any) => {
            if (tag?.value) {
                tags.push(tag.value);
                newTags.push(tag);
            }
        })
        setTagList(newTags);
        const apiBody = {
            ...formValue,
            tags,
        }
        setLoading(true);
        switch (createUsingParagraph) {
            case 0: {
                axios.post(`${apiURL}/get-question`,
                    apiBody,
                    {
                        headers: {
                            ...apiConfig,
                            "Authorization": `Bearer ${accessToken}`,
                        }
                    }
                )
                    .then(res => {
                        setLoading(false);
                        if (res?.data?.status === 200) {
                            if (res?.data?.data instanceof Array) {
                                let dataList: Array<any> = [];
                                res?.data?.data?.forEach((data: any) => {
                                    if (data?.context) {
                                        dataList?.push(data);
                                    }
                                });
                                if (dataList?.length) {
                                    setResultQuestions(dataList);
                                    setError(false);
                                } else {
                                    setResultQuestions([]);
                                    setError(true);
                                }
                            } else {
                                setError(true);
                            }
                        }
                        console.log(res);
                    })
                    .catch(err => {
                        setError(true);
                        setLoading(false);
                        console.error(err);
                    });
                break;
            }
            case 1: {
                axios.post(`${apiURL}/get-questions`,
                    apiBody,
                    {
                        headers: {
                            ...apiConfig,
                            "Authorization": `Bearer ${accessToken}`,
                        }
                    }
                )
                    .then(res => {
                        setLoading(false);
                        if (res?.data?.status === 200) {
                            if (res?.data?.data instanceof Array) {
                                let dataList: Array<any> = [];
                                res?.data?.data?.forEach((data: any) => {
                                    if (data?.context) {
                                        dataList?.push(data);
                                    }
                                });
                                if (dataList?.length) {
                                    setResultQuestions(dataList);
                                    setError(false);
                                } else {
                                    setResultQuestions([]);
                                    setError(true);
                                }
                            } else {
                                setError(true);
                            }
                        }
                        console.log(res);
                    })
                    .catch(err => {
                        setError(true);
                        setLoading(false);
                        console.error(err);
                    });
                break;
            }
            case 2: {
                let formData = new FormData();
                formData.append('file', formValue?.file);
                formData.append('tags', tags?.toString());
                axios.post(`${apiURL}/upload_pdf_to_questions`,
                    formData,
                    {
                        headers: {
                            ...multipartApiConfig,
                            "Authorization": `Bearer ${accessToken}`,
                        }
                    }
                )
                    .then(res => {
                        setLoading(false);
                        if (res?.data?.status === 200) {
                            if (res?.data?.data instanceof Array) {
                                let dataList: Array<any> = [];
                                res?.data?.data?.forEach((data: any) => {
                                    if (data?.context) {
                                        dataList?.push(data);
                                    }
                                });
                                if (dataList?.length) {
                                    setResultQuestions(dataList);
                                    setError(false);
                                } else {
                                    setResultQuestions([]);
                                    setError(true);
                                }
                            } else {
                                setError(true);
                            }
                        }
                        console.log(res);
                    })
                    .catch(err => {
                        setError(true);
                        setLoading(false);
                        console.error(err);
                    });
                break;
            }
            case 3: {
                let formData = new FormData();
                formData.append('file', formValue?.file);
                formData.append('tags', tags?.toString());
                axios.post(`${apiURL}/generate_questions_from_image`,
                    formData,
                    {
                        headers: {
                            ...multipartApiConfig,
                            "Authorization": `Bearer ${accessToken}`,
                        }
                    }
                )
                    .then(res => {
                        setLoading(false);
                        if (res?.data?.status === 200) {
                            if (res?.data?.data instanceof Array) {
                                let dataList: Array<any> = [];
                                res?.data?.data?.forEach((data: any) => {
                                    if (data?.context) {
                                        dataList?.push(data);
                                    }
                                });
                                if (dataList?.length) {
                                    setResultQuestions(dataList);
                                    setError(false);
                                } else {
                                    setResultQuestions([]);
                                    setError(true);
                                }
                            } else {
                                setError(true);
                            }
                        }
                        console.log(res);
                    })
                    .catch(err => {
                        setError(true);
                        setLoading(false);
                        console.error(err);
                    });
                break;
            }
        }
    };

    const handleChangeFormValue = (field: string, value: string | Array<string>) => {
        setFormValue({ ...formValue, [field]: value });
    }

    const handleTagChange = (id: number, value: string) => {
        let list = [...tagList];
        list = list.map((tag: any) => tag.id === id ? { ...tag, value } : tag);
        setTagList(list);
    }

    const handleAddTag = () => {
        let list = [...tagList];
        let max = 0;
        list?.map((tag: any) => {
            if (tag.id > max) {
                max = tag?.id;
            }
        })
        list.push({
            id: max + 1,
            value: ''
        });
        setTagList(list);
    }

    const handleDeleteTag = (id: number) => {
        let list = [...tagList];
        list = list.filter((tag: any) => tag.id !== id);
        setTagList(list);
    }

    return (
        <DefaultLayout>
            <Stack gap={2}
                sx={{
                    background: '#F2F2F2',
                    overflow: 'auto',
                    padding: '24px',
                }}
            >
                <LoadingScreen loading={loading} />
                <Typography variant="h3" sx={{ textAlign: 'center', }}>
                    Tạo câu hỏi với đầu vào
                </Typography>

                <RadioGroup
                    value={createUsingParagraph}
                    onChange={(e) => {
                        handleRefresh();
                        setCreateUsingParagraph(Number(e.target.value))
                    }}
                >
                    <Stack direction={smUp ? 'row' : 'column'}
                        gap={1}
                        sx={{
                            width: '100%',
                            padding: '12px',
                            '.MuiTypography-root': {
                                fontSize: '20px',
                            }
                        }}
                    >
                        <Stack flex={1}>
                            <FormControlLabel
                                value={0}
                                control={<Radio />}
                                label="Sử dụng 1 câu đơn"
                            />
                        </Stack>
                        <Stack flex={1}>
                            <FormControlLabel
                                value={1}
                                control={<Radio />}
                                label="Sử dụng 1 đoạn văn gồm nhiều câu đơn"
                            />
                        </Stack>
                    </Stack>
                    <Stack direction={smUp ? 'row' : 'column'}
                        gap={1}
                        sx={{
                            width: '100%',
                            padding: '12px',
                            '.MuiTypography-root': {
                                fontSize: '20px',
                            }
                        }}
                    >
                        <Stack flex={1}>
                            <FormControlLabel
                                value={2}
                                control={<Radio />}
                                label="Sử dụng file pdf"
                            />
                        </Stack>
                        <Stack flex={1}>
                            <FormControlLabel
                                value={3}
                                control={<Radio />}
                                label="Sử dụng hình ảnh"
                            />
                        </Stack>
                    </Stack>
                </RadioGroup>

                <Stack
                    sx={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '24px',
                    }}
                    gap={2}
                >
                    {createUsingParagraph > 1 ?
                        <></>
                        :
                        <Stack direction={smUp ? "row" : 'column'}
                            gap={1}
                            alignItems={smUp ? "center" : "normal"}
                        >
                            <Stack flex={1}
                                direction={"row"}
                                justifyContent={smUp ? "center" : 'flex-start'}
                                sx={{
                                    fontSize: '20px',
                                }}
                            >
                                Chủ đề:
                            </Stack>
                            <Stack flex={4}>
                                <TextField
                                    value={formValue?.name}
                                    onChange={(e) => handleChangeFormValue('name', e.target.value)}
                                />
                            </Stack>
                        </Stack>
                    }

                    <Stack direction={smUp ? "row" : 'column'}
                        alignItems={smUp ? "center" : "normal"}
                        gap={1}
                    >

                        <Stack flex={1}
                            direction={"row"}
                            justifyContent={smUp ? "center" : 'flex-start'}
                            sx={{
                                fontSize: '20px',
                            }}
                        >
                            Đầu vào:
                        </Stack>
                        <Stack flex={4}>
                            {
                                createUsingParagraph > 1 ?
                                    <InputFile
                                        value={formValue?.file}
                                        onChange={(value: any) => handleChangeFormValue('file', value)}
                                        acceptType={
                                            createUsingParagraph === 2 ?
                                                ".pdf"
                                                : "image/*"
                                        }
                                    />
                                    :
                                    <TextField
                                        multiline
                                        value={formValue?.context}
                                        onChange={(e) => handleChangeFormValue('context', e.target.value)}
                                    />
                            }
                            <Typography variant='caption' sx={{ fontSize: '15px' }}>
                                {inputTextCaption[createUsingParagraph]}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction={smUp ? "row" : 'column'}
                        gap={1}
                    >
                        <Stack flex={1}
                            direction={"row"}
                            justifyContent={smUp ? "center" : 'flex-start'}
                            sx={{
                                fontSize: '20px',
                                marginTop: 1,
                            }}
                        >
                            Nhãn:
                        </Stack>
                        <Stack flex={4} gap={1}>
                            {
                                tagList?.map((tag: any) => (
                                    <Stack key={tag.id} direction={"row"} justifyContent={"space-between"} gap={2} alignItems={"center"}>
                                        <TextField
                                            fullWidth
                                            value={tag.value}
                                            onChange={(e) => handleTagChange(tag.id, e.target.value)}
                                        />
                                        <BasicButton onClick={() => handleDeleteTag(tag.id)}>
                                            Xóa
                                        </BasicButton>
                                    </Stack>
                                ))
                            }
                            <BasicButton onClick={handleAddTag} sx={{ width: '50%' }}>
                                Thêm nhãn mới
                            </BasicButton>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack justifyContent={"center"} direction={"row"} gap={1}>
                    <MainButton onClick={handleSubmit} sx={{ width: '50%' }}>
                        Gửi
                    </MainButton>
                    <BasicButton onClick={handleRefresh}>
                        Làm mới
                    </BasicButton>
                </Stack>

                {
                    error ?
                        <Stack direction={"row"} gap={1} justifyContent={"space-between"}>
                            <Stack sx={{ padding: '12px', color: 'red', fontSize: '20px' }}>
                                Some error has occurred, please check the form and try again.
                            </Stack>
                            <BasicButton onClick={() => setError(false)}>
                                Dismiss
                            </BasicButton>
                        </Stack>
                        : <></>
                }

                {
                    resultQuestions?.length > 0 ? <>
                        <Divider />
                        <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
                            <Typography variant="h5" sx={{ textAlign: 'center', }}>
                                Kết quả:
                            </Typography>

                            <MainButton onClick={handleRefresh}>
                                Tạo câu hỏi mới
                            </MainButton>

                        </Stack>

                        
                        <FormControlLabel
                            label="Hiện đáp án đúng"
                            control={<Checkbox
                                checked={isShowCorrectAnswer}
                                onChange={(e) => setIsShowCorrectAnswer(e.target.checked)}
                            />}
                        />
                    </>
                        : <></>
                }


                {
                    resultQuestions?.length > 0 ?
                        resultQuestions?.map((question: any) => {
                            return (
                                <Question
                                    isNewQuestion
                                    key={question?.question_id}
                                    {...question}
                                />
                            )
                        })
                        : <></>
                }

            </Stack >
        </DefaultLayout>
    );
};