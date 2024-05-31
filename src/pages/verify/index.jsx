import { useEffect, useState } from "react";
import { Loader, VerificationCodeInput } from "../../components/common";
import Auth from "../../service/Auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { getSessionStorage, setSessionStorage } from "../../helpers/utils";
const VerifyEmail = () => {
  const [count, setCount] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [codeValues, setCodeValues] = useState(["", "", "", "", "", ""]);
  const [codeDateTime, setCodeDateTime] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const sendEmail = async () => {
    if (isSending) return;
    setIsSending(true);
    const res = await Auth.SendEmail();
    if (res?.data) {
      setSessionStorage("codeVerifyTime", res.data);
      setCodeDateTime(res.data);
      toast.success("Gửi email xác nhận thành công");
      // window.location.reload();
    } else {
      if (res.response.status === 400) {
        navigate("/");
      }
    }
    setTimeout(() => {
      setIsSending(false); // Kích hoạt lại nút "Resend" sau một khoảng thời gian
    }, 1000); //
  };
  useEffect(() => {
    if (getSessionStorage("codeVerifyTime")) {
      setCodeDateTime(getSessionStorage("codeVerifyTime"));
    } else {
      sendEmail();
    }
  }, []);
  useEffect(() => {
    if (user?.email_verified === 1) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (codeDateTime) {
      const { codeStartDateTimeStr, expiration } = codeDateTime;
      const codeStartDateTime = new Date(codeStartDateTimeStr);
      const expirationTime = parseInt(expiration, 10) * 1000;
      const codeEndTime = codeStartDateTime.getTime() + expirationTime;
      const countdownInterval = setInterval(() => {
        const currentTime = Date.now();
        const timeRemaining = codeEndTime - currentTime;
        if (timeRemaining > 0) {
          setCount((timeRemaining / 1000).toFixed(0));
        } else {
          clearInterval(countdownInterval);
          setCount(null);
        }
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [codeDateTime]);
  const handleClickSubmit = async () => {
    const res = await Auth.ConfirmEmail({ code: codeValues.join("") });
    if (res.data === true) {
      navigate("/");
      toast.success("Xác nhận email thành công");
      sessionStorage.removeItem("codeVerifyTime");
    } else {
      toast.error("Xác nhận email thất bại");
    }
  };

  return (
    <div className="bg-gray-100">
      {isSending && <Loader />}
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-xl font-semibold mb-4">Verify email address</h1>
          <p className="text-gray-600 mb-6">
            We have sent a confirmation code to your email{" "}
            <span className="text-blue-500">{user?.email}</span> please enter
            the code in the box below to continue
          </p>
          <div className="mb-4 flex justify-center">
            <div className="flex items-center gap-2">
              <VerificationCodeInput
                codeValues={codeValues}
                setCodeValues={setCodeValues}
              ></VerificationCodeInput>
            </div>
          </div>
          <button
            onClick={handleClickSubmit}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
          <div className="mt-3 text-[12px] lg:text-md">
            You did not receive the code sent to your email:{" "}
            {!count ? (
              <span
                onClick={() => {
                  if (!isSending) {
                    sendEmail();
                  }
                }}
                className="text-blue-500 hover:underline cursor-pointer ms-2"
              >
                Resend
              </span>
            ) : (
              <span className="text-blue-500">{count}</span>
            )}
          </div>
          <div className="mt-5">
            <span
              onClick={() => {
                sessionStorage.removeItem("codeVerifyTime");
                navigate("/");
              }}
              className="text-gray-400 block cursor-pointer text-center"
            >
              {" "}
              NO THANK !
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
