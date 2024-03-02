'use client';

import { Button, Flowbite, Modal } from 'flowbite-react';

export default function modalCompetition({
  openModal,
  setOpenModal,
  title,
  children,
  accept,
  cancel,
  onAccept,
  onCancel,
  onClose
}: any) {
  return (<Flowbite>
    <Modal
      show={openModal}
      onClose={() => {
        if (onClose) {
          onClose()
        }
        setOpenModal(false)
      }}
    >
      <Modal.Header>{title || "title"}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {children}
        </div>
        <div className="d-flex mt-4">
          {(accept || cancel) &&
            <>
              {accept &&
                <Button onClick={onAccept}>{accept}</Button>
              }
              {cancel &&
                <Button color="gray" onClick={onCancel} className="ml-3">
                  {cancel}
                </Button>
              }
            </>
          }
        </div>
      </Modal.Body>
      {
        // (accept || cancel) &&
        // <Modal.Footer>
        //   {accept &&
        //     <Button onClick={onAccept}>{accept}</Button>
        //   }
        //   {cancel &&
        //     <Button color="gray" onClick={onCancel}>
        //       {cancel}
        //     </Button>
        //   }
        // </Modal.Footer>
      }
    </Modal>
  </Flowbite>
  );
}
