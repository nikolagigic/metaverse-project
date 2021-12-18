import { FC } from "react";

import { Grid } from "@mui/material";

import NFTItem from "../NFTItem";

import { StyledNoItemsComponent } from "../styled";

interface NFTProps {
  itemID: number;
  modelPath: "string";
}

interface Props {
  NFTs: NFTProps[];
  loadingState: string;
}

const NFTsContainer: FC<Props> = ({ NFTs, loadingState }) => {
  if (NFTs.length === 0) return <StyledNoItemsComponent />;

  console.log(">>> NFTs: ", NFTs);

  return (
    <Grid container spacing={8}>
      {NFTs.map((NFT, i) => (
        <NFTItem key={i} {...NFT} />
      ))}
    </Grid>
  );
};

export default NFTsContainer;
