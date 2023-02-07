import { useSelector } from 'react-redux';
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar/navbar";
import UserWidget from "scenes/widgets/userWidget";
import MyPostWidget from 'scenes/widgets/myPostWidget';
import PostsWidget from 'scenes/widgets/postsWidget';
import AdWidget from 'scenes/widgets/adWidget';
import FriendsWidget from 'scenes/widgets/friendsWidget';


const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <AdWidget />
                        <Box m="2rem 0" />
                        <FriendsWidget userId={_id} />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default HomePage;