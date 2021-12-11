import type { NextPage } from "next";

import { useEffect, useState } from "react";

import { Grid, Box, CircularProgress } from "@mui/material";

import { styled } from "@mui/material/styles";

import NavBar from "../NavBar";
import NFTItem from "../NFTItem";

import { loadMarketNFTs } from "../../utils/apiHelpers";

const Offset = styled("div")(({ theme }) => ({
  margin: 56,
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  position: "relative",
  top: "50vh",
  margin: "auto",
}));

const HomePage: NextPage = () => {
  const [NFTs, setNFTs] = useState();
  const [loadingState, setLoadingState] = useState();

  useEffect(() => {
    loadMarketNFTs(setNFTs, setLoadingState);
  }, []);

  if (loadingState !== "loaded")
    return (
      <Box sx={{ display: "flex" }}>
        <StyledCircularProgress color="inherit" />
      </Box>
    );

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
