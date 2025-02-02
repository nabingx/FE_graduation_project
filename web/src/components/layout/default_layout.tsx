import { Avatar, Stack, Tooltip, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { NavigateButton } from "../common";

import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { UserOutlined } from "@ant-design/icons";
import CustomizedInputBase from "./search_bar";
import { infoStore } from "../../pages/infor_user/InforStore";
import { useEffect } from "react";

interface INavItem {
    path: string;
    label: string;
    icon: JSX.Element;
}

const DefaultLayout = observer(({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        infoStore.fetchGetInfoUser();
    }, []);
    const lgUp = useMediaQuery('(min-width:1400px)');

    const navigateList: INavItem[] = [
        {
            path: "/",
            label: "Trang chủ",
            icon: <HomeIcon />,
        },
        {
            path: "/create_question",
            label: "Tạo câu hỏi mới",
            icon: <AddBoxIcon />,
        },
        {
            path: "/question_detail",
            label: "Danh sách câu hỏi",
            icon: <FormatListNumberedIcon />,
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        window.location.reload();
    };

    const handleRedirect = (path: string) => {
        window.location.href = path;
    };

    useEffect(() => {
        infoStore.fetchGetInfoUser();
    }, []);

    return (
        <Stack gap={1} sx={{ height: '100vh' }}>
            <Stack
                direction={"row"}
                gap={1}
                sx={{ padding: '12px' }}
                justifyContent={"space-between"}
            >
                <Stack direction={"row"} gap={1}>
                    {navigateList.map((item: INavItem) => (
                        <NavigateButton key={item.path} onClick={() => handleRedirect(item.path)}>
                            <Link to="#">
                                <Stack direction={"row"} gap={1}>
                                    {item.icon}
                                    <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
                                </Stack>
                            </Link>
                        </NavigateButton>
                    ))}
                </Stack>
                {lgUp && (
                    <Stack direction={"row"} gap={1}>
                        <CustomizedInputBase />
                    </Stack>
                )}
                <Stack direction={"row"} gap={2}>
                    {infoStore.inforUser.avatar ? (
                        <Tooltip title="Thông tin cá nhân">
                            <Avatar
                                src={infoStore.inforUser.avatar}
                                style={{
                                    marginLeft: "500px",
                                    fontSize: "80px",
                                    cursor: "pointer",
                                    height: "50px",
                                    width: "50px",
                                }}
                                onClick={() => handleRedirect("/infor-user")}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Thông tin cá nhân">
                            <UserOutlined
                                style={{
                                    marginLeft: "500px",
                                    fontSize: "30px",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleRedirect("/infor-user")}
                            />
                        </Tooltip>
                    )}

                    <NavigateButton onClick={handleLogout}>
                        Logout
                    </NavigateButton>
                </Stack>
            </Stack>

            {!lgUp && (
                <Stack
                    direction={"row"}
                    gap={1}
                    sx={{ padding: '10px' }}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <CustomizedInputBase />
                </Stack>
            )}

            <Stack sx={{ overflow: 'auto' }}>
                {children}
            </Stack>
        </Stack>
    );
});

export default DefaultLayout;
