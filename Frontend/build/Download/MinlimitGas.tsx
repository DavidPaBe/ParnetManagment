import { GearApi } from "@gear-js/api";
import { Button } from "@gear-js/ui";
import { useState } from "react";

function MinlimitGas() {
  const [minlimit, setMinlimit] = useState<any | undefined>(0);

  const calculategas = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://testnet.vara.rs",
    });

    // Add your codeID
    const codeId =
      "0x109ffa89f6886b0ff2a8dad5c62ef45a838c78e063f998f85e0cd069b20f49dd";

    const gas = await gearApi.program.calculateGas.initCreate(
      "0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d",
      codeId,
      "0x00",
      0,
      true
    );

    setMinlimit(gas.toHuman().min_limit);

    return gas.toHuman().min_limit;
  };

  return (
    <div className="container">
      <h1>Gas fee</h1>
      <p className="mnemonic"> minlimit: {minlimit}</p>
      <Button text="Calculate gas" onClick={calculategas} />
    </div>
  );
}

export { MinlimitGas };
