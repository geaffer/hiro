// src/components/SidebarLayout.js

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './SidebarLayout.css';

const SidebarLayout = () => {
  return (
    <div className="layout">
      <nav className="sidebar">
        <h2>히로히로
        </h2>
        <ul>
          <li><Link to="/revenues">매출 관리</Link></li>
          <li><Link to="/ingredients">식자재 관리</Link></li>
          <li><Link to="/labor-Cost">인건비 관리</Link></li>
          <li><Link to="/fixed-costs">고정비 관리</Link></li>
          <li><Link to="/other-expense">기타비용</Link></li>
          <li><Link to="/weekly-report">주간 리포트</Link></li>
          <li><Link to="/revenue-report">매출 리포트</Link></li>
          
          
        </ul>
      </nav>
      <main className="content">
        <Outlet />  {/* ✅ 핵심 수정 */}
      </main>
    </div>
  );
};

export default SidebarLayout;
