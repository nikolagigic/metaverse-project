import { FC } from "react";

import { CircularProgress, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import NavBar from "./NavBar";

const Offset = styled("div")(({ theme }) => ({
  marginBottom: 56,
}));

export const StyledNavBarComponent = () => {
  return (
    <>
      <NavBar />
      <Offset />
    </>
  );
};

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  position: "relative",
  top: "50vh",
  margin: "auto",
}));

export const StyledCircularProgressComponent = () => (
  <StyledCircularProgress color="inherit" />
);

const StyledNoItems = styled("div")(({ theme }) => ({
  position: "relative",
  top: "40vh",
  margin: "auto",

  "& span": {
    padding: 20,
    border: "solid 1px black",
  },
}));

export const StyledNoItemsComponent = () => (
  <StyledNoItems>
    <span>NO ITEMS</span>
  </StyledNoItems>
);

const StyledTypographyLabel = styled(Typography)(({ theme }) => ({
  paddingLeft: 5,
  paddingRight: 5,
  marginBottom: 10,
  borderBottom: "solid 1px black",
}));

const StyledTypographyText = styled(Typography)(({ theme }) => ({
  paddingLeft: 10,
  paddingRight: 10,
  marginBottom: 20,
  borderBottom: "solid 1px black",
}));

interface StyledNFTPropertiesComponentProps {
  label: string;
  property: string;
}

export const StyledNFTPropertiesComponent: FC<
  StyledNFTPropertiesComponentProps
> = ({ label, property }) => {
  return (
    <>
      <StyledTypographyLabel>{label}</StyledTypographyLabel>
      <StyledTypographyText>{property}</StyledTypographyText>
    </>
  );
};
