import React from "react";
import { Card, Table } from "antd";

const columns = [
  {
    title: "Contact",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
  {
    title: "Amount",
    key: "amount",
    render: (_, record) => (
      <div style={record.type === "-" ? { color: "red" } : { color: "green" }}>
        {record.type}
        {record.amount} Sepolia ETH
      </div>
    ),
  },
];

function RecentActivity({ history }) {
  return (
    <Card title="Recent Activity" style={{ width: "100%", minHeight: "663px" }}>
      {history && (
        <Table
          dataSource={history}
          columns={columns}
          pagination={{ position: ["bottomCenter"], pageSize: 8 }}
        />
      )}
    </Card>
  );
}

export default RecentActivity;
