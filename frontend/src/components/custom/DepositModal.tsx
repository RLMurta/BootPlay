import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons/faX';
import { Button } from '../ui/Button';
import { Input } from './Input';
import { FormEvent } from 'react';

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    onSubmit: (event: FormEvent) => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | number;
}

export function DepositModal({ modalIsOpen, closeModal, onSubmit, onInputChange, value }: Props) {
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-transparent backdrop-blur-sm"
            >
                <div className='flex flex-col w-80 md:w-auto ml-4 mr-4 relative md:flex-row rounded-2xl bg-white'>
                    <div className='flex flex-col mt-10 ml-4 mr-4'>
                        <FontAwesomeIcon icon={faX} onClick={closeModal} className='absolute top-3 right-3 ml-auto cursor-pointer bg-gray-100 hover:bg-gray-300 mt-2 mr-2 p-2 rounded-full w-3 h-3' />
                        <form onSubmit={onSubmit} className="flex flex-col w-72">
                            <Input value={value} required type='number' onChange={onInputChange}>Valor do depósito:</Input>
                            <Button type='submit' className="p-3 mb-3 bg-zinc-900 text-white hover:bg-zinc-800/90 transition rounded-3xl min-h-12">
                                Depositar
                            </Button>
                        </form>
                    </div>
                </div>
            </Modal>

        </>
    )
}
