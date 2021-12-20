import { FC } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { TextField, Button, Typography } from "@mui/material";

import { buyNft } from "../../utils/apiHelpers";

import { styled } from "@mui/material";

interface StudioToolbarProps {
  NFT: {
    tokenID: string;
    name: string;
    description: string;
    price: string;
  };
}

const BasicList: FC<StudioToolbarProps> = ({ NFT }) => {
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
          <Typography color={"white"}>{NFT.name}</Typography>
        </ListItem>
        <ListItem>
          <Typography color={"white"}>{NFT.description}</Typography>
        </ListItem>
        <ListItem>
          <Typography color={"white"}>{NFT.price}</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Button
            onClick={() => {
              buyNft(NFT);
            }}
            sx={{ margin: "auto" }}
            variant="contained"
            color="primary"
          >
            BUY
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

export default BasicList;
