import { FC } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Grid, Button, Typography } from "@mui/material";

import { buyNft } from "../../utils/apiHelpers";

import { styled } from "@mui/material";
import { borderColor } from "@mui/system";

const StyledTypography = styled(Typography)(({ theme }) => ({
  width: 217,
  color: 'white',
  fontSize: 'inherit',
  paddingBottom: 4,
}))

const StyledDescription = styled(Typography)(({ theme }) => ({
  width: 260,
  minHeight: 368,
  fontWeight: 400,
  color: 'white',
  fontSize: 'inherit',
  padding: '16.5px 14px 16.5px 14px',
  borderRadius: 4,
  border: 'solid 1px rgba(255, 255, 255, .7)'
}))

const StyledPriceValue = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, .7)',
  fontSize: 'inherit',
  paddingBottom: 4,
  float: 'right'
})) 

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
        width: '100%',
        height: "100%",
        bgcolor: "background.paper",
        display: "flex",
      }}
      justifyContent={"center"}
    >
      <List>
        <ListItem>
          <Box sx={{margin:'auto'}}>
            <Typography fontSize={'0.75rem'} color={'white'} sx={{opacity: 0.7}}>Name</Typography>
            <StyledTypography sx={{borderBottom: 'solid 1px rgba(255, 255, 255, .7)'}}>{NFT.name}</StyledTypography>
          </Box>
        </ListItem>
        <ListItem>
          <Box>
            <Typography fontSize={'0.75rem'} color={'rgba(255, 255, 255, .7)'} sx={{position: 'absolute', marginLeft: 1, marginTop: -1.55, padding: 0.5, backgroundColor: '#121212'}} component={'label'}>Description</Typography>
            <StyledDescription>{NFT.description}</StyledDescription>
          </Box>
        </ListItem>
        <ListItem>
        <Box sx={{margin:'auto', borderBottom: 'solid 1px rgba(255, 255, 255, .7)'}}>
          <Typography fontSize={'0.75rem'} color={'white'} sx={{opacity: 0.7}} component={'label'}>Price</Typography>
          <Grid container>
            <Grid item xs={10}>
              <StyledTypography>{NFT.price}</StyledTypography>
            </Grid>
            <Grid item xs={2}>
              <StyledPriceValue>ETH</StyledPriceValue>
            </Grid>
          </Grid>
          </Box>
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
