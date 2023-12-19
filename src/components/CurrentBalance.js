import React from "react";
import { Card } from "antd";

function CurrentBalance({ balance }) {
  return (
    <Card title="Current Balance" style={{ width: "100%" }}>
      <div className="currentBalance">
        <div style={{ lineHeight: "70px" }}> {balance}</div>
        <div style={{ fontSize: "20px" }}>Sepolia ETH</div>
      </div>
    </Card>
  );
}

export default CurrentBalance;
