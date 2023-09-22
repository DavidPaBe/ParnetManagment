import { useAccount } from "@gear-js/react-hooks";

function BalancesAllAccounts() {
  const { accounts } = useAccount();

  return (
    <div>
      {accounts.map((account) => (
        <div key={account.address}>
          <button type="button">{account.meta.name}</button> {(account.address).slice(0, 5) + "..." +(account.address).slice(-5)}
        </div>
      ))}
    </div>
  );
}
export { BalancesAllAccounts };
