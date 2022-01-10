import { FC, useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";

import { Grid, Box, Card, CardContent, Typography } from "@mui/material";

import { descriptionLength } from "./constants";

import NFTTokenWrapper from "../TokenRenderer/NFTTokenWrapper";
import AccountChip from "../AccountChip";

const StyledBox = styled(Box)(({ theme }) => ({
  width: 300,
  height: 300,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: 300,
  margin: "auto",
}));

interface NFTItemProps {
  itemID: number;
  creator: string;
  seller: string;
  name?: string;
  description?: string;
  modelPath?: string;
  backgroundColor?: string;
}

const NFTItem: FC<NFTItemProps> = ({
  itemID,
  creator,
  seller,
  name,
  description,
  modelPath,
  backgroundColor,
}) => {
  const [sellerAvatar, setSellerAvatar] = useState("");

  const formattedDescription =
    description.length > descriptionLength
      ? `${description.slice(0, descriptionLength + 1)}...`
      : description;

  const router = useRouter();

  const handleClickOnNameOrDescription = () => {
    router.push(`/token/${itemID}`);
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/api/account/${seller}`).then((data) => {
      setSellerAvatar(data.data.data.avatar);
    });
  }, [seller]);

  return (
    <Grid item lg={3} md={6} sm={12} xs={12}>
      <StyledCard>
        <StyledBox>
          <NFTTokenWrapper
            modelPath={modelPath}
            backgroundColor={backgroundColor}
          />
        </StyledBox>
        <CardContent>
          <Typography
            gutterBottom
            style={{ cursor: "pointer" }}
            variant="h5"
            onClick={handleClickOnNameOrDescription}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formattedDescription}
          </Typography>
          <AccountChip avatarImage={sellerAvatar} seller={seller} />
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

export default NFTItem;
