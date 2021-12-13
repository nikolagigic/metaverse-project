import type { NextPage } from "next";

import { useState } from "react";

import Image from "next/image";

import { Grid, Box, Tab, Tabs, Typography } from "@mui/material";

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Grid container spacing={4} style={{ padding: "27px 54px 0 54px" }}>
      <Grid item xs={4} display="flex" flexDirection={"column"}>
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
      <Grid item xs={8}>
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
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
