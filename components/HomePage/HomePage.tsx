import type { NextPage } from "next";

import { Grid } from "@mui/material";

import styled from "@emotion/styled";

import NavBar from "../NavBar";
import HomePageItem from "../HomePageItem";

const Offset = styled("div")(({ theme }) => ({
  margin: 64,
}));

const HomePage: NextPage = () => {
  return (
    <Grid container>
      <NavBar />
      <Offset />
      <Grid container spacing={4}>
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
        <HomePageItem title="Mount Fuji" description="Video Description" />
      </Grid>
    </Grid>
  );
};

export default HomePage;
