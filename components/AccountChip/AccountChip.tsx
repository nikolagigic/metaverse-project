import { FC, useEffect, useState } from 'react';

import { Button, Chip, Avatar } from "@mui/material";

import UserCreationModal from '../UserCreationModal';

import { checkIfAccountExists } from "../../utils/apiHelpers";

interface UserDetailsProps {
    success: boolean,
    data: {
        username: string,
        address: string,
        avatar: string,
        followers: Array<string>,
        following: Array<string>,
    }
}

const AccountChip: FC = () => {
    const [accountAddress, setAccountAddress] = useState(null);
    const [userDetails, setUserDetails] = useState<UserDetailsProps>();
    const [openModal, setOpenModal] = useState(false);
    const [userRegistered, setUserRegistered] = useState(false);

    useEffect(() => {
        checkIfAccountExists(setAccountAddress, setUserDetails)

        console.log(userDetails?.success)

        setUserRegistered(userDetails?.success)
    }, [accountAddress, userDetails?.success])

    const handleButtonClick = () => {
        setOpenModal(!userRegistered)
    }

    return (
        <>
            {openModal && <UserCreationModal accountAddress={accountAddress} setOpenModal={setOpenModal} />}
            <Button onClick={handleButtonClick}>
                {userRegistered ? 
                <Chip
                    sx={{ textTransform: "none" }}
                    label={accountAddress}
                    variant="outlined"
                    avatar={<Avatar src="/static/images/profile_avatar.jpg" />}
                /> : <Avatar src="/static/images/profile_avatar.jpg" />}
            </Button>
        </>
    )
}

export default AccountChip;