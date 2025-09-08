import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Videos, ChannelCard } from './';
import { fetchFromApi } from '../utils/fetchFromApi';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch channel details
    fetchFromApi(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

    // Fetch videos by channel ID
    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id]);

  return (
    <Box>
      {/* Display Channel Information */}
      {channelDetail && (
        <Box>
          <ChannelCard channelDetail={channelDetail} />
        </Box>
      )}

      {/* Display Videos from the Channel */}
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: 'white' }}>
          Videos
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
