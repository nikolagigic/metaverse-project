import { useEffect, useState } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Grid, Button, Typography, CircularProgress } from "@mui/material";

import NFTTokenWrapper from "../../components/TokenRenderer/NFTTokenWrapper";
import {
  StyledCircularProgressComponent,
  StyledNoItemsComponent,
  StyledNFTPropertiesComponent,
} from "../../components/styled";

import { getNFT, buyNft } from "../../utils/apiHelpers";

const Token: NextPage = () => {
  const [NFT, setNFT] = useState<any>();
  const [loadingState, setLoadingState] = useState();
  const [itemIsSold, setItemIsSold] = useState(false);

  const { itemID } = useRouter().query;

  useEffect(() => {
    getNFT(itemID, setNFT, setLoadingState, setItemIsSold);
  }, [itemID]);

  return (
    <Grid container style={{ height: "calc(100vh - 56px)" }}>
      {NFT ? (
        <>
          <Grid item xs={10}>
            <NFTTokenWrapper
              modelPath={NFT.modelPath}
              backgroundColor={NFT.backgroundColor}
            />
          </Grid>
          <Grid item xs={2} textAlign={"center"} style={{ paddingTop: 56 }}>
            <Grid item>
              <StyledNFTPropertiesComponent label="Title" property={NFT.name} />
            </Grid>
            <StyledNFTPropertiesComponent
              label="Description"
              property={NFT.description}
            />
            <StyledNFTPropertiesComponent label="Price" property={NFT.price} />
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
      ) : itemIsSold ? (
        <StyledNoItemsComponent />
      ) : (
        <StyledCircularProgressComponent />
      )}
    </Grid>
  );
};

export default Token;
