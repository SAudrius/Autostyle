import React from "react";

interface CartProps {
  onClick: () => void;
}

export const Cart = ( { onClick }: CartProps ) => {
    return (
        <button
            className="px-1 py-2 sm:px-2"
            onClick={onClick}
            aria-label="Open Cart"
        >
            <svg
                width="28"
                height="24"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.02266 15.8335H9.02138C8.56999 15.8346 8.2032 16.1892 8.2032 16.625C8.2032 17.0614 8.57127 17.4167 9.02351 17.4167H23.8986C24.3517 17.4167 24.719 17.7711 24.719 18.2083C24.719 18.6456 24.3517 19 23.8986 19H22.5148C23.8864 19.0081 24.9998 20.1265 24.9998 21.5C24.9998 22.8784 23.8783 24 22.4998 24C21.1213 24 19.9998 22.8784 19.9998 21.5C19.9998 20.1265 21.1133 19.0081 22.4849 19H10.5149C11.8866 19.0081 13 20.1265 13 21.5C13 22.8784 11.8785 24 10.5 24C9.12154 24 8 22.8784 8 21.5C8 20.1265 9.11345 19.0081 10.4851 19H9.02351C7.66657 19 6.56256 17.9345 6.56256 16.625C6.56256 15.6505 7.17416 14.8116 8.04597 14.4459L5.08427 1.58333H0.82032C0.367221 1.58333 0 1.22894 0 0.791667C0 0.354395 0.367221 0 0.82032 0H5.74224C6.12676 0 6.45959 0.257704 6.54312 0.619933L7.12952 3.16667H27.1799C27.4373 3.16667 27.6798 3.28336 27.8349 3.48168C27.9898 3.68001 28.0393 3.93689 27.9686 4.17584L24.6873 15.2592C24.5867 15.5989 24.2648 15.8333 23.8986 15.8333H9.02586L9.02266 15.8335ZM23.2799 14.25L26.0925 4.74997H7.49414L9.68166 14.25H23.2799ZM11.3328 21.5001C11.3328 21.0407 10.9588 20.6668 10.4994 20.6668C10.04 20.6668 9.66608 21.0407 9.66608 21.5001C9.66608 21.9595 10.04 22.3334 10.4994 22.3334C10.9588 22.3334 11.3328 21.9595 11.3328 21.5001ZM22.4994 20.6668C22.9588 20.6668 23.3328 21.0407 23.3328 21.5001C23.3328 21.9595 22.9588 22.3334 22.4994 22.3334C22.04 22.3334 21.6661 21.9595 21.6661 21.5001C21.6661 21.0407 22.04 20.6668 22.4994 20.6668Z"
                    fill="black"
                />
            </svg>
        </button>
    );
};
