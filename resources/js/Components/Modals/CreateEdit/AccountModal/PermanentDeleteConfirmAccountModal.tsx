import { useState } from "react";
import AlertModal from "../../AlertModal";
import { IUser } from "@/types";
import { router } from "@inertiajs/react";

export default function PermanentDeleteConfirmAccountModal({
  account,
  isOpen,
  requestClose,
}: {
  account: IUser | null;
  isOpen: boolean;
  requestClose: (clickedButtonText?: string) => any;
}) {
  const [progress, setProgress] = useState<boolean>(false);
  return (
    <AlertModal
      icon="danger"
      title="Are you sure?"
      paragraph={
        <span>
          You are about to permanently delete{" "}
          <span className="font-semibold text-gray-600">{account?.name}</span>{" "}
          account?
        </span>
      }
      buttons={{
        danger: {
          text: "Delete",
          props: {
            onClick: () => {
              setProgress(true);
              router.delete(route("account.forceDestroy", account?.id), {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setProgress(false),
                onError: (e) => {
                  if (e.serverError) alert(e.serverError);
                },
              });
            },
            disabled: progress,
          },
        },
        secondary: { text: "Cancel" },
      }}
      isOpen={isOpen}
      requestClose={(clickedButtonText) => requestClose(clickedButtonText)}
    />
  );
}
