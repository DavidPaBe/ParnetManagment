import { useState } from "react";
import { useAccount } from "@gear-js/react-hooks";
import { Button, Modal } from "@gear-js/ui";

function AccountsExtensionModal() {
  const { accounts } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button text="Get accounts" onClick={openModal} />
      {isModalOpen && (
        <Modal size="large" heading="Connect" close={closeModal}>
          <div>
            {accounts.map((account) => (
              <div key={account.address}>
                <button type="button">{account.meta.name}</button>{" "}
                {account.address}
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}

export { AccountsExtensionModal };
