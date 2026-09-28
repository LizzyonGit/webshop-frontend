interface ResetPasswordEmailProps {
  userName: string;
  resetUrl: string;
  logoUrl: string;
}

export function resetPasswordEmail({ userName, resetUrl, logoUrl }: ResetPasswordEmailProps) {
  const logoUrlImg = `${logoUrl}`;
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body style="margin: 0; padding: 0; background-color: #f8f6f0;">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="background-color: #f8f6f0; padding: 40px 0;"
        >
          <tr>
            <td align="center">
              <table
                width="600"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="background-color: #ffffff; padding: 40px; max-width: 600px;"
              >
                <tr>
                  <td align="center" style="padding-bottom: 30px;">
                    <img
                      src="${logoUrlImg}"
                      alt="Sky Market"
                      width="180"
                      border="0"
                      style="
                        display: block;
                        width: 180px;
                        max-width: 180px;
                        height: auto;
                        border: 0;
                        outline: none;
                        text-decoration: none;
                      "
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <h1>Reset your password</h1>

                    <p>Hello ${userName},</p>

                    <p>
                      Click the button below to reset your password.
                    </p>

                    <p>
                      <a href="${resetUrl}">
                        Reset password
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
