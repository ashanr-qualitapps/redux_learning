import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { HomeButton, BackButton } from '../NavigationButtons';

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

// User-specific profile endpoint with joined data
router.get('/users/:userId/profile', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Run multiple backend queries in parallel
    const [user, orders, preferences, notifications] = await Promise.all([
      userService.getUser(userId),
      orderService.getUserOrders(userId),
      preferenceService.getUserPreferences(userId),
      notificationService.getPendingNotifications(userId)
    ]);
    
    // Transform and combine data specific to your frontend needs
    res.json({
      profile: {
        ...user,
        preferenceSettings: preferences,
        notificationCount: notifications.length
      },
      recentOrders: orders.slice(0, 3)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
`;

  const normalSliceExample = `
// Normal Redux slice for individual services approach
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action for user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  }
);

// Action for user orders
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (userId) => {
    const response = await fetch(\`/api/orders?userId=\${userId}\`);
    return response.json();
  }
);

// Action for notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetch',
  async (userId) => {
    const response = await fetch(\`/api/notifications?userId=\${userId}\`);
    return response.json();
  }
);

// You'd need to dispatch all three actions separately
// and manage loading states for each one individually
`;

  return (
    <div className="section">
      <HomeButton />
      <h2>Backend-for-Frontend (BFF) Pattern with Redux</h2>
      <p>
        The Backend-for-Frontend (BFF) pattern is an architectural approach where you create 
        backend services specifically tailored to your frontend application's needs. When combined 
        with Redux, this pattern provides a powerful way to optimize API communication and simplify 
        your Redux state management.
      </p>

      <div className="subsection">
        <h3>What is the BFF Pattern?</h3>
        <p>
          The Backend-for-Frontend pattern involves creating a dedicated backend service layer that:
        </p>
        <ul>
          <li>Is optimized for a specific frontend application or client type</li>
          <li>Aggregates data from multiple backend services</li>
          <li>Transforms data into exactly the shape needed by the frontend</li>
          <li>Handles authentication, authorization, and other cross-cutting concerns</li>
          <li>Provides tailored endpoints that map closely to UI needs</li>
        </ul>

        <div className="diagram">
          <h4>Traditional API Approach vs BFF Pattern</h4>
          <div className="architecture-diagram">
            <div className="traditional">
              <h5>Traditional Approach</h5>
              <pre>
{`Frontend App
    │
    ├─► User Service API
    │
    ├─► Order Service API
    │
    ├─► Product Service API
    │
    └─► Notification Service API`}
              </pre>
              <p><small>Multiple API calls, different formats, aggregation on client</small></p>
            </div>
            <div className="bff">
              <h5>BFF Pattern</h5>
              <pre>
{`Frontend App
    │
    └─► Frontend-specific BFF API
        │
        ├─► User Service API
        │
        ├─► Order Service API
        │
        ├─► Product Service API
        │
        └─► Notification Service API`}
              </pre>
              <p><small>Single API tailored for the frontend, aggregation on server</small></p>
            </div>
          </div>
        </div>
      </div>

      <div className="subsection">
        <h3>Benefits of BFF with Redux</h3>
        <ul>
          <li><strong>Reduced API Calls:</strong> Get all needed data in fewer requests</li>
          <li><strong>Simplified State Management:</strong> Fewer actions and reducers needed</li>
          <li><strong>Performance Optimization:</strong> Less client-side data processing</li>
          <li><strong>Better Developer Experience:</strong> API tailored to UI requirements</li>
          <li><strong>Separation of Concerns:</strong> Backend handles aggregation logic</li>
          <li><strong>Efficient Data Loading:</strong> Only fetch what's needed for specific views</li>
        </ul>
      </div>

      <div className="subsection">
        <h3>Implementing BFF with Redux Toolkit Query</h3>
        <p>
          Redux Toolkit Query is particularly well-suited for working with BFF APIs. 
          Here's how to implement this pattern:
        </p>

        <LiveProvider code={bffSetupExample} scope={scope} noInline={true}>
          <div className="live-editor-container">
            <LiveEditor />
          </div>
          <LiveError />
          <LivePreview />
        </LiveProvider>

        <div className="code-explanation">
          <h4>BFF Service Implementation</h4>
          <p>
            On the backend, your BFF service would aggregate data from multiple services.
            It's typically implemented in Node.js or a similar technology:
          </p>
          <pre className="code-block">{bffArchitectureCode}</pre>
        </div>
      </div>

      <div className="subsection">
        <h3>BFF vs. Direct Service Integration</h3>
        <div className="comparison">
          <div className="compare-item">
            <h4>Without BFF</h4>
            <pre className="code-block">{normalSliceExample}</pre>
            <ul>
              <li>Multiple API calls</li>
              <li>Multiple loading states to manage</li>
              <li>Client handles data combining</li>
              <li>More complex Redux state shape</li>
              <li>Higher network overhead</li>
            </ul>
          </div>
          
          <div className="compare-item">
            <h4>With BFF</h4>
            <pre className="code-block">
{`// With BFF pattern using RTK Query
const { data, isLoading } = useGetUserProfileQuery(userId);

// Single request gets all needed data in optimal shape
// Single loading state to manage
// Server handles data joining and shaping
// Simpler Redux store structure
// Less network overhead`}
            </pre>
          </div>
        </div>
      </div>

      <div className="subsection">
        <h3>Best Practices for BFF with Redux</h3>
        <ol>
          <li><strong>Design BFF endpoints around UI components or pages</strong> - Not around data entities</li>
          <li><strong>Use cache tags in RTK Query</strong> - For efficient cache invalidation</li>
          <li><strong>Implement proper error handling</strong> - Both in BFF and frontend</li>
          <li><strong>Consider versioning your BFF API</strong> - To support multiple frontend versions</li>
          <li><strong>Add monitoring and tracing</strong> - To track performance and issues</li>
          <li><strong>Keep transformation logic in the BFF</strong> - Not in your Redux code</li>
          <li><strong>Consider GraphQL for complex BFFs</strong> - When query flexibility is important</li>
        </ol>
      </div>

      <div className="subsection">
        <h3>When to Use the BFF Pattern</h3>
        <ul>
          <li>For complex UIs that need data from multiple services</li>
          <li>When you need to optimize API communication for specific clients</li>
          <li>For large-scale applications with multiple teams</li>
          <li>When you have different client types (web, mobile, etc.)</li>
          <li>To improve performance by reducing API calls</li>
        </ul>
      </div>

      <div className="warning-box">
        <h4>Potential Drawbacks</h4>
        <ul>
          <li><strong>Additional Infrastructure:</strong> Requires maintaining another service</li>
          <li><strong>Increased Complexity:</strong> Adds another layer to the architecture</li>
          <li><strong>Potential Duplication:</strong> Similar logic might be implemented across different BFFs</li>
          <li><strong>Deployment Dependencies:</strong> BFF changes might require coordinated deployments with frontend</li>
        </ul>
      </div>

      <BackButton />
    </div>
  );
};

export default BFFPatternComponent;
