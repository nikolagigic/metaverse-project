import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box as MUIBox, Avatar, Chip } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Grid, Link } from "@mui/material";

import { styled, alpha } from "@mui/material/styles";

import AccountChip from "../AccountChip";

import { StyledLinkComponent } from "../styled";

const Box = styled(MUIBox)(({ theme }) => ({
  flexGrow: 1,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "40ch",
    [theme.breakpoints.down("sm")]: {
      width: "23ch",
    },
  },
}));

const NavBar = () => {
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justifyContent="start">
            <AccountChip />
          </Grid>

          <Grid container justifyContent={"center"}>
            <StyledLinkComponent location="/">MARKETPLACE</StyledLinkComponent>
            {/* <StyledLinkComponent location="/profile">
              PROFILE
            </StyledLinkComponent> */}
            <StyledLinkComponent location="/studio">STUDIO</StyledLinkComponent>
          </Grid>
          <Grid container justifyContent="end">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
