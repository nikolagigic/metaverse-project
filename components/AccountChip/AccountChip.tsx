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

        setUserRegistered(accountAddress !== null)
    }, [accountAddress])

    const handleButtonClick = () => {
        setOpenModal(!userRegistered)
    }

    return (
        <>
            {openModal && <UserCreationModal accountAddress={accountAddress} setOpenModal={setOpenModal} />}
            <Button onClick={handleButtonClick}>
                <Chip
                    sx={{ textTransform: "none" }}
                    label="0x12345678"
                    variant="outlined"
                    avatar={<Avatar src="/static/images/profile_avatar.jpg" />}
                />
            </Button>
        </>
    )
}

export default AccountChip;