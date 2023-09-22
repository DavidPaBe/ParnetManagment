import { useAccount } from "@gear-js/react-hooks";

function Balance() {
  const { account } = useAccount();

  return (
    <>
      <h2>
        LocalStorageAccount : {account?.address.slice(0, 5) + "..." + account?.address.slice(-5)} Balance: {account?.balance.value}
      </h2>
    </>
  );
}
export { Balance };
