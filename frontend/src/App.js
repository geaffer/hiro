import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarLayout from './components/SidebarLayout';
import IngredientPage from './pages/IngredientPage';
import RevenuePage from './pages/RevenuePage';
import RevenueReportPage from './pages/RevenueReportPage';
import LaborCostPage from './pages/LaborCostPage';
import FixedCostPage from './pages/FixedCostPage';
import OtherExpensePage from './pages/OtherExpensePage';
import WeeklyReportPage from './pages/WeeklyReportPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route path="ingredients" element={<IngredientPage />} />
          <Route path="revenues" element={<RevenuePage />} />
          <Route path="revenue-report" element={<RevenueReportPage />} />
          <Route path="labor-cost" element={<LaborCostPage />} />  
          <Route path="fixed-costs" element={<FixedCostPage />} />
          <Route path="other-expense" element={<OtherExpensePage />} />
          <Route path="/weekly-report" element={<WeeklyReportPage />} />



        </Route>
      </Routes>
    </Router>
  );
}

export default App;
