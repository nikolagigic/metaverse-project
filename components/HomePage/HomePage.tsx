import type { NextPage } from "next";

import { useEffect, useState } from "react";

import { Grid } from "@mui/material";

import NFTsContainer from "../NFTsContainer";
import Paginator from "../Paginator";

import { loadMarketNFTs, getNikolaTokenValue } from "../../utils/apiHelpers";
import { StyledNoItemsComponent } from "../styled";

const HomePage: NextPage = () => {
  const [NFTs, setNFTs] = useState([]);
  const [loadingState, setLoadingState] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadMarketNFTs(setNFTs, setLoadingState, setPageCount, currentPage);
    getNikolaTokenValue();
  }, [currentPage]);

  useEffect(() => {
    setPages(() => {
      const newPages: number[] = [];
      for (let page = 0; page < pageCount; page++) {
        newPages.push(page + 1);
      }
      return [...newPages];
    });
  }, [pageCount]);

  if (NFTs.length === 0) return <StyledNoItemsComponent />;

  return (
    // Max of 16 can be rendered
    <Grid container style={{ paddingTop: "54px" }}>
      <Grid container spacing={4}>
        <NFTsContainer NFTs={NFTs} />
      </Grid>
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        sx={{
          position: "fixed",
          bottom: 0,
        }}
      >
        <Paginator
          pageCount={pageCount}
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Grid>
    </Grid>
  );
};

export default HomePage;
