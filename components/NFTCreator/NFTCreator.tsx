import { useState } from "react";

import { styled, Grid, Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { create as ipfsHttpClient } from "ipfs-http-client";

import NFTTokenWrapper from "../TokenRenderer";

import StudioToolbar from "../StudioToolbar";

// @ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const StyledInput = styled(Grid)(({ theme }) => ({
  backgroundColor: "black",
  height: "calc(100vh - 56px)",
}));

const StyledUploadButton = styled(Button)(({ theme }) => ({
  margin: "auto",
}));

const NFTCreator = () => {
  const [modelUrl, setModelUrl] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#131010");
  const [NFTDetails, setNFTDetails] = useState({
    name: "",
    description: "",
    addedPrice: "",
    modelURL: "",
  });

  const onChangeModel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        // @ts-ignore
        progress: (prog: string) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      // setModelUrl(url);
      setNFTDetails({ ...NFTDetails, modelURL: url });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid container sx={{ height: "calc(100vh - 56px)", overflow: "auto" }}>
      <Grid item xs={10}>
        {NFTDetails.modelURL ? (
          <NFTTokenWrapper
            modelPath={NFTDetails.modelURL}
            backgroundColor={backgroundColor}
          />
        ) : (
          <StyledInput item display="flex" justifyContent="center">
            <StyledUploadButton
              variant="contained"
              // @ts-ignore
              component="label"
              color="primary"
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
      <Grid item xs={2}>
        <StudioToolbar
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          NFTDetails={NFTDetails}
          setNFTDetails={setNFTDetails}
        />
      </Grid>
    </Grid>
  );
};

export default NFTCreator;
