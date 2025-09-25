import { ERROR_MESSAGE } from "@/shared/user-message";

type Props = {
  errorMsg?: string;
};

export function ErrorDisplay(props: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-3">
      <p className="text-sm text-red-500">
        {props?.errorMsg || ERROR_MESSAGE.SOMETHING_WENT_WRONG}
      </p>
    </div>
  );
}
