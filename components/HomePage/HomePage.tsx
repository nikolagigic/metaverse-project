import type { NextPage } from "next";

import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";

import NavBar from "../NavBar";
import NFTItem from "../NFTItem";

const Offset = styled("div")(({ theme }) => ({
  margin: 56,
}));

const HomePage: NextPage = () => {
  return (
    <Grid container>
      <NavBar />
      <Offset />
      <Grid container spacing={4}>
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
        <NFTItem title="Mount Fuji" description="Video Description" />
      </Grid>
    </Grid>
  );
};

export default HomePage;
