import { Button, Stack, Typography } from '@mui/material';
import { BasicButton } from '..';

export default function InputFile(props: any) {

    const {
        value,
        error = '',
        onChange = (v: any) => { },
        acceptType = "",
        height = "40px",

    } = props;

    const onImageChange = (e: any) => {
        const file = e.target.files[0];
        // const size = e.target.files[0].size;
        e.target.value = ''
        onChange(file);
    };

    const handleRemove = () => {
        onChange('');
    };

    // const handleDownload = () => {
    //     const link = document.createElement('a');
    //     link.href = value;
    //     link.target = "_blank";
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // }

    return (
        <Stack flex={1}
            direction={"column"}
        >
            <Stack direction={"row"} spacing={0.4} sx={{ width: '100%' }}>
                <Stack
                    spacing={1}
                    direction={"row"}
                    // justifyContent={value && value.url ? "space-between" : "flex-end"}
                    sx={{
                        width: '100%',
                        height: height,
                        border: 'solid 1px #E2E2EA',
                        borderRadius: '8px',
                        padding: '2px 6px',
                    }}
                >
                    {
                        value ?
                            <Stack justifyContent={"space-between"} flex={1} direction={"row"} spacing={1}>
                                <Stack flex={1} sx={{ position: 'relative' }} justifyContent={"center"}>
                                    <span title={value?.name}
                                        style={{
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            position: 'absolute',
                                            width: '100%',
                                        }}
                                    >
                                        {value?.name}
                                    </span>

                                </Stack>
                                <BasicButton
                                    onClick={handleRemove}
                                    sx={{
                                        padding: '6px',
                                        border: 'solid 1px #E2E2EA',
                                        borderRadius: '8px',
                                        minWidth: '20px'
                                    }}
                                >
                                    Xóa
                                </BasicButton>
                            </Stack>
                            : <></>
                    }
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                    >
                        Chọn file
                        <input type="file"
                            // accept="image/*"
                            accept={acceptType}
                            style={{
                                clip: 'rect(0 0 0 0)',
                                clipPath: 'inset(50%)',
                                height: 1,
                                overflow: 'hidden',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                whiteSpace: 'nowrap',
                                width: 1,
                            }}
                            onChange={onImageChange}
                        />
                    </Button>
                </Stack>
                {/* {
                    value ?
                        <Stack>
                            <MainButton title='Download'
                                onClick={handleDownload}
                            >
                                <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 6H10V0H4V6H0L7 13L14 6ZM6 8V2H8V8H9.17L7 10.17L4.83 8H6ZM0 15H14V17H0V15Z" fill="#181A1B" />
                                </svg>
                            </MainButton>
                        </Stack>
                        : <></>
                } */}
            </Stack>
            {
                error ?
                    <Typography sx={{ color: 'red' }}>
                        {error}
                    </Typography>
                    : <></>
            }
        </Stack>
    );

}