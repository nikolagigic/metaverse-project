import { FC } from "react";

import { Grid } from "@mui/material";

import NFTItem from "../NFTItem";

import {
  StyledNoItemsComponent,
  StyledCircularProgressComponent,
} from "../styled";

interface NFTProps {
  itemID: number;
  creator: string;
  seller: string;
  modelPath: "string";
}

interface Props {
  NFTs: NFTProps[];
  loadingState?: string;
}

const NFTsContainer: FC<Props> = ({ NFTs, loadingState }) => {
  if (NFTs.length === 0) return <StyledNoItemsComponent />;

  console.log(">>> NFTs: ", NFTs);

  if (loadingState === "not-loaded") return <StyledCircularProgressComponent />;

  return (
    <Grid container display={"flex"} justifyContent={"center"}>
      {NFTs.map((NFT, i) => (
        <NFTItem key={i} {...NFT} />
      ))}
    </Grid>
  );
};

export default NFTsContainer;
