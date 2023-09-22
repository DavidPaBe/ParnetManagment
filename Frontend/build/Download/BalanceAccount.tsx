import { useAccount } from "@gear-js/react-hooks";

function Balance() {
  const { account } = useAccount();

  return (
    <>
      <h2>
        sender : {account?.address} Balance: {account?.balance.value}
      </h2>
    </>
  );
}
export { Balance };
