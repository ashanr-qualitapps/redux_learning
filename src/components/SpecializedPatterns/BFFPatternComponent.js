import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { HomeButton, BackButton, NextButton } from '../NavigationButtons';

export const BFFPatternComponent = () => {
  const scope = { React, useSelector, useDispatch };

  const bffSetupExample = `
// BFF Layer API Client setup
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create API for the BFF service
export const bffApi = createApi({
  reducerPath: 'bffApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/bff' }),
  endpoints: (builder) => ({
    // Dashboard aggregate endpoint
    getDashboardData: builder.query({
      query: () => 'dashboard',
      // This single endpoint provides data that will populate
      // multiple slices of our Redux store
    }),
    
    // User profile with customized related data
    getUserProfile: builder.query({
      query: (userId) => \`users/\${userId}/profile\`,
    }),
    
    // App-specific action that might involve multiple backend services
    completeCheckout: builder.mutation({
      query: (checkoutData) => ({
        url: 'checkout/complete',
        method: 'POST',
        body: checkoutData
      })
    })
  })
});

export const { 
  useGetDashboardDataQuery, 
  useGetUserProfileQuery,
  useCompleteCheckoutMutation
} = bffApi;

// Usage in a component
const DashboardComponent = () => {
  const { data, isLoading } = useGetDashboardDataQuery();
  
  if (isLoading) return <div>Loading dashboard...</div>;
  
  return (
    <div>
      <UserStats stats={data.userStats} />
      <RecentActivity activity={data.recentActivity} />
      <Recommendations recommendations={data.recommendations} />
    </div>
  );
};

render(<DashboardComponent />);
`;

  const bffArchitectureCode = `
// BFF service implementation (Node.js/Express example)
// This would be a separate backend service, not in your React code

const express = require('express');
const router = express.Router();

// Dashboard aggregate endpoint
router.get('/dashboard', async (req, res) => {
  try {
    // Get user info from authentication service
    const user = await authService.getUser(req.user.id);
    
    // Fetch recent activities from activity service
    const recentActivity = await activityService.getRecentByUser(req.user.id);
    
    // Get product recommendations from recommendation service
    const recommendations = await recommendationService.getForUser(req.user.id);
    
    // Fetch user stats from stats service
    const userStats = await statsService.getUserStats(req.user.id);
    
    // Combine all data into a single response
    res.json({
      userInfo: user,
      recentActivity,
      recommendations,
      userStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
`;

  return (
    <div className="section">
      <HomeButton />
      <h2>Backend-for-Frontend (BFF) Pattern</h2>
      <p>
        The Backend-for-Frontend pattern creates dedicated backend services that are tailored to specific frontend applications.
        When used with Redux, the BFF simplifies API consumption by providing endpoints that perfectly match your state shape.
      </p>
      
      <div className="example-box">
        <h3>Setting Up RTK Query with a BFF</h3>
        <LiveProvider code={bffSetupExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>
      
      <div className="example-box">
        <h3>BFF Implementation Example</h3>
        <LiveProvider code={bffArchitectureCode} scope={scope} noInline={false}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
        </LiveProvider>
      </div>
      
      <h3>Benefits of BFF with Redux</h3>
      <ul>
        <li>Customized endpoints that map directly to your Redux state shape</li>
        <li>Reduced client-side data transformation logic</li>
        <li>Better performance by reducing multiple API calls</li>
        <li>Frontend teams can control their own backend layer</li>
      </ul>
      
      <BackButton />
      <NextButton to="/concepts/rtk-query" label="Next: RTK Query" />
    </div>
  );
};

export default BFFPatternComponent;
