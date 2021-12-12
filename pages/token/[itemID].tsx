import { useEffect, useState } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Grid, Box, CircularProgress } from "@mui/material";

import { styled } from "@mui/material/styles";

import NFTTokenWrapper from "../../components/TokenRenderer/NFTTokenWrapper";

import { getNFT } from "../../utils/apiHelpers";

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  position: "relative",
  top: "50vh",
  margin: "auto",
}));

const Token: NextPage = () => {
  const [NFT, setNFT] = useState();
  const [loadingState, setLoadingState] = useState();

  const { itemID } = useRouter().query;

  useEffect(() => {
    getNFT(itemID, setNFT, setLoadingState);
  }, [itemID]);

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={12}>
        {NFT && (
          <NFTTokenWrapper
            modelPath={NFT.model}
            backgroundColor={NFT.backgroundColor}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Token;
