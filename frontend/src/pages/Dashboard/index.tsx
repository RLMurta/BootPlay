import React, { useEffect, useState } from 'react'
import { AlbumModel } from '@/models/AlbumModel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/Button';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.jpg';
import { SearchInput } from '@/components/custom/SearchInput';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/custom/Card';
import { Loader2 } from 'lucide-react';
import Modal from 'react-modal';
import { DiscModal } from '@/components/custom/DiscModal';
import { useAuth } from '@/hooks/UseAuth';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc, faWallet } from '@fortawesome/free-solid-svg-icons';


Modal.setAppElement('#root');

export function Dashboard() {
    const [albums, setAlbums] = useState<AlbumModel[]>([]);
    const [search, setSearch] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const _navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalAlbum, setModalAlbum] = useState<AlbumModel>();
    const { getAlbums, buyAlbum } = useAuth();

    useEffect(() => {
        fetchAlbums('year:2024');
    }, []);

    useEffect(() => {
        if (modalIsOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [modalIsOpen]);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleOnAlbumClick(album: AlbumModel) {
        setModalAlbum(album);
        openModal();
    }

    function handleOnSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    async function handleOnSearchBtClicked() {
        fetchAlbums(search);
        setHasSearched(true);
    }

    async function handleOnBuyBtClick() {
        setLoading(true);
        buyAlbum(
            modalAlbum?.name ?? '',
            modalAlbum?.id ?? '',
            modalAlbum?.artists[0].name ?? '',
            modalAlbum?.images[0].url ?? '',
            modalAlbum?.value ?? 0
        )
            .then(() => {
                setLoading(false);
                toast.success("Compra efetuada com sucesso!");
            }).catch(() => {
                setLoading(false);
                toast.error("Não foi possível efetuar a compra!");
            });
    }

    function handleOnLogoClick() {
        fetchAlbums('year:2024');
        setHasSearched(false);
    }

    async function fetchAlbums(query: string) {
        setAlbums([]);
        setLoading(true);
        getAlbums(query)
            .then((resp) => {
                setAlbums(resp);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
                toast.error("Erro ao carregar discos!");
            });
    }

    return (
        <div className='flex flex-col overflow-hidden'>
            <div className='bg-dashboard bg-cover bg-center bg-no-repeat h-[600px]'>
                <header className='flex items-center justify-between h-auto backdrop-brightness-60 backdrop-blur-lg bg-gray-300 bg-opacity-20'>
                    <div className='flex flex-row items-center ml-2 md:ml-20 mt-2 mb-2 gap-2 cursor-pointer' onClick={() => {
                        handleOnLogoClick();
                    }}>
                        <img src={logo} className='h-12' alt="Logo" />
                        <h1 className="text-md text-white">BootPlay</h1>
                    </div>
                    <div className='flex md:gap-3 mr-4 md:mr-20 items-center'>
                        <Button onClick={() => _navigate('/user_dashboard')} className="hover:text-gray-400 text-white text-md hidden md:block">
                            Meus Discos</Button>
                        <Button onClick={() => _navigate('/user_dashboard')} className="hover:text-gray-400 text-white text-2xl text-md md:hidden">
                            <FontAwesomeIcon icon={faCompactDisc} />
                        </Button>
                        <Button onClick={() => _navigate('/wallet')} className="hover:text-gray-400 text-white text-md hidden md:block">
                            Carteira</Button>
                        <Button onClick={() => _navigate('/wallet')} className="hover:text-gray-400 text-white text-2xl mr-1 text-md md:hidden">
                            <FontAwesomeIcon icon={faWallet} />
                        </Button>
                        <img src={avatar} className='h-12 rounded-full' alt="Avatar" />
                    </div>
                </header>
                <div className='relative h-[700px]'>
                    <div className='absolute inset-0 bg-gradient-to-t from-gray-900 from-30%' />
                    <div className='absolute mt-28 md:mt-44 ml-4 md:ml-24 md:max-w-2xl'>
                        <h1 className="text-5xl text-white">A história da música não pode ser esquecida!</h1>
                        <p className="text-xl max-w-xl mt-4 text-white">Sucessos que marcaram o tempo!!!</p>
                    </div>
                </div>
            </div>

            <main className="flex flex-col bg-gray-900 h-full z-0">
                <div className='flex flex-row mr-2 ml-2 items-center justify-center'>
                    <SearchInput onChange={handleOnSearchChange} onSearchIconClick={handleOnSearchBtClicked} placeholder="Pesquisar"
                        className="w-96 h-12 p-2 border border-white bg-transparent rounded-md text-white" onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleOnSearchBtClicked();
                            }
                        }} />
                </div>
                <div className='relative flex flex-col items-center mb-12'>
                    {loading ? <><Loader2 className="h-24 w-24 mt-20 bg-gray-900 text-white animate-spin" /> <h1 className='text-white'>Carregando...</h1> </> :
                        <>
                            {hasSearched ? (
                                <section className='flex flex-wrap gap-4 mt-10 justify-center h-full z-0'>
                                    {
                                        albums?.map((album, i) => (
                                            <>
                                                <Card key={i} url={album.images[0].url} name={album.name} value={album.value} onClick={() => handleOnAlbumClick(album)} />
                                            </>
                                        ))
                                    }
                                </section>
                            ) : (
                                <>
                                    <div className='flex flex-col w-screen items-start'>
                                        <h1 className="ml-4 md:ml-20 mt-4 md:mt-2 text-6xl text-white">Trends</h1>
                                    </div>

                                    <div className='flex justify-center items-center md:mt-10 ml-24'>
                                        <Carousel className='mt-10' opts={{ align: "start", loop: true, }} plugins={[Autoplay({ delay: 3000, }),]}>
                                            <CarouselContent>
                                                {
                                                    albums?.map((album, i) => (
                                                        <CarouselItem
                                                            key={i}
                                                            style={{ '--bg-card': `url(${album.images[0].url})` } as React.CSSProperties}
                                                            className="bg-[image:var(--bg-card)] bg-cover bg-no-repeat max-w-80 min-h-80 rounded-md p-0 mr-8 relative"
                                                        >
                                                            <div
                                                                onClick={() => handleOnAlbumClick(album)}
                                                                className="flex flex-col justify-center items-center h-full backdrop-brightness-50 cursor-pointer text-center"
                                                            >
                                                                <h1 className="text-2xl font-semibold text-white">{album.name}</h1>
                                                                <p className='text-lg font-semibold text-white absolute bottom-2 right-2 mr-4 mb-4'>R$ {album.value}</p>
                                                            </div>
                                                        </CarouselItem>
                                                    ))
                                                }
                                            </CarouselContent>
                                        </Carousel>
                                    </div>
                                </>
                            )}
                        </>
                    }
                </div>
            </main>
            {
                modalIsOpen && <DiscModal modalIsOpen={modalIsOpen} closeModal={closeModal} album={modalAlbum} onBtClick={handleOnBuyBtClick} />
            }
        </div>
    )
}
