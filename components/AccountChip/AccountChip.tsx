import { FC, useState } from "react";

import { Avatar, Chip, Tooltip } from "@mui/material";

import { shortenAddress } from "../../utils/helpers";

interface AccountChipProps {
  avatarImage: string;
  seller: string;
}

const AccountChip: FC<AccountChipProps> = ({ avatarImage, seller }) => {
  const [tooltipText, setTooltipText] = useState("Click to Copy");

  return (
    <Tooltip
      title={tooltipText}
      placement="top"
      onClose={() => {
        setTimeout(() => {
          setTooltipText("Click to Copy");
        }, 200);
      }}
    >
      <Chip
        sx={{ marginTop: 2 }}
        label={shortenAddress(seller)}
        avatar={<Avatar src={avatarImage} />}
        onClick={() => {
          setTooltipText("Copied!");
          navigator.clipboard.writeText(seller);
        }}
      />
    </Tooltip>
  );
};

export default AccountChip;
