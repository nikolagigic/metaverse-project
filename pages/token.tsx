import type { NextPage } from "next";

import { Grid } from "@mui/material";

import NFTTokenWrapper from "../components/TokenRenderer/NFTTokenWrapper";

const Token: NextPage = () => {
  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={12}>
        <NFTTokenWrapper modelPath={"/gltf/Y Bot - Idle.glb"} />
      </Grid>
    </Grid>
  );
};

export default Token;
