import { FC, useState, Dispatch, SetStateAction } from "react";

import { ChromePicker } from "react-color";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { TextField, Button, InputAdornment } from "@mui/material";

import { createNFTObject } from "../../utils/apiHelpers";

import { styled } from "@mui/material";

const StyledInput = styled(TextField)(({ theme }) => ({
  margin: "auto",
}));

interface StudioToolbarProps {
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
  NFTDetails: {
    name: string;
    description: string;
    addedPrice: string;
    modelURL: string;
  };
  setNFTDetails: (value: {
    name: string;
    description: string;
    addedPrice: string;
    modelURL: string;
  }) => void;
}

const BasicList: FC<StudioToolbarProps> = ({
  backgroundColor,
  setBackgroundColor,
  NFTDetails,
  setNFTDetails,
}) => {
  return (
    <Box
      sx={{
        maxWidth: 360,
        height: "100%",
        bgcolor: "background.paper",
        display: "flex",
      }}
      justifyContent={"center"}
    >
      <List>
        <ListItem>
          <StyledInput
            label="Name"
            variant="standard"
            inputProps={{ maxLength: 12 }}
            onChange={(e) =>
              setNFTDetails({ ...NFTDetails, name: e.target.value })
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            multiline
            sx={{ width: "100%" }}
            label="Description"
            variant="outlined"
            rows={16}
            inputProps={{ maxLength: 1024 }}
            onChange={(e) =>
              setNFTDetails({ ...NFTDetails, description: e.target.value })
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            id={"nft-price"}
            sx={{ margin: "auto" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
            }}
            variant="standard"
            label="Price"
            onChange={(e) =>
              setNFTDetails({ ...NFTDetails, addedPrice: e.target.value })
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ChromePicker
            color={backgroundColor}
            disableAlpha={true}
            onChange={(e) => setBackgroundColor(e.hex)}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <Button
            onClick={() => {
              createNFTObject(
                NFTDetails.name,
                NFTDetails.description,
                NFTDetails.addedPrice,
                NFTDetails.modelURL,
                backgroundColor
              );
            }}
            sx={{ margin: "auto" }}
            variant="contained"
            color="primary"
          >
            CREATE
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

export default BasicList;
