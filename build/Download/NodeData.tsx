import { GearApi } from "@gear-js/api";
import { Button } from "@gear-js/ui";
import { useState } from "react";

function NodeData() {
  const [chainData, setChain] = useState<string>();
  const [nodeNameData, setNodeName] = useState<string>();
  const [nodeVersionData, setNodeVersion] = useState<string>();

  const nodeInformation = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://testnet.vara.rs"
    });

    const [chain, nodeName, nodeVersion] = await Promise.all([
      gearApi.chain(),
      gearApi.nodeName(),
      gearApi.nodeVersion(),
    ]);

    setChain(chain);
    setNodeName(nodeName);
    setNodeVersion(nodeVersion);
  };

  return (
    <div className="card">
      <h3>Node Data</h3>
      <p>Red: {chainData}</p>
      <p>Nodo: {nodeNameData}</p>
      <p>Version del nodo:{nodeVersionData}</p>
      <Button text="Get Node Information" onClick={nodeInformation} />
    </div>
  );
}

export { NodeData };
