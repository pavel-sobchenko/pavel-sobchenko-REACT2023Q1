import React, { ReactNode } from 'react';
import { closeModal } from '../../store';
import { useAppDispatch } from '../../store/hooks';

interface ModalProps {
  children: ReactNode;
}

export default function Modal(props: ModalProps) {
  const dispatch = useAppDispatch();
  const { children } = props;
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-800">
        <div className="parent w-1/3">
          <div className="border-0 rounded-lg shadow-lg parentflex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <button
                type="button"
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => dispatch(closeModal())}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>

            <div className="parentp-6 flex justify-center">{children}</div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => dispatch(closeModal())}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-60 fixed inset-0 z-40 bg-black" />
    </div>
  );
}
