import { CircularProgress } from "@mui/material";

import { styled } from "@mui/material/styles";

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
