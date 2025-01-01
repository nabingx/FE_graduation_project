import { Modal, Stack, Box, Typography, Divider, useMediaQuery, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { BasicButton, MainButton, StyledTextField as TextField } from "..";
import { useEffect, useState } from "react";


export default function EditModal(props: any) {

    const {
        open,
        onClose,

        topic,
        question,
        handleSubmitEditQuestion,

        average_rating = 0,
        choices,
        comments = [],
        context,
        correct_choice,
        duplicate_info = {},
        question_id,
        question_text,
        ratings = [],
        tags,
        username = '',
    } = props;

    const smUp = useMediaQuery('(min-width:700px)');

    const [modalValue, setModalValue] = useState<any>();
    const [tagList, setTagList] = useState<Array<any>>([]);

    useEffect(() => {
        if (question) {
            setModalValue({
                ...question,
                topic,
            });
        }
    }, [question, topic])

    useEffect(() => {
        if (question?.tags) {
            let list = question?.tags.split(',')?.map((tag: string, index: number) => {
                return ({
                    id: index,
                    value: tag?.trim(),
                })
            });
            setTagList(list);
        }
    }, [question?.tags])

    // useEffect(() => {
    //     console.log(modalValue);
    // }, [modalValue])

    const handleChangeModalValue = (field: string, value: string | Array<string>, index?: number | null | undefined) => {
        if (field === 'choices' && index != null) {
            let choices = modalValue?.choices;
            let correct_choice = modalValue?.correct_choice;
            if (choices[index] === modalValue?.correct_choice) {
                correct_choice = value;
            }
            choices[index] = value;
            setModalValue({...modalValue, choices, correct_choice });
        } else {
            setModalValue({ ...modalValue, [field]: value });
        }
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
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    gap: '24px',
                    width: '80vw',
                    height: 'max-content',
                    maxHeight: '80vh',
                    padding: '24px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    overflow: 'auto',
                }}
            >
                <Stack gap={2}>
                    <Typography variant="h3">
                        Chỉnh sửa câu hỏi
                    </Typography>

                    <Divider />

                    <Stack direction={smUp ? "row" : 'column'} gap={1}>
                        <Stack flex={1}
                            direction={"row"}
                            justifyContent={smUp ? "center" : 'flex-start'}
                            alignItems={"center"}
                        >
                            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                                Chủ đề:
                            </Typography>
                        </Stack>
                        <Stack flex={4}>
                            <TextField
                                multiline
                                value={modalValue?.topic}
                                onChange={(e) => handleChangeModalValue('topic', e.target.value)}
                            />
                        </Stack>
                    </Stack>

                    <Stack direction={smUp ? "row" : 'column'} gap={1}>
                        <Stack flex={1}
                            direction={"row"}
                            justifyContent={smUp ? "center" : 'flex-start'}
                            alignItems={"center"}
                        >
                            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                                Câu đầu vào:
                            </Typography>
                        </Stack>
                        <Stack flex={4}>
                            <TextField
                                multiline
                                value={modalValue?.context}
                                onChange={(e) => handleChangeModalValue('context', e.target.value)}
                            />
                        </Stack>
                    </Stack>

                    <Stack direction={smUp ? "row" : 'column'} gap={1}>
                        <Stack flex={1}
                            direction={"row"}
                            justifyContent={smUp ? "center" : 'flex-start'}
                            alignItems={"center"}
                        >
                            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                                Câu hỏi:
                            </Typography>
                        </Stack>
                        <Stack flex={4}>
                            <TextField
                                multiline
                                value={modalValue?.question_text}
                                onChange={(e) => handleChangeModalValue('question_text', e.target.value)}
                            />
                        </Stack>
                    </Stack>

                    <Stack direction={smUp ? "row" : 'column'} gap={1}>
                        <Stack flex={1}
                            direction={"row"}
                            justifyContent={smUp ? "center" : 'flex-start'}
                            sx={{
                                marginTop: 1,
                            }}
                        >
                            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                                Các câu trả lời và câu trả lời đúng:
                            </Typography>
                        </Stack>
                        <Stack flex={4} gap={1}>
                            <RadioGroup
                                value={modalValue?.correct_choice || ''}
                                onChange={(e) => handleChangeModalValue('correct_choice', e.target.value)}
                            >
                                {
                                    modalValue?.choices?.map((answer: string, index: number) => {
                                        return (
                                            <Stack direction={"row"} gap={1} alignItems={"center"}>
                                                <FormControlLabel
                                                    key={`${answer}_${index}`}
                                                    value={answer}
                                                    control={<Radio />}
                                                    label={''}
                                                    sx={{margin: 0}}
                                                />
                                                <TextField
                                                    multiline
                                                    value={answer}
                                                    onChange={(e) => handleChangeModalValue(`choices`, e.target.value, index)}
                                                />
                                            
                                            </Stack>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </Stack>
                    </Stack>

                    <Stack gap={1}>
                        <Stack>
                            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                                Nhãn:
                            </Typography>
                        </Stack>
                        <Stack flex={4} gap={1}>
                            {
                                tagList?.map((tag: any) => (
                                    <Stack key={tag.id} direction={"row"} justifyContent={"space-between"} gap={2} alignItems={"center"}>
                                        <TextField
                                            value={tag.value}
                                            onChange={(e) => handleTagChange(tag.id, e.target.value)}
                                        />
                                        <BasicButton onClick={() => handleDeleteTag(tag.id)}>
                                            Xóa
                                        </BasicButton>
                                    </Stack>
                                ))
                            }
                            <BasicButton onClick={handleAddTag} sx={{ width: '50%', }}>
                                Thêm nhãn mới
                            </BasicButton>
                        </Stack>
                    </Stack>

                    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                        <MainButton onClick={() => handleSubmitEditQuestion({
                            ...modalValue,
                            tags: tagList?.map(tag => tag.value),
                        })}>
                            Lưu lại
                        </MainButton>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )

}