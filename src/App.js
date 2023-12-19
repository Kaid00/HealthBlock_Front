import "./App.css";
import logo from "./logo.png";
import { Layout, Button } from "antd";
import CurrentBalance from "./components/CurrentBalance";
import RequestAndPay from "./components/RequestAndPay";
import AccountDetails from "./components/AccountDetails";
import RecentActivity from "./components/RecentActivity";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import axios from "axios";
import { useState, useEffect } from "react";

const { Header, Content } = Layout;

function App() {
  const [name, setName] = useState("...");
  const [balance, setBalance] = useState("...");
  const [dollars, setDollars] = useState("...");
  const [history, setHistory] = useState(null);
  const [request, setRequest] = useState({ 1: [0], 0: [] });

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  function disconnectAndRestStates() {
    disconnect();
    setName("...");
    setBalance("...");
    setDollars("...");
    setHistory(null);
    setRequest({ 1: [0], 0: [] });
  }

  async function getNameAndBalance() {
    const res = await axios.get(
      `https://healthblock-9a36d3921a32.herokuapp.com/details?`,
      {
        params: { address: `${address}` },
      }
    );

    const response = res.data;
    if (response.name[1]) {
      setName(response.name[0]);
    }

    setBalance(String(response.balance));
    setDollars(String(response.dollars));
    setHistory(response.history);
    setRequest(response.requests);
  }

  useEffect(() => {
    if (!isConnected) return;
    getNameAndBalance();
  }, [isConnected]);

  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="headerLeft">
            <img src={logo} alt="logo" className="logo" />

            {isConnected && (
              <>
                <div
                  className="menuOption"
                  style={{ borderBottom: "1.5px solid black" }}
                >
                  Summary
                </div>
                <div className="menuOption">Activity</div>
                <div className="menuOption">{`Send & Request`}</div>
                <div className="menuOption">Wallet</div>
                <div className="menuOption">Help</div>
              </>
            )}
          </div>

          {isConnected ? (
            <Button
              type={"primary"}
              onClick={() => {
                disconnectAndRestStates();
              }}
            >
              Disconnect Wallet
            </Button>
          ) : (
            <Button
              type={"primary"}
              onClick={() => {
                connect();
              }}
            >
              Connect Wallet
            </Button>
          )}
        </Header>
        <Content className="content">
          {isConnected ? (
            <>
              {/* Components */}
              <div className="firstColumn">
                <CurrentBalance balance={balance} />
                <RequestAndPay
                  request={request}
                  getNameAndBalance={getNameAndBalance}
                />
                <AccountDetails
                  address={address}
                  name={name}
                  balance={balance}
                />
              </div>
              <div className="secondColumn">
                <RecentActivity history={history} />
              </div>
            </>
          ) : (
            <div>Please login</div>
          )}
        </Content>
      </Layout>
    </div>
  );
}

export default App;
