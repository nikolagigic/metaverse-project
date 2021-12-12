import { useEffect, useState } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Grid, Button, Typography, CircularProgress } from "@mui/material";

import { styled } from "@mui/material/styles";

import NFTTokenWrapper from "../../components/TokenRenderer/NFTTokenWrapper";

import { getNFT, buyNft } from "../../utils/apiHelpers";

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  position: "relative",
  top: "50vh",
  margin: "auto",
}));

const Token: NextPage = () => {
  const [NFT, setNFT] = useState<any>();
  const [loadingState, setLoadingState] = useState();

  const { itemID } = useRouter().query;

  useEffect(() => {
    getNFT(itemID, setNFT, setLoadingState);
  }, [itemID]);

  return (
    <Grid container style={{ height: "100vh" }}>
      {NFT && (
        <>
          <Grid item xs={10}>
            <NFTTokenWrapper
              modelPath={NFT.model}
              backgroundColor={NFT.backgroundColor}
            />
          </Grid>
          <Grid item xs={2} textAlign={"center"}>
            <Typography gutterBottom>{NFT.name}</Typography>
            <Typography gutterBottom>{NFT.description}</Typography>
            <Typography gutterBottom>{NFT.price}</Typography>
            <Button
              variant="contained"
              onClick={() => {
                buyNft(NFT);
              }}
            >
              BUY
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Token;
