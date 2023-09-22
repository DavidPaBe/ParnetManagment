import { GearApi } from "@gear-js/api";
import { useEffect, useState } from "react";

function Blocknumber() {
  const [blocknumber, setBlocknumber] = useState();

  const blocknumbers = async () => {
    const gearApi = await GearApi.create({
      providerAddress:"wss://testnet.vara.rs",
    });

    const unsub = await gearApi.gearEvents.subscribeToNewBlocks(
      (header: any) => {
        setBlocknumber(header.number.toNumber());
        console.log(
          `New block with number: ${header.number.toNumber()} and hash: ${header.hash.toHex()}`
        );
      }
    );
  };

  useEffect(() => {
    blocknumbers();
  },[]);
  return (
    <div className="card">
      <h3>Block Number</h3>
      <p>{blocknumber}</p>
    </div>
  );
}

export { Blocknumber };
