import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { fetchFromApi } from "../utils/fetchFromApi.js";
import { useParams } from "react-router-dom";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const {searchTerm} = useParams();

  useEffect(() => {
    fetchFromApi(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data?.items || []))  // Fallback to empty array
      .catch(() => setVideos([]));  // In case of error, set to empty array
  }, [searchTerm]);
  

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          Search Results for: <span style={{ color: "#FC1503" }}>{searchTerm}</span>
        </Typography>

        <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;