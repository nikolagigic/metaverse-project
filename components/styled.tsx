import { FC } from "react";

import { Grid, CircularProgress, Typography, Link } from "@mui/material";

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

const StyledNoItems = styled(Grid)(({ theme }) => ({
  position: "relative",
  top: "calc(30vh + 54px)",
  "& span": {
    padding: 20,
    border: "solid 1px black",
  },
}));

export const StyledNoItemsComponent = () => (
  <StyledNoItems
    display={"flex"}
    justifyContent={"center"}
    alignContent={"center"}
  >
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

const StyledLink = styled(Link)(({ theme }) => ({
  padding: "0 27px 0 27px",
}));

interface StyledLinkComponentProps {
  children?: React.ReactNode;
  location: string;
}

export const StyledLinkComponent = (props: StyledLinkComponentProps) => {
  const { children, location } = props;

  return (
    <StyledLink
      variant="button"
      href={location}
      color={"inherit"}
      underline="none"
    >
      {children}
    </StyledLink>
  );
};
