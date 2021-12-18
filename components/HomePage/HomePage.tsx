import type { NextPage } from "next";

import { useEffect, useState } from "react";

import { Grid, Box } from "@mui/material";

import NFTItem from "../NFTItem";

import { loadMarketNFTs } from "../../utils/apiHelpers";
import {
  StyledCircularProgressComponent,
  StyledNoItemsComponent,
} from "../styled";

const HomePage: NextPage = () => {
  const [NFTs, setNFTs] = useState([]);
  const [loadingState, setLoadingState] = useState();

  useEffect(() => {
    loadMarketNFTs(setNFTs, setLoadingState);
  }, []);

  if (loadingState !== "loaded")
    return (
      <Box sx={{ display: "flex" }}>
        <StyledCircularProgressComponent />
      </Box>
    );

  return (
    // Max of 16 can be rendered
    <Grid container style={{ paddingTop: "27px" }}>
      <Grid container spacing={4}>
        {NFTs.length <= 0 ? (
          <StyledNoItemsComponent />
        ) : (
          NFTs.map((NFT, i) => {
            return (
              <NFTItem
                key={i}
                itemID={NFT.itemId}
                title={NFT.name}
                description={NFT.description}
                modelPath={NFT.modelPath}
                backgroundColor={NFT.backgroundColor}
              />
            );
          })
        )}
      </Grid>
    </Grid>
  );
};

export default HomePage;
