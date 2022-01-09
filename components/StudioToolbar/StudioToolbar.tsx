import { FC, useState, Dispatch, SetStateAction } from "react";

import { useRouter } from "next/router";

import { ChromePicker } from "react-color";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { TextField, Button, InputAdornment, Typography } from "@mui/material";

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
  const router = useRouter();

  const helperTextValue = "This field is required";

  const [nameValidator, setNameValidator] = useState({
    error: false,
    helperText: " ",
  });
  const [descriptionValidator, setDescriptionValidator] = useState({
    error: false,
    helperText: " ",
  });
  const [priceValidator, setPriceValidator] = useState({
    error: false,
    helperText: " ",
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.paper",
        display: "flex",
      }}
      justifyContent={"center"}
    >
      <List>
        <ListItem>
          <StyledInput
            required
            error={nameValidator.error}
            helperText={nameValidator.helperText}
            label="Name"
            variant="standard"
            inputProps={{ maxLength: 12 }}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "")
                setNameValidator({ error: true, helperText: helperTextValue });
              else setNameValidator({ error: false, helperText: " " });

              setNFTDetails({ ...NFTDetails, name: e.target.value });
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            required
            multiline
            error={descriptionValidator.error}
            helperText={descriptionValidator.helperText}
            sx={{ width: "100%" }}
            label="Description"
            variant="outlined"
            rows={16}
            inputProps={{ maxLength: 1024 }}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "")
                setNameValidator({ error: true, helperText: helperTextValue });
              else setNameValidator({ error: false, helperText: " " });

              setNFTDetails({ ...NFTDetails, description: e.target.value });
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            required
            error={priceValidator.error}
            helperText={priceValidator.helperText}
            id={"nft-price"}
            sx={{ margin: "auto" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
            }}
            variant="standard"
            label="Price"
            onChange={(e) => {
              const value = e.target.value;

              if (value === "")
                setNameValidator({ error: true, helperText: helperTextValue });
              else setNameValidator({ error: false, helperText: " " });

              setNFTDetails({ ...NFTDetails, addedPrice: value });
            }}
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
              NFTDetails.name === "" &&
                setNameValidator({ error: true, helperText: helperTextValue });
              NFTDetails.description === "" &&
                setDescriptionValidator({
                  error: true,
                  helperText: helperTextValue,
                });
              NFTDetails.addedPrice === "" &&
                setPriceValidator({ error: true, helperText: helperTextValue });

              createNFTObject(
                NFTDetails.name,
                NFTDetails.description,
                NFTDetails.addedPrice,
                NFTDetails.modelURL,
                backgroundColor,
                router
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
