import React, { useState, useEffect } from "react";

import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  DollarOutlined,
  SwapOutlined,
  FunnelPlotOutlined,
} from "@ant-design/icons";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { sepolia } from "wagmi/chains";
import ABI from "../constants/abi.json";
import { Modal, Input, InputNumber } from "antd";

function AccountDetails({ address, name, balance, getDetails }) {
  const [nameModal, setNameModal] = useState(false);
  const [username, setUsername] = useState("");

  const showNameModal = () => {
    setNameModal(true);
  };
  const hideNameModal = () => {
    setNameModal(false);
  };

  const { config: configRequest } = usePrepareContractWrite({
    chainId: sepolia.id,
    address: "0x13B8a779e44FCCD9e8cB0FFAD7C8101fBa33f92D",
    abi: ABI,
    functionName: "addNameToAddress",
    args: [username],
  });

  const { write: writeRequest, data: dataRequest } =
    useContractWrite(configRequest);

  const { isSuccess: isSuccessRequest } = useWaitForTransaction({
    hash: dataRequest?.hash,
  });

  useEffect(() => {
    if (isSuccessRequest) {
      getDetails();
    }
  }, [isSuccessRequest]);

  return (
    <>
      <Modal
        title="Update the name associated to your wallet address"
        open={nameModal}
        onOk={() => {
          hideNameModal();
          writeRequest?.();
        }}
        onCancel={hideNameModal}
        okText="Update"
        cancelText="Cancel"
      >
        <p>Name: </p>
        <Input
          placeholder="..."
          value={username}
          onChange={(val) => setUsername(val.target.value)}
        />
      </Modal>

      <Card title="Account Details" style={{ width: "100%" }}>
        <div className="accountDetailRow">
          <UserOutlined style={{ color: "#767676", fontSize: "25px" }} />
          <div>
            <div className="accountDetailHead"> {name} </div>
            <div className="accountDetailBody">
              {" "}
              Address: {address.slice(0, 6)}...{address.slice(37)}
            </div>
          </div>
        </div>
        <div className="accountDetailRow">
          <div>
            <div className="accountDetailHead"> Sepolia ETH</div>
            <div className="accountDetailBody">{balance} sepoliaEth</div>
          </div>
        </div>

        <div className="balanceOptions">
          <div
            className="extraOption"
            onClick={() => {
              showNameModal();
            }}
          >
            Update name
          </div>
        </div>
      </Card>
    </>
  );
}

export default AccountDetails;
