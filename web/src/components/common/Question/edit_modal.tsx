import { Modal, Stack, Box, Typography } from "@mui/material";
import { StyledTextField as TextField } from "..";


export default function EditModal(props: any) {

    const {
        open,
        onClose,

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
                    <Typography variant="h4">
                        Chỉnh sửa câu hỏi
                    </Typography>
                </Stack>
            </Box>
        </Modal>
    )

}