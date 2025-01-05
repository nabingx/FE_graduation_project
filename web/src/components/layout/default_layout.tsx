import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { NavigateButton } from "../common";

import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import {UserOutlined} from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import { infoStore } from "../../pages/infor_user/InforStore";
import { observer } from "mobx-react";
import {useEffect} from "react";

interface INavItem {
    path: string;
    label: string;
    icon: JSX.Element;
}

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {
        infoStore.fetchGetInfoUser();
    }, []);

    const navigateList: INavItem[] = [
        {
            path: "/",
            label: "Home",
            icon: <HomeIcon />,
        },
        {
            path: "/create_question",
            label: "Create new questions",
            icon: <AddBoxIcon />,
        },
        {
            path: "/question_detail",
            label: "All users's questions",
            icon: <FormatListNumberedIcon />,
        },
        {
            path: "/newfeeds",
            label: "Newfeeds",
            icon: <NewspaperIcon />,
        }
    ]

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        window.location.reload();
    }

    const handleRedirect = (path: string) => {
        window.location.href = path;
    }

    return (
        <Stack gap={1} sx={{ height: '100vh' }}>
            <Stack direction={"row"}
                gap={1}
                sx={{ padding: '12px' }}
                justifyContent={"space-between"}
            >
                <Stack direction={"row"} gap={1}>
                    {
                        navigateList?.map((item: INavItem) => {
                            return (
                                <NavigateButton key={item.path} onClick={() => handleRedirect(item.path)}>
                                    <Link to="#">
                                        <Stack direction={"row"} gap={1}>
                                            {item.icon}
                                            <span style={{whiteSpace: 'nowrap'}}>{item.label}</span>
                                        </Stack>
                                    </Link>
                                </NavigateButton>
                            )
                        })
                    }
                </Stack>
                <Stack direction={"row"} gap={2}>
                    {infoStore.inforUser.avatar ? (
                        <Tooltip title="Thông tin cá nhân">
                            <Avatar
                                src={infoStore.inforUser.avatar}
                                style={{ marginLeft: "500px", fontSize: "80px", cursor: "pointer", height:"50px", width:"50px" }}
                                onClick={() => handleRedirect("/infor-user")}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Thông tin cá nhân">
                            <UserOutlined
                                style={{ marginLeft: "500px", fontSize: "30px", cursor: "pointer" }}
                                onClick={() => handleRedirect("/infor-user")}
                            />
                        </Tooltip>
                    )}

                    <NavigateButton onClick={handleLogout}>
                        Logout
                    </NavigateButton>
                </Stack>

            </Stack>

            <Stack sx={{ overflow: 'auto' }}>
                {children}
            </Stack>
        </Stack>
    )
};

export default observer(DefaultLayout);
