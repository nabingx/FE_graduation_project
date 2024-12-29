import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { NavigateButton } from "../common";

import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {UserOutlined} from "@ant-design/icons";

interface INavItem {
    path: string;
    label: string;
    icon: JSX.Element;
}

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {

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
    ]

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        window.location.reload();
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
                                <NavigateButton key={item.path}>
                                    <Link to={item.path}>
                                        <Stack direction={"row"} gap={1}>
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </Stack>
                                    </Link>
                                </NavigateButton>
                            )
                        })
                    }
                </Stack>
                <UserOutlined
                    style={{marginLeft: "500px", fontSize: "30px" }}
                    onClick={() => window.location.href = "/infor-user"}
                />

                <NavigateButton onClick={handleLogout}>
                    Logout
                </NavigateButton>

            </Stack>

            <Stack sx={{ overflow: 'auto' }}>
                {children}
            </Stack>
        </Stack>
    )
};

export default DefaultLayout;
