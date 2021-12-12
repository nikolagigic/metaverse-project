import { FC } from "react";

import { styled } from "@mui/material/styles";

import { Grid, Box, Card, CardContent, Typography } from "@mui/material";

import { descriptionLength } from "./constants";

import NFTTokenWrapper from "../TokenRenderer/NFTTokenWrapper";

const StyledBox = styled(Box)(({ theme }) => ({
  width: 300,
  height: 300,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: 300,
  margin: "auto",
}));

interface NFTItemProps {
  title?: string;
  description?: string;
  modelPath?: string;
  backgroundColor?: string;
}

const NFTItem: FC<NFTItemProps> = ({
  title,
  description,
  modelPath,
  backgroundColor,
}) => {
  const formattedDescription =
    description.length > descriptionLength
      ? `${description.slice(0, descriptionLength + 1)}...`
      : description;

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
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formattedDescription}
          </Typography>
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

export default NFTItem;
