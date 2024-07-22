import { useEffect } from "react";

export default function Modal({ width = 30, title, children, open, onClose }) {
  useEffect(() => {
    const handlePressEsc = (e) => {
      if (e.keyCode === 27) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handlePressEsc);
    return () => document.removeEventListener("keydown", handlePressEsc);
  }, [onClose]);

  return (
    <>
      {open ? (
        <>
          <div className="fixed inset-0 bg-gray-700 opacity-40 z-30"></div>
          <div className="fixed inset-0 z-40" onMouseDown={onClose}>
            <div className="flex justify-center items-center min-h-screen">
              <div
                className="bg-gray-900 rounded-lg shadow-lg"
                style={{ width: `${width}rem` }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 border-b">
                  <button className="invisible text-white">&#10005;</button>
                  <h5 className="text-white text-2xl font-medium">{title}</h5>
                  <button className="text-white" onClick={onClose}>
                    &#10005;
                  </button>
                </div>
                <div className="p-4">{children}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
