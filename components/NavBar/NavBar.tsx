import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box as MUIBox } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Grid } from "@mui/material";

import { styled, alpha } from "@mui/material/styles";

const Box = styled(MUIBox)(({ theme }) => ({
  flexGrow: 1,
}));

const Search = styled("div")(({ theme }) => ({
  flexGrow: 1,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  //   width: "100%",
  maxWidth: 390,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
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
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NavBar = () => {
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Grid sm={0} md={0} lg={4} />
          <Grid container lg={4} sm={10} justifyContent="center">
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
          <Grid container xs={4} justifyContent="end">
            <Button color="inherit">Login</Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
