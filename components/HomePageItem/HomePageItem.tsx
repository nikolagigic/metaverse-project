import { FC } from "react";
import { NextPage } from "next";
import styled from "@emotion/styled";

import { Grid } from "@mui/material";
import {
  Card as MUICard,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const Card = styled(MUICard)(({ theme }) => ({
  width: 300,
  margin: "auto",
}));

interface HomePageItemProps {
  title?: string;
  description?: string;
  previewImage?: ImageData;
  videoUrl?: URL;
}

const HomePageItem: FC<HomePageItemProps> = ({
  title,
  description,
  previewImage,
  videoUrl,
}) => {
  return (
    <Grid item lg={3} md={6} sm={12} xs={12}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HomePageItem;
