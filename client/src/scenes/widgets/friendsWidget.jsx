import { Box, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from 'components/flexBetween';
import WidgetWrapper from 'components/widgetWrapper';
import { setFriends } from 'state/state';
import Friend from 'components/friend';

const FriendsWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector(state => state.token);
    const friends = useSelector(state => state.user.friends)

    const getFriends = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
        const data = await response.json();
        dispatch(setFriends({ friends: data }))
    }

    useEffect(() => { getFriends() }, [])

    return (
        <WidgetWrapper>
            <Typography>Friends List</Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">{friends.map((friend) =>
                <Friend key={friend._id}
                    friendId={friend._id}
                    name={`${friend.firstName} ${friend.lastName}`}
                    subtitle={friend.occupation}
                    userPicturePath={friend.picturePath} />)}</Box>
        </WidgetWrapper>
    )
}

export default FriendsWidget;