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
  loadingState?: string;
}

const NFTsContainer: FC<Props> = ({ NFTs, loadingState }) => {
  if (NFTs.length === 0) return <StyledNoItemsComponent />;

  return (
    <Grid container spacing={4} display={"flex"} justifyContent={"center"}>
      {NFTs.map((NFT, i) => (
        <NFTItem key={i} {...NFT} />
      ))}
    </Grid>
  );
};

export default NFTsContainer;
