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
          title="Walking"
          description="Y Bot Walking"
          modelPath={"/gltf/Y Bot - Walking.glb"}
        />
        <NFTItem
          title="Running"
          description="Y Bot Running"
          modelPath={"/gltf/Y Bot - Running.glb"}
        />
        <NFTItem
          title="Sneaking"
          description="Y Bot Sneaking"
          modelPath={"/gltf/Y Bot - Sneaking.glb"}
        />

        <NFTItem
          title="Idle"
          description="Y Bot Idling"
          modelPath={"/gltf/Y Bot - Idle.glb"}
        />
        <NFTItem
          title="Walking"
          description="Y Bot Walking"
          modelPath={"/gltf/Y Bot - Walking.glb"}
        />
        <NFTItem
          title="Running"
          description="Y Bot Running"
          modelPath={"/gltf/Y Bot - Running.glb"}
        />
        <NFTItem
          title="Sneaking"
          description="Y Bot Sneaking"
          modelPath={"/gltf/Y Bot - Sneaking.glb"}
        />

        <NFTItem
          title="Idle"
          description="Y Bot Idling"
          modelPath={"/gltf/Y Bot - Idle.glb"}
        />
        <NFTItem
          title="Walking"
          description="Y Bot Walking"
          modelPath={"/gltf/Y Bot - Walking.glb"}
        />
        <NFTItem
          title="Running"
          description="Y Bot Running"
          modelPath={"/gltf/Y Bot - Running.glb"}
        />
        <NFTItem
          title="Sneaking"
          description="Y Bot Sneaking"
          modelPath={"/gltf/Y Bot - Sneaking.glb"}
        />

        <NFTItem
          title="Idle"
          description="Y Bot Idling"
          modelPath={"/gltf/Y Bot - Idle.glb"}
        />
        <NFTItem
          title="Walking"
          description="Y Bot Walking"
          modelPath={"/gltf/Y Bot - Walking.glb"}
        />
        <NFTItem
          title="Running"
          description="Y Bot Running"
          modelPath={"/gltf/Y Bot - Running.glb"}
        />
        <NFTItem
          title="Sneaking"
          description="Y Bot Sneaking"
          modelPath={"/gltf/Y Bot - Sneaking.glb"}
        />
      </Grid>
    </Grid>
  );
};

export default HomePage;
