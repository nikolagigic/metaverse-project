import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Grid } from "@mui/material";

import NFTTokenWrapper from "../../components/TokenRenderer/NFTTokenWrapper";

const Token: NextPage = () => {
  const { tokenID } = useRouter().query;

  console.log(">>> query: ", tokenID);

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={12}>
        <NFTTokenWrapper modelPath={"/gltf/Y Bot - Idle.glb"} />
      </Grid>
    </Grid>
  );
};

export default Token;
