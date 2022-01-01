import { FC, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Button, Chip, Avatar } from "@mui/material";

import UserCreationModal from "../UserCreationModal";

import { getAccountDetails } from "../../utils/apiHelpers";

import { UserDetailsProps } from "../../types/types";

const AccountChip: FC = () => {
  const router = useRouter();

  const [accountAddress, setAccountAddress] = useState(null);
  const [userDetails, setUserDetails] = useState<UserDetailsProps>();
  const [openModal, setOpenModal] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);

  useEffect(() => {
    getAccountDetails(setAccountAddress, setUserDetails);

    setUserRegistered(userDetails?.success);
  }, [accountAddress, userDetails?.success]);

  const handleButtonClick = () => {
    if (userRegistered) {
      router.push("/profile");
      return;
    }

    setOpenModal(!userRegistered);
  };

  return (
    <>
      {openModal && (
        <UserCreationModal
          accountAddress={accountAddress}
          setOpenModal={setOpenModal}
        />
      )}
      <Button onClick={handleButtonClick}>
        <Avatar
          src={userDetails?.data.avatar || "/static/images/profile_avatar.jpg"}
        />
      </Button>
    </>
  );
};

export default AccountChip;
