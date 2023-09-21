import { useState } from "react";
import { GearKeyring } from "@gear-js/api";
import { Button } from "@gear-js/ui";

function CreateMnemonic () {
  const [mnemonictext, setMnemonictext] = useState("");

  const generatemnemonic = () => {
    const mnemonic = GearKeyring.generateMnemonic();
    setMnemonictext(mnemonic);
  };

  return (
    <div className="mnemonic">
      <h3>Generate Mnemonic</h3>
      <p className="mnemonic">{mnemonictext}</p>
      <Button text="Get Mnemonic" onClick={generatemnemonic} />
    </div>
  );
}

export { CreateMnemonic };
