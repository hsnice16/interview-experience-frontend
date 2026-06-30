import { analytics } from "../../firebase";
import { logEvent } from "firebase/analytics";
import { Seo } from "components";
import { logPageViewEvent } from "hooks";
import React from "react";
import { ROUTE_STRIPE } from "utils/constants/routes";

export function Stripe() {
  logPageViewEvent()("Stripe");

  const sponsorCheckout = () => {
    logEvent(analytics, "set_checkout_option", {
      checkout_option: "sponsor",
    });
  };

  const upiCheckout = () => {
    logEvent(analytics, "set_checkout_option", {
      checkout_option: "upi",
    });
  };

  return (
    <main className="main main-add-blog main-stripe">
      <Seo title="Support the Project" path={ROUTE_STRIPE} noindex />

      <h1>Thank you for considering a contribution!</h1>
      <p>
        Your support helps maintain and keep this project running smoothly.{" "}
      </p>

      <h4>
        Unfortunately, Stripe isn't currently working for new accounts in India,
        but here are some alternative ways to contribute:
      </h4>

      <ol>
        <li>
          If you have a{" "}
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub
          </a>{" "}
          account, consider sponsoring me at{" "}
          <a
            href="https://github.com/sponsors/hsnice16"
            target="_blank"
            rel="noreferrer"
            onClick={sponsorCheckout}
          >
            github.com/sponsors/hsnice16
          </a>
          .
        </li>

        <li>
          For those in India, you can use UPI by scanning the{" "}
          <a
            href={process.env.REACT_APP_QR_CODE}
            target="_blank"
            rel="noreferrer"
            onClick={upiCheckout}
          >
            QR code
          </a>{" "}
          below.
        </li>
      </ol>

      <p className="email">
        If you have any questions, feel free to reach out at{" "}
        <strong>hsnice16@gmail.com</strong>.
      </p>

      <h3>
        Thank you once again for your generosity! <br />
        <br /> Your support keeps this project alive, helping others prepare for
        their interviews and share their experiences.
      </h3>
    </main>
  );
}
