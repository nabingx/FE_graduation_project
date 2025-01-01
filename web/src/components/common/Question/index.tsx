import moment from "moment";
import React, { useEffect, useState } from "react";
import { Stack, Typography, Box, Grid2 as Grid, Chip, Rating, Menu, MenuItem, IconButton } from "@mui/material";
import { BasicButton, MainButton, StyledTextField as TextField } from "..";

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { deleteRequest, postRequest } from "../../../common/helpers/RequestHelper";
import EditModal from "./edit_modal";

export default function Question(props: any) {
    const {
        isNewQuestion = false,
        isShowCorrectAnswer = false,
        currentUser = '',
        canComment = false,
        canRate = false,

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

    const correctColor = "#1cc968";
    const wrongColor = "#ea4748";
    const normalColor = "#ffffff"

    const [isClicked, setIsClicked] = useState('');
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null | undefined>(null);
    const [tagList, setTagList] = useState([]);
    const [commentsList, setCommentsList] = useState<Array<any>>([]);
    const [showAllComments, setShowAllComments] = useState<boolean>(true);
    const [questionDetail, setQuestionDetail] = useState<any>(props);

    const [ratingValue, setRatingValue] = useState<number | null>(null);
    const [commentValue, setCommentValue] = useState<string>('');

    const [openEditQuestion, setOpenEditQuestion] = useState<boolean>(false);

    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [openOption, setOpenOption] = useState<boolean>(false);

    useEffect(() => {
        if (questionDetail?.tags) {
            setTagList(questionDetail?.tags.split(',')?.map((tag: string) => tag?.trim()));
        }
    }, [questionDetail?.tags])

    useEffect(() => {
        if (questionDetail?.comments && questionDetail?.comments.length) {
            setCommentsList(questionDetail?.comments.sort((a: any, b: any) => b.created_at - a.created_at));
        }
    }, [questionDetail?.comments])

    useEffect(() => {
        if (questionDetail?.ratings && currentUser) {
            let item = questionDetail?.ratings?.find((t: any) => t.username === currentUser);
            if (item) {
                setRatingValue(Number(item?.rating_value));
            }
        }
    }, [questionDetail?.ratings, currentUser])

    useEffect(() => {
        if (isShowCorrectAnswer) {
            setIsClicked(questionDetail?.correct_choice);
            setIsCorrectAnswer(true);
        } else {
            handleRefresh();
        }
    }, [isShowCorrectAnswer])

    const handleClicked = (choice: string) => {
        if (isClicked !== '') {
            return;
        }
        setIsClicked(choice);
        setIsCorrectAnswer(choice === questionDetail?.correct_choice);
    }

    const handleRefresh = () => {
        setIsClicked('');
        setIsCorrectAnswer(null);
    }

    const handleRating = async (rate: number | null) => {
        let apiBody = {
            // uid: currentUser,
            question_id: questionDetail?.question_id,
            rate,
        }
        const res = await postRequest('/rating-questions', apiBody)
        if (res?.status === 200) {
            setQuestionDetail((prev: any) => ({
                ...prev,
                ...res?.body?.data,
            }));
        }
    }

    const handleComment = async () => {
        let apiBody = {
            // uid: currentUser,
            question_id: questionDetail?.question_id,
            comment: commentValue,
        }
        const res = await postRequest('/comment-questions', apiBody)
        if (res?.status === 200) {
            setQuestionDetail((prev: any) => ({
                ...prev,
                ...res?.body?.data,
            }));
            setCommentValue('');
        }
    }

    const handleDeleteComment = async (comment_id: number) => {
        const res = await deleteRequest(`/comments/${comment_id}`)
        if (res?.status === 200) {
            setQuestionDetail((prev: any) => ({
                ...prev,
                ...res?.body?.data,
            }));
        }
    }

    const handleOpenOptions = (event: any) => {
        setAnchorEl(event.currentTarget);
        setOpenOption(true);
    }

    const handleCloseOptions = () => {
        setAnchorEl(null);
        setOpenOption(false);
    }

    const handleEditQuestion = () => {
        setOpenEditQuestion(true);
    }

    const handleDeleteQuestion = async (id: number) => {
        try {
            let res = await deleteRequest(`/delete-user-question?question_id=${id}`);
            if (res?.status === 200) {
                window.location.reload();
            }

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Stack gap={3}
            sx={{
                backgroundImage: 'linear-gradient(120deg, #3ca7ee, #9b408f)',
                borderRadius: '8px',
                padding: '16px',
            }}
        >
            {
                openEditQuestion &&
                <EditModal
                    open={openEditQuestion}
                    onClose={() => setOpenEditQuestion(false)}
                    {...questionDetail}
                />
            }
            <Stack
                sx={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '30px 12px',
                    fontSize: '24px',
                    fontWeight: 'bold',
                }}
                flex={1}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={2}
            >
                <Stack direction={"row"} gap={2} alignItems={"center"}>
                    Người tạo:
                    <Typography variant="h6"
                        sx={
                            questionDetail?.username === currentUser ?
                                { background: '#13ba00', padding: '8px', borderRadius: '8px', color: 'white', cursor: 'pointer', }
                                : { background: 'gray', padding: '8px', borderRadius: '8px', color: 'white', cursor: 'pointer', }
                        }
                        onClick={() => window.location.href = `/question_detail?username=${questionDetail?.username}`}
                    >
                        {questionDetail?.username}
                    </Typography>
                </Stack>

                {
                    questionDetail?.username === currentUser &&
                    <React.Fragment>
                        <IconButton onClick={handleOpenOptions}>
                            Tùy chỉnh
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={openOption}
                            onClose={handleCloseOptions}
                        >
                            <MenuItem onClick={handleEditQuestion}>
                                Chỉnh sửa câu hỏi
                            </MenuItem>
                            <MenuItem onClick={() => handleDeleteQuestion(questionDetail?.question_id)}>
                                Xóa câu hỏi
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                }

            </Stack>
            <Stack direction={"row"} gap={3} justifyContent={"space-between"}>
                <Stack
                    sx={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '30px 12px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                    }}
                    flex={1}
                    direction={"row"}
                    alignItems={"center"}
                >
                    Q: {questionDetail?.question_text}
                </Stack>

                <BasicButton onClick={handleRefresh}>
                    Làm mới
                </BasicButton>

            </Stack>
            <Box>
                <Grid container spacing={3}>
                    {questionDetail?.choices?.map((answer: string, index: number) => (
                        <Grid size={{ sm: 12, md: 6 }}
                            key={index}
                            sx={{
                                background:
                                    isClicked ?
                                        isClicked === answer ?
                                            isCorrectAnswer ? correctColor
                                                : wrongColor
                                            : questionDetail?.correct_choice === answer ?
                                                correctColor
                                                : normalColor
                                        : normalColor
                                ,
                                padding: '18px',
                                borderRadius: '8px',
                                border: 'solid 1px #ccc',
                                cursor: 'pointer',
                                '&:hover': {
                                    background: !isClicked ? '#f1f1f1' : '',
                                },
                            }}
                            onClick={() => handleClicked(answer)}
                        >
                            <Typography variant="body2"
                                sx={{
                                    fontSize: '20px',
                                }}
                            >
                                {answer}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Stack direction={"row"} gap={1} alignItems={"center"}>
                <Typography variant="body2"
                    sx={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Nhãn:
                </Typography>
                {
                    tagList?.map((tag: string, index: number) => {
                        return (
                            <Chip key={`tag-${tag}-${index}`}
                                label={tag}
                                sx={{
                                    padding: '20px',
                                    background: '#ffffff80'
                                }}
                            />
                        )
                    })
                }
            </Stack>

            <Typography sx={{
                background: 'white',
                borderRadius: '4px',
                padding: '10px',
            }}>
                Nội dung câu đầu vào: {questionDetail?.context}
            </Typography>

            <Typography sx={{
                background: 'white',
                borderRadius: '4px',
                padding: '10px',
            }}>
                {questionDetail?.duplicate_info?.duplicate_questions?.length} câu hỏi tương tự <br />
                {questionDetail?.duplicate_info?.duplicate_answers?.length} câu trả lời tương tự <br />
            </Typography>

            {
                !isNewQuestion &&
                <>
                    <Stack sx={{
                        background: 'white',
                        borderRadius: '4px',
                        padding: '10px',
                    }}>
                        Số lượt đánh giá: {questionDetail?.ratings?.length}
                        <br />
                        <Stack direction={"row"} gap={2} alignItems={"center"}>
                            <Typography>
                                Đánh giá trung bình:
                            </Typography>
                            <Rating
                                precision={0.5}
                                value={questionDetail?.average_rating}
                                defaultValue={questionDetail?.average_rating}
                                readOnly
                            />
                        </Stack>
                    </Stack>
                    {
                        canRate &&
                        <Stack sx={{
                            background: 'white',
                            borderRadius: '4px',
                            padding: '10px',
                        }}>
                            <Rating
                                value={ratingValue}
                                onChange={(event, newValue) => {
                                    if (ratingValue !== newValue) {
                                        setRatingValue(newValue);
                                        handleRating(newValue);
                                    }
                                }}
                            />
                        </Stack>
                    }

                    <Stack gap={1} sx={{
                        background: 'white',
                        borderRadius: '4px',
                        padding: '8px',
                    }}>
                        <Typography variant="h6">Bình luận ({commentsList?.length})</Typography>
                        <Stack direction={"row"} alignItems={"center"}
                            sx={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={() => setShowAllComments(!showAllComments)}
                        >
                            {
                                showAllComments ?
                                    <Stack direction={"row"} gap={1} alignItems={"center"}>
                                        <KeyboardDoubleArrowUpIcon />
                                        Ẩn toàn bộ bình luận
                                    </Stack>
                                    :
                                    <Stack direction={"row"} gap={1} alignItems={"center"}>
                                        <KeyboardDoubleArrowDownIcon />
                                        Hiện toàn bộ bình luận
                                    </Stack>
                            }
                        </Stack>
                        {
                            showAllComments && commentsList?.map((comment: any) => {
                                return (
                                    <Box key={comment?.comment_id} sx={{ border: 'solid 1px #cdcdcd', borderRadius: '4px', padding: '4px' }}>
                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                            <Typography variant="body2" sx={{
                                                fontSize: '16px',
                                            }}>
                                                {comment?.username}
                                            </Typography>

                                            <Stack direction={"row"} gap={1} alignItems={"center"}>
                                                <Typography>
                                                    {comment?.created_at ? moment(comment?.created_at)?.format('YYYY-MM-DD HH:mm:ss') : ''}
                                                </Typography>
                                                {
                                                    comment?.username === currentUser &&
                                                    <BasicButton onClick={() => handleDeleteComment(comment?.comment_id)} sx={{ height: '20px' }}>
                                                        Xóa
                                                    </BasicButton>
                                                }
                                            </Stack>

                                        </Stack>
                                        <Typography variant="caption" sx={{
                                            fontSize: '14px',
                                            color: '#999999',
                                        }}>
                                            {comment?.comment_value || comment?.comment_text}
                                        </Typography>
                                    </Box>
                                )
                            })
                        }
                        {
                            canComment &&
                            <Stack gap={1}>
                                <Typography variant="body1">
                                    Bình luận mới
                                </Typography>
                                <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
                                    <TextField
                                        multiline
                                        fullWidth
                                        value={commentValue}
                                        onChange={(e) => setCommentValue(e.target.value)}
                                    />
                                    <MainButton onClick={handleComment}>
                                        Gửi
                                    </MainButton>
                                </Stack>
                            </Stack>
                        }
                    </Stack>
                </>
            }

        </Stack>
    )
}