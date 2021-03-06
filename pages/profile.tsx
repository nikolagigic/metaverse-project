import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

import {
  Avatar,
  Button,
  Grid,
  Box,
  Tab,
  Tabs,
  TextField,
  Typography,
  Tooltip,
  styled,
} from "@mui/material";

import NFTsContainer from "../components/NFTsContainer";
import {
  loadCreatedNFTs,
  loadMyNFTs,
  getAccountDetails,
} from "../utils/apiHelpers";
import { UserDetailsProps } from "../types/types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// @ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const StyledAvatarButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#FFF",
  },
}));

const Profile: NextPage = () => {
  const router = useRouter();

  const [value, setValue] = useState(0);
  const [NFTs, setNFTs] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [accountAddress, setAccountAddress] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetailsProps>();

  useEffect(() => {
    getAccountDetails(setAccountAddress, setUserDetails);
  }, [accountAddress, userDetails?.data.username]);

  const onChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        // @ts-ignore
        progress: (prog: string) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      await axios.put(`http://localhost:3000/api/account/${accountAddress}`, {
        avatar: url,
      });

      router.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await axios.put(`http://localhost:3000/api/account/${accountAddress}`, {
      username: e.target.value,
    });
  };

  useEffect(() => {
    setLoadingState("not-loaded");
    if (value === 0) loadCreatedNFTs(setNFTs, setLoadingState);
    else if (value === 1) loadMyNFTs(setNFTs, setLoadingState);
  }, [value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={4} sx={{ padding: "27px 54px 0 54px" }}>
      <Grid item xs={3} display="flex" flexDirection={"column"}>
        <Grid item display={"flex"} justifyContent={"center"}>
          <Tooltip title="Change Profile Picture">
            {/* @ts-ignore */}
            <StyledAvatarButton component="label">
              <input
                hidden
                type="file"
                name="avatar-image"
                onChange={onChangeAvatar}
              />
              <Avatar
                sx={{ width: 256, height: 256, cursor: "pointer" }}
                src={
                  userDetails?.data.avatar ||
                  "/static/images/profile_avatar.jpg"
                }
              />
            </StyledAvatarButton>
          </Tooltip>
        </Grid>
        <Typography
          variant="h4"
          sx={{ marginTop: 4, borderBottom: "solid 1px black" }}
        >
          {userDetails?.data.username}
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginTop: 4, borderBottom: "solid 1px black" }}
        >
          {userDetails?.data.description}
        </Typography>
        <Typography
          sx={{ marginTop: 4, borderBottom: "solid 1px black" }}
          variant="body2"
        >
          {accountAddress}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab sx={{ color: "black" }} label="Created" {...a11yProps(0)} />
              <Tab sx={{ color: "black" }} label="Owned" {...a11yProps(1)} />
              <Tab sx={{ color: "black" }} label="Follows" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <NFTsContainer NFTs={NFTs} loadingState={loadingState} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <NFTsContainer NFTs={NFTs} loadingState={loadingState} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Creators that user follows
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
