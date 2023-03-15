import React from "react";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="menu">
        <nav>
          <a href="/">List of QPolls</a>
          <a href="/qpolls/new">Create QPoll</a>
        </nav>
      </div>
    </div>
  );
}
