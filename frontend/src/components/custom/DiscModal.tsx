import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons/faX';
import { Button } from '../ui/Button';
import { AlbumModel } from '@/models/AlbumModel';

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    album: AlbumModel;
    onBtClick?: () => void;
}

export function DiscModal({ modalIsOpen, closeModal, album, onBtClick }: Props) {
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-transparent backdrop-blur-sm"
            >
                <div className='flex flex-col w-80 md:w-auto ml-4 mr-4 relative md:flex-row rounded-2xl bg-white'>
                    <img src={album.images[0].url} alt="Album" className='h-80 md:h-80 w-80 md:w-80 rounded-2xl' />
                    <div className='flex flex-col mt-4 md:mt-16 ml-4 mr-4'>
                        <FontAwesomeIcon icon={faX} onClick={closeModal} className='absolute top-3 right-3 ml-auto cursor-pointer bg-gray-100 hover:bg-gray-300 mt-2 mr-2 p-2 rounded-full w-3 h-3' />
                        <h1 className='ml-4 mr-4 text-3xl text-black max-w-lg'>{album.name}</h1>
                        <p className='ml-4 mt-2 text-lg text-black'>Preço: R$ {album.value}</p>
                        <p className='ml-4 text-lg text-black'>Data de lançamento: {new Intl.DateTimeFormat('pt-BR').format(new Date(album.releaseDate))}</p>
                        <p className='ml-4 text-lg text-black'>
                            Artistas: 
                            {album.artists.map((artist) => artist.name).join(', ')}
                        </p>
                        <div className='flex justify-center mt-auto mb-8'>
                            <Button onClick={onBtClick} className='w-72 bg-yellow-400 hover:bg-yellow-500 text-white rounded-3xl'>Comprar</Button>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    )
}
