import { GearApi } from "@gear-js/api";
import { Button, Input } from "@gear-js/ui";
import { useState } from "react";

function Waitlist() {
  const [list, setList] = useState<any | undefined>([]);
  const [codeID, setCodeID] = useState<any | undefined>("");

  const getwaitlist = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://testnet.vara.rs",
    });

    const waitlist = await gearApi.waitlist.read(codeID);
    setList(waitlist);
    console.log(waitlist);
  };

  const CodeIDInputChange = (event: any) => {
    setCodeID(event.target.value);
  };

  return (
    <div className="waitlist">
      <center>Waitlist</center>
      <center className="container">
        Introduce your codeID
        <Input type="text" value={codeID} onChange={CodeIDInputChange} />
        <Button text="Get Waitlist" onClick={getwaitlist} />
      </center>
    </div>
  );
}

export { Waitlist };
