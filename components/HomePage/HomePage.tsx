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
    // Max of 16 can be rendered
    <Grid container>
      <NavBar />
      <Offset />
      <Grid container spacing={4}>
        <NFTItem
          title="Idle"
          description="Y Bot Idling"
          modelPath={"/gltf/Y Bot - Idle.glb"}
        />
        <NFTItem
          title="Idle"
          description="Y Bot Idling"
          modelPath={"/gltf/Y Bot - Idle.glb"}
        />
      </Grid>
    </Grid>
  );
};

export default HomePage;
