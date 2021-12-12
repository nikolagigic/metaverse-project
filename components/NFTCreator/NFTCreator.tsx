import { useState } from "react";

import { styled, Grid, Button, TextField } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import SaveIcon from "@mui/icons-material/Save";

import { HexColorPicker } from "react-colorful";
import { create as ipfsHttpClient } from "ipfs-http-client";

import NFTTokenWrapper from "../TokenRenderer";

import { createNFTObject } from "../../utils/apiHelpers";

// @ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const StyledToolsWrapper = styled(Grid)(({ theme }) => ({
  maxHeight: "100%",
  backgroundColor: blueGrey["100"],
}));

const StyledToolWrapper = styled(Grid)(({ theme }) => ({
  paddingTop: 30,
  paddingBottom: 30,
  borderBottom: "solid 1px black",
}));

const StyledToolName = styled("div")(({ theme }) => ({
  paddingBottom: 15,
  paddingTop: 20,
}));

const StyledHexColorPicker = styled(HexColorPicker)(({ theme }) => ({
  margin: "auto",
}));

const StyledInput = styled(Grid)(({ theme }) => ({
  backgroundColor: "black",
  color: "white",
  height: "calc(100vh - 56px)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: 20,
}));

const StyledUploadButton = styled(Button)(({ theme }) => ({
  margin: "auto",
}));

const NFTCreator = () => {
  const [modelUrl, setModelUrl] = useState(null);
  const [NFTDetails, setNFTDetails] = useState({
    name: "",
    description: "",
    addedPrice: "",
  });
  const [backgroundColor, setBackgroundColor] = useState("#131010");

  const onChangeModel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        // @ts-ignore
        progress: (prog: string) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setModelUrl(url);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid container style={{ height: "calc(100vh - 56px)" }}>
      <Grid item xs={10}>
        {modelUrl ? (
          <NFTTokenWrapper
            modelPath={modelUrl}
            backgroundColor={backgroundColor}
          />
        ) : (
          <StyledInput item xs={12} display="flex" justifyContent="center">
            <StyledUploadButton
              variant="contained"
              // @ts-ignore
              component="label"
              color="secondary"
              size="large"
              startIcon={<SaveIcon />}
            >
              Upload NFT
              <input
                type="file"
                name="Asset NFT"
                hidden
                onChange={onChangeModel}
              />
            </StyledUploadButton>
          </StyledInput>
        )}
      </Grid>
      <StyledToolsWrapper item xs={2} textAlign={"center"}>
        <StyledToolWrapper>
          <TextField
            required
            id="nft-name"
            label="Name"
            variant="standard"
            color="secondary"
            onChange={(e) => {
              setNFTDetails({ ...NFTDetails, name: e.target.value });
            }}
          />
        </StyledToolWrapper>
        <StyledToolWrapper>
          <TextField
            required
            multiline
            id="nft-name"
            label="Description"
            variant="standard"
            color="secondary"
            onChange={(e) => {
              setNFTDetails({ ...NFTDetails, description: e.target.value });
            }}
          />
        </StyledToolWrapper>
        <StyledToolWrapper>
          <TextField
            required
            id="nft-name"
            label="Price"
            variant="standard"
            color="secondary"
            onChange={(e) => {
              setNFTDetails({ ...NFTDetails, addedPrice: e.target.value });
            }}
          />
        </StyledToolWrapper>
        <StyledToolWrapper item>
          <StyledToolName>Background Color</StyledToolName>
          <StyledHexColorPicker
            color={backgroundColor}
            onChange={setBackgroundColor}
          />
        </StyledToolWrapper>
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={() =>
            createNFTObject(
              NFTDetails.name,
              NFTDetails.description,
              NFTDetails.addedPrice,
              modelUrl,
              backgroundColor
            )
          }
        >
          Create NFT
        </StyledButton>
      </StyledToolsWrapper>
    </Grid>
  );
};

export default NFTCreator;
