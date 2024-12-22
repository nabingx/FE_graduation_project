import { Stack, Typography, Box, Grid2 as Grid, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { BasicButton } from "..";


export default function Question(props: any) {
    const {
        question_text,
        choices,
        correct_choice,
        tags,
        duplicateCount = 0,
    } = props;

    const correctColor = "#1cc968";
    const wrongColor = "#ea4748";
    const normalColor = "#ffffff"

    const [isClicked, setIsClicked] = useState('');
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null | undefined>(null);
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        if (tags) {
            setTagList(tags.split(',')?.map((tag: string) => tag?.trim()));
        }
    }, [tags])

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
                    Refresh
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
                    Tags:
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

            {
                duplicateCount > 0 ?
                    <Typography>
                        {duplicateCount} questions simiate
                    </Typography>
                    : <></>
            }
        </Stack>
    )
}