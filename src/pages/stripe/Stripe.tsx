import React from "react";

export function Stripe() {
  return (
    <main className="main main-add-blog main-stripe">
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
