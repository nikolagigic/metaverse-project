import type { NextPage } from "next";

import { useState, useEffect } from "react";

import Image from "next/image";

import { Grid, Box, Tab, Tabs, Typography } from "@mui/material";

import NFTsContainer from "../components/NFTsContainer";

import { loadCreatedNFTs, loadMyNFTs } from "../utils/apiHelpers";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Profile: NextPage = () => {
  const [value, setValue] = useState(0);
  const [NFTs, setNFTs] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    console.log(">>> rerendered");
    console.log(">>> nfts: ", NFTs);
    switch (value) {
      case 0:
        loadCreatedNFTs(setNFTs, setLoadingState);
      case 1:
        loadMyNFTs(setNFTs, setLoadingState);
    }
  }, [value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(">>> newValue: ", newValue);
  };

  return (
    <Grid container spacing={4} style={{ padding: "27px 54px 0 54px" }}>
      <Grid item xs={3} display="flex" flexDirection={"column"}>
        <Grid item>
          <Image
            width={256}
            height={256}
            alt="profileImage"
            src={"/static/images/profile_avatar.jpg"}
          />
        </Grid>
        <Typography>Name</Typography>
        <Typography>Description</Typography>
        <Typography>Wallet Address</Typography>
      </Grid>
      <Grid item xs={9}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Created" {...a11yProps(0)} />
              <Tab label="Owned" {...a11yProps(1)} />
              <Tab label="Follows" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <NFTsContainer NFTs={NFTs} loadingState={loadingState} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <NFTsContainer NFTs={NFTs} loadingState={loadingState} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <NFTsContainer NFTs={NFTs} loadingState={loadingState} />
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
