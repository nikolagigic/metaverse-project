import { FC } from "react";

import { Box, Button, Typography } from "@mui/material";

interface PaginatorProps {
  pageCount: number;
  pages: number[];
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const Paginator: FC<PaginatorProps> = ({
  pageCount,
  pages,
  currentPage,
  setCurrentPage,
}) => {
  console.log(">>> current page: ", currentPage);
  return (
    <Box
      sx={{
        width: 350,
        paddingBottom: 1,
        paddingTop: 2,
        color: "white",
        textAlign: "center",
        backgroundColor: "#121212",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      }}
    >
      {currentPage !== 1 ? (
        <Button
          sx={{ color: "white" }}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {"<"}
        </Button>
      ) : (
        <Button disabled />
      )}
      {currentPage !== 1 ? (
        <>
          <Button sx={{ color: "white" }} onClick={() => setCurrentPage(1)}>
            {"1"}
          </Button>
        </>
      ) : (
        <Button disabled />
      )}
      <Button>
        <Typography sx={{ fontWeight: 600, color: "white" }} fontSize={20}>
          {currentPage}
        </Typography>
      </Button>
      {currentPage !== pages.length ? (
        <Button
          sx={{ color: "white" }}
          onClick={() => setCurrentPage(pages.length)}
        >
          {pages.length}
        </Button>
      ) : (
        <Button disabled />
      )}
      {currentPage < pageCount ? (
        <Button
          sx={{ color: "white" }}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {">"}
        </Button>
      ) : (
        <Button disabled />
      )}
    </Box>
  );
};

export default Paginator;
