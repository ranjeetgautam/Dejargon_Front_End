"use client";
import CircularProgress from "@mui/material/CircularProgress";

const CommonButton = ({
  btnText = "",
  isPending = false,
  children = <>Submit</>,
  isDisabled = false,
  isCancelBtn = false,
  className = "",
  type = "button",
  plusIcon,
  prefix = null,
  postFix = null,
  ...restProps
}) => {
  const btnTitle = btnText ? btnText : children;
  const commonClass =
    "border-2 border-tertiary font-semibold px-6 py-2 rounded-full";

  const _className = isCancelBtn
    ? `${commonClass} text-tertiary hover:bg-tertiary hover:text-white transition`
    : `${commonClass} bg-tertiary text-white hover:bg-white hover:text-tertiary `;
  return (
    <button
      type={type}
      disabled={isPending ? true : isDisabled}
      className={`${_className} ${className} clickable-focused-ring customButtonAnimation`}
      {...restProps}
    >
      {isPending ? (
        <CircularProgress
          size={20}
          className="w-28"
          style={{ color: isCancelBtn ? "var(--color-tertiary)" : "white" }}
        />
      ) : (
        <div className="flex gap-1 items-center justify-center eKisanLabelLarge">
          {plusIcon ? (
            <span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0494 0.950781C11.0494 0.822852 11.0752 0.700195 11.1217 0.587695C11.1703 0.470508 11.2408 0.365625 11.3279 0.278516C11.4998 0.106445 11.7377 0 12 0C12.1285 0 12.2514 0.0257812 12.3639 0.0724609C12.3662 0.0734375 12.3684 0.0746094 12.3711 0.0757813C12.4852 0.124219 12.5873 0.193555 12.6725 0.278711C12.8445 0.450586 12.951 0.688477 12.951 0.950977C12.951 0.956836 12.9506 0.962695 12.9498 0.968359V11.0504H23.0316C23.0373 11.0498 23.0436 11.0492 23.0492 11.0492C23.1773 11.0492 23.3002 11.075 23.4127 11.1217C23.4154 11.1227 23.4176 11.1238 23.4199 11.125C23.534 11.1734 23.6361 11.2428 23.7213 11.3279C23.8934 11.4998 24.0002 11.7377 24.0002 12C24.0002 12.1277 23.9742 12.2506 23.9277 12.3631C23.8793 12.4803 23.8088 12.5852 23.7213 12.6723C23.6344 12.7592 23.5299 12.8297 23.4127 12.8783V12.8785C23.3002 12.925 23.1773 12.9508 23.0492 12.9508C23.0436 12.9508 23.0373 12.9504 23.0316 12.9496L12.9498 12.9498V23.0316C12.9506 23.0373 12.951 23.0434 12.951 23.0492C12.951 23.1773 12.925 23.3004 12.8785 23.4127C12.8773 23.4154 12.8762 23.4176 12.875 23.4199C12.8266 23.534 12.7574 23.6361 12.6725 23.7213C12.5 23.8936 12.2623 24 12 24C11.8723 24 11.7494 23.9742 11.6369 23.9275C11.5197 23.8791 11.4148 23.8086 11.3277 23.7213C11.2408 23.6346 11.1703 23.5299 11.1217 23.4127H11.1215C11.0748 23.3004 11.049 23.1773 11.049 23.0492C11.049 23.0434 11.0494 23.0373 11.0502 23.0316V12.9498H0.968359C0.962695 12.9506 0.956836 12.951 0.950781 12.951C0.823047 12.951 0.700195 12.9252 0.587695 12.8785C0.470508 12.8301 0.365625 12.7596 0.278516 12.6723C0.191602 12.5854 0.121094 12.4809 0.0724609 12.3637C0.0257812 12.2512 0 12.1283 0 12C0 11.8721 0.0257812 11.7494 0.0724609 11.6369C0.121094 11.5197 0.191602 11.4148 0.278711 11.3277C0.450781 11.1557 0.688477 11.0492 0.950977 11.0492C0.957031 11.0492 0.962891 11.0496 0.968555 11.0504H11.0506V0.968359C11.0498 0.9625 11.0494 0.956641 11.0494 0.950781Z"
                  fill="white"
                />
              </svg>
            </span>
          ) : (
            ""
          )}
          {prefix && <div>{prefix}</div>}
          <div>{btnTitle}</div>
          {postFix && <div>{postFix}</div>}
        </div>
      )}
    </button>
  );
};

export default CommonButton;
