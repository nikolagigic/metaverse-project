import type { NextPage } from "next";

import { useEffect, useState } from "react";

import { Grid, Box, CircularProgress, TextField } from "@mui/material";

import { styled } from "@mui/material/styles";

import NavBar from "../NavBar";
import NFTItem from "../NFTItem";

import { loadMarketNFTs } from "../../utils/apiHelpers";

const Offset = styled("div")(({ theme }) => ({
  margin: 56,
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  position: "relative",
  top: "50vh",
  margin: "auto",
}));

const HomePage: NextPage = () => {
  const [NFTs, setNFTs] = useState([]);
  const [loadingState, setLoadingState] = useState();

  useEffect(() => {
    loadMarketNFTs(setNFTs, setLoadingState);
  }, []);

  if (loadingState !== "loaded")
    return (
      <Box sx={{ display: "flex" }}>
        <StyledCircularProgress color="inherit" />
      </Box>
    );

  if (NFTs.length <= 0)
    return (
      <Box sx={{ display: "flex" }}>
        <TextField variant="outlined" label="NO ITEMS" />
      </Box>
    );

  return (
    // Max of 16 can be rendered
    <Grid container>
      <NavBar />
      <Offset />
      <Grid container spacing={4}>
        {NFTs.map((NFT, i) => {
          return (
            <NFTItem
              key={i}
              itemID={NFT.itemId}
              title={NFT.name}
              description={NFT.description}
              modelPath={NFT.model}
              backgroundColor={NFT.backgroundColor}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default HomePage;
