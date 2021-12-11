import { useState, useEffect } from "react";

import type { NextPage } from "next";

import {
  styled,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";

import { HexColorPicker } from "react-colorful";

import NFTTokenWrapper from "../components/TokenRenderer/NFTTokenWrapper";

const StyledToolsWrapper = styled(Grid)(({ theme }) => ({
  maxHeight: "100%",
  color: blueGrey["A200"],
  backgroundColor: blueGrey["A700"],
}));

const StyledToolWrapper = styled(Grid)(({ theme }) => ({
  paddingBottom: 20,
  borderBottom: "solid 1px black",
}));

const StyledToolName = styled("div")(({ theme }) => ({
  paddingBottom: 15,
  paddingTop: 20,
}));

const StyledHexColorPicker = styled(HexColorPicker)(({ theme }) => ({
  margin: "auto",
}));

const Studio: NextPage = () => {
  const [backgroundColor, setBackgroundColor] = useState("#eeeeee");
  const [pointLight1, setPointLight1] = useState(true);
  const [pointLight2, setPointLight2] = useState(true);
  const [pointLight3, setPointLight3] = useState(true);

  console.log(backgroundColor);

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={10}>
        <NFTTokenWrapper
          modelPath={"/gltf/Y Bot - Idle.glb"}
          backgroundColor={backgroundColor}
        />
      </Grid>
      <StyledToolsWrapper item xs={2} textAlign={"center"}>
        <StyledToolWrapper item>
          <StyledToolName>Background Color</StyledToolName>
          <StyledHexColorPicker
            color={backgroundColor}
            onChange={setBackgroundColor}
          />
        </StyledToolWrapper>
      </StyledToolsWrapper>
    </Grid>
  );
};

export default Studio;
