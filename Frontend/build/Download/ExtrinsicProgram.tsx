import { GearApi, GearKeyring, getProgramMetadata } from "@gear-js/api";
import { useAlert } from "@gear-js/react-hooks";
import { Button } from "@gear-js/ui";
import { useState } from "react";

function ExtrinsicProgram() {
  const alert = useAlert();

  const [status, setStatus] = useState<any | undefined>("");

  const extrinsicProgram = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://testnet.vara.rs",
    });
    
    // Add your codeID
    const codeId =
      "your codeID";
 
     // Add your metadata.txt
    const meta =
    "your metadata.txt";

    const somePayload = "0x676574";

    const metadata = getProgramMetadata(`0x${meta}`);

    const program: any = {
      codeId,
      gasLimit: 1000000,
      value: 1000,
      initPayload: somePayload,
    };

    const {  extrinsic } = gearApi.program.create(program);

    const keyring = await GearKeyring.fromSuri("//Alice");

    await extrinsic.signAndSend(keyring, (event: any) => {
      setStatus(Object.keys(event.toHuman().status));
      alert.success(Object.keys(event.toHuman().status));

    });
  };

  return (
    <div className="mnemonic">
      <h1>Extrinsic Program</h1>
      <p className="mnemonic">Status: {status} </p>
      <Button text="Create extrinsic program" onClick={extrinsicProgram} />
    </div>
  );
}

export { ExtrinsicProgram };
