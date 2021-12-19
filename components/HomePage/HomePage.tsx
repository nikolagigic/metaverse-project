import type { NextPage } from "next";

import { useEffect, useState } from "react";

import { Grid, Box } from "@mui/material";

import NFTsContainer from "../NFTsContainer";

import {
  loadMarketNFTs,
  getTokenValue,
  getNikolaTokenValue,
} from "../../utils/apiHelpers";
import {
  StyledCircularProgressComponent,
  StyledNoItemsComponent,
} from "../styled";

const HomePage: NextPage = () => {
  const [NFTs, setNFTs] = useState([]);
  const [loadingState, setLoadingState] = useState();

  useEffect(() => {
    loadMarketNFTs(setNFTs, setLoadingState);
    getNikolaTokenValue();
  }, []);

  if (loadingState !== "loaded")
    return (
      <Box sx={{ display: "flex" }}>
        <StyledCircularProgressComponent />
      </Box>
    );

  if (NFTs.length === 0) return <StyledNoItemsComponent />;

  return (
    // Max of 16 can be rendered
    <Grid container style={{ paddingTop: "54px" }}>
      <Grid container spacing={4}>
        <NFTsContainer NFTs={NFTs} />
      </Grid>
    </Grid>
  );
};

export default HomePage;
