import { FC, useEffect, useState } from 'react';

import { Button, Chip, Avatar } from "@mui/material";

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

interface AccountChipProps {
    setUserExists: (value: boolean) => void
  }

const AccountChip: FC<AccountChipProps> = ({ setUserExists }) => {
    const [userDetails, setUserDetails] = useState<UserDetailsProps>();

    useEffect(() => {
        if (userDetails) {
            console.log('>>> userDetails: ', userDetails)
            setUserExists(userDetails.success)
        }
    }, [userDetails])

    const handleButtonClick = () => {
        console.log('>>> called')
        checkIfAccountExists(setUserDetails)
    }

    return (
        <Button onClick={handleButtonClick}>
            <Chip
                sx={{ textTransform: "none" }}
                label="0x12345678"
                variant="outlined"
                avatar={<Avatar src="/static/images/profile_avatar.jpg" />}
            />
        </Button>
    )
}

export default AccountChip;