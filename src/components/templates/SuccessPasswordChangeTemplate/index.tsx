/* eslint-disable @next/next/no-head-element */
import React from 'react'

export const SuccessPasswordChangeTemplate = () => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Password Changed Successfully</title>
                <style>
                    {`
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              color: #333;
            }
            .content {
              padding: 20px;
              text-align: center;
            }
            .content p {
              font-size: 16px;
              color: #333;
            }
            .content a {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
            }
          `}
                </style>
            </head>
            <body>
                <div className="container">
                    <div className="header">
                        <h1>Password Changed Successfully</h1>
                    </div>
                    <div className="content">
                        <p>
                            Your password has been updated.
                        </p>
                    </div>
                </div>
            </body>
        </html>
    );
}
