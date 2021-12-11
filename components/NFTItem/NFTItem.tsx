import { FC } from "react";

import { styled } from "@mui/material/styles";

import { Grid, Box, Card, CardContent, Typography } from "@mui/material";

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
}

const NFTItem: FC<NFTItemProps> = ({ title, description, modelPath }) => {
  return (
    <Grid item lg={3} md={6} sm={12} xs={12}>
      <StyledCard>
        <StyledBox>
          <NFTTokenWrapper modelPath={modelPath} backgroundColor={"#fcfcfc"} />
        </StyledBox>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

export default NFTItem;
