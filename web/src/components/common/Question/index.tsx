import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Stack, Typography, Box, Grid2 as Grid, Chip, Rating } from "@mui/material";
import { BasicButton } from "..";

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { postRequest } from "../../../common/helpers/RequestHelper";

export default function Question(props: any) {
    const {
        question_id,
        isNewQuestion = false,
        isShowCorrectAnswer = false,
        currentUser = '',
        context,
        question_text,
        choices,
        correct_choice,
        tags,
        duplicate_info = {},
        average_rating = 0,
        ratings = [],
        comments = [],
        canComment = false,
        canRate = false,
    } = props;

    const correctColor = "#1cc968";
    const wrongColor = "#ea4748";
    const normalColor = "#ffffff"

    const [isClicked, setIsClicked] = useState('');
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null | undefined>(null);
    const [tagList, setTagList] = useState([]);
    const [commentsList, setCommentsList] = useState<Array<any>>([]);
    const [showAllComments, setShowAllComments] = useState<boolean>(true);

    const [ratingValue, setRatingValue] = useState<number | null>(ratings?.find((t: any) => t.username === currentUser)?.rating_value);

    useEffect(() => {
        if (tags) {
            setTagList(tags.split(',')?.map((tag: string) => tag?.trim()));
        }
    }, [tags])

    useEffect(() => {
        if (comments && comments.length) {
            setCommentsList(comments.sort((a: any, b: any) => b.created_at - a.created_at));
        }
    }, [comments])

    useEffect(() => {
        if (isShowCorrectAnswer) {
            setIsClicked(correct_choice);
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
        setIsCorrectAnswer(choice === correct_choice);
    }

    const handleRefresh = () => {
        setIsClicked('');
        setIsCorrectAnswer(null);
    }

    const handleRating = async (rate: number | null) => {
        let apiBody = {
            uid: currentUser,
            question_id,
            rate,
        }
        const res = await postRequest('/rating-questions', apiBody)
    }

    return (
        <Stack gap={3}
            sx={{
                backgroundImage: 'linear-gradient(120deg, #3ca7ee, #9b408f)',
                borderRadius: '8px',
                padding: '16px',
            }}
        >
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
                    Q: {question_text}
                </Stack>

                <BasicButton onClick={handleRefresh}>
                    Làm mới
                </BasicButton>

            </Stack>
            <Box>
                <Grid container spacing={3}>
                    {choices.map((answer: string, index: number) => (
                        <Grid size={{ sm: 12, md: 6 }}
                            key={index}
                            sx={{
                                background:
                                    isClicked ?
                                        isClicked === answer ?
                                            isCorrectAnswer ? correctColor
                                                : wrongColor
                                            : correct_choice === answer ?
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
                Nội dung câu đầu vào: {context}
            </Typography>

            <Typography sx={{
                background: 'white',
                borderRadius: '4px',
                padding: '10px',
            }}>
                {duplicate_info?.duplicate_questions?.length} câu hỏi tương tự <br />
                {duplicate_info?.duplicate_answers?.length} câu trả lời tương tự <br />
            </Typography>

            {
                !isNewQuestion &&
                <>
                    <Typography sx={{
                        background: 'white',
                        borderRadius: '4px',
                        padding: '10px',
                    }}>
                        Số lượt đánh giá: {ratings?.length}
                        <br />
                        <Stack direction={"row"} gap={2} alignItems={"center"}>
                            <Typography>
                                Đánh giá trung bình:
                            </Typography>
                            <Rating
                                precision={0.5}
                                value={average_rating}
                                readOnly
                            />
                        </Stack>
                    </Typography>
                    {
                        canRate && 
                        <Typography sx={{
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
                        </Typography>
                    }

                    <Stack gap={1} sx={{
                        background: 'white',
                        borderRadius: '4px',
                        padding: '8px',
                    }}>
                        <Typography variant="h6">Bình luận ({commentsList?.length})</Typography>
                        <Typography onClick={() => setShowAllComments(!showAllComments)} alignItems={"center"} sx={{ color: 'blue', textDecoration: 'underline' }}>
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
                        </Typography>
                        {
                            showAllComments && commentsList?.map(comment => {
                                return (
                                    <Box key={comment?.comment_id} sx={{ border: 'solid 1px #cdcdcd', borderRadius: '4px', padding: '4px' }}>
                                        <Stack direction={"row"} justifyContent={"space-between"}>
                                            <Typography variant="body2" sx={{
                                                fontSize: '16px',
                                            }}>
                                                {comment?.username}
                                            </Typography>

                                            <Stack>
                                                {comment?.created_at ? moment(comment?.created_at)?.format('YYYY-MM-DD HH:mm:ss') : ''}
                                            </Stack>

                                        </Stack>
                                        <Typography variant="caption" sx={{
                                            fontSize: '14px',
                                            color: '#999999',
                                        }}>
                                            {comment.comment_value}
                                        </Typography>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                </>
            }

        </Stack>
    )
}