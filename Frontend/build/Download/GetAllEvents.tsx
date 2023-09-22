import { GearApi } from "@gear-js/api";
import { Button, Input } from "@gear-js/ui";
import { useState } from "react";

function GetAllEvents() {
  const [allevents, setAllevents] = useState<any | undefined>(0);
  const [blockhash, setBlockhash] = useState<any | undefined>("");

  const subscribeblocks = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://testnet.vara.rs",
    });

    const unsub = await gearApi.gearEvents.subscribeToNewBlocks(
      (header: any) => {
        console.log(
          `New block with number: ${header.number.toNumber()} and hash: ${header.hash.toHex()}`
        );
      }
    );
  };

  const getallevents = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://rpc-node.gear-tech.io",
    });

    const events = await gearApi.blocks.getEvents(blockhash);
    events.forEach((event) => {
      setAllevents(event.toHuman());
      console.log("Events", event.toHuman());
    });
  };

  const AmountInputChange = async (event: any) => {
    setBlockhash(event.target.value);
  };

  return (
    <div className="card">
      <center>Get All Events with Hash</center>
      <Input type="text" value={blockhash} onChange={AmountInputChange} />
      <div className="horizontal">
        <Button text="Subscribe blocks" onClick={subscribeblocks} />
        <Button text="Get All Events" onClick={getallevents} />
      </div>
    </div>
  );
}

export { GetAllEvents };
