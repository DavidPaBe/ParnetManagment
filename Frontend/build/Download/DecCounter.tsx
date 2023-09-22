import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { u8aToHex, stringToU8a } from "@polkadot/util";
import { Button } from "@gear-js/ui";

function DecCounter() {
  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api } = useApi();

  const programID =
    "0x0e4b1d2684c599a55c673f54d73a518640ed048ec9f63f2fd3b997633f8b4680";
  
  const messageinit = "dec";
  const payloadHex=u8aToHex(stringToU8a(messageinit ));
 
  const message: any = {
    destination: programID, // programId
    payload: payloadHex,
    gasLimit: 899819245,
    value: 0,
  };

  const signer = async () => {
    const localaccount = account?.address;
    const isVisibleAccount = accounts.some(
      (visibleAccount) => visibleAccount.address === localaccount
    );

    if (isVisibleAccount) {
      // Create a message extrinsic
      const transferExtrinsic = api.message.send(message);

      const injector = await web3FromSource(accounts[0].meta.source);

      transferExtrinsic
        .signAndSend(
          accounts[0].address,
          { signer: injector.signer },
          ({ status }) => {
            if (status.isInBlock) {
              console.log(
                `Completed at block hash #${status.asInBlock.toString()}`
              );
              alert.success(`Block hash #${status.asInBlock.toString()}`);
            } else {
              console.log(`Current status: ${status.type}`);
              if (status.type === "Finalized") {
                alert.success(status.type);
              }
            }
          }
        )
        .catch((error: any) => {
          console.log(":( transaction failed", error);
        });
    } else {
      alert.error("Account not available to sign");
    }

    // Usermessagesent subscribtion
    const unsub = api.gearEvents.subscribeToGearEvent(
      "UserMessageSent",
      ({
        data: {
          message: { id, source, destination, payload, value },
        },
      }) => {
        console.log(`
      messageId: ${id.toHex()}
      source: ${source.toHex()}
      payload: ${payload.toHuman()}
      `);
      }
    );
  };

  return <Button text="Dec" onClick={signer} />;
}

export { DecCounter };
