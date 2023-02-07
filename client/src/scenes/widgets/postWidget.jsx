import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/flexBetween";
import Friend from "components/friend";
import WidgetWrapper from "components/widgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state/state";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const likePatch = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: loggedInUserId }),
            });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }))
    }

    return (
        <WidgetWrapper>
            <Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />
            <Typography color={main} sx={{ mt: "1rem" }}>{description}</Typography>
            {picturePath && (<img width='100%' height='auto' alt="post" style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }} src={`http://localhost:3001/assets/${picturePath}`} />
            )}
            <FlexBetween>
                <FlexBetween>
                    <FlexBetween>
                        <IconButton onClick={likePatch}>{isLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}</IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <IconButton onClick={() => setIsComments(!isComments)}><ChatBubbleOutlineOutlined /></IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <IconButton><ShareOutlined /></IconButton>
            </FlexBetween>
            {isComments && (
                <Box>
                    {comments.map((comment, id) => (<Box key={`${postId}${id}`}><Typography>{comment}</Typography><Divider /></Box>))}
                </Box>
            )}
        </WidgetWrapper>

    )
}

export default PostWidget;