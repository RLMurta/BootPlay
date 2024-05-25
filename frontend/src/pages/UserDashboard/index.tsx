import { Button } from '@/components/ui/Button';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.jpg';
import { useEffect, useState } from 'react';
import { UserAlbumModel } from '@/models/UserAlbumModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/custom/Card';
import { Loader2 } from 'lucide-react';
import { faCompactDisc, faWallet } from '@fortawesome/free-solid-svg-icons';


export function UserDashboard() {
    const [albums, setAlbums] = useState<UserAlbumModel[]>([]);
    const { getUserAlbums } = useAuth();
    const _navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserAlbums()
            .then((data) => {
                setAlbums(data);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className='bg-gray-900 flex flex-col h-screen overflow-x-hidden'>
            <header className='flex items-center justify-between h-auto backdrop-brightness-60 backdrop-blur-lg bg-gray-300 bg-opacity-20'>
                <div className='flex flex-row items-center ml-2 md:ml-20 mt-2 mb-2 gap-2 cursor-pointer' onClick={() => _navigate('/dashboard')}>
                    <img src={logo} className='h-12' alt="Logo" />
                    <h1 className="text-md text-white">BootPlay</h1>
                </div>
                <div className='flex md:gap-3 mr-4 md:mr-20 items-center'>
                    <Button className="text-white font-bold text-md hidden md:block" disabled>
                        Meus Discos</Button>
                    <Button className="text-white font-bold text-md md:hidden" disabled>
                        <FontAwesomeIcon icon={faCompactDisc} />
                    </Button>
                    <Button className="hover:text-gray-400 text-white text-md hidden md:block">
                        Carteira</Button>
                    <Button className="hover:text-gray-400 text-white mr-1 text-md md:hidden">
                        <FontAwesomeIcon icon={faWallet} />
                    </Button>
                    <img src={avatar} className='h-12 rounded-full' alt="Avatar" />
                </div>
            </header>

            <main>
                <h1 className='text-white text-4xl ml-4 md:ml-24 mt-14 md:mt-28'>Meus Discos</h1>
                {loading ? <><Loader2 className="h-24 w-24 mt-20 mb-24 bg-gray-90 text-white animate-spin" /> <h1 className='text-white'>Carregando...</h1> </> :
                    <>
                        <div className='flex flex-col md:flex-row ml-4 md:ml-24 mt-2 md:mt-10 mr-4 gap-4'>
                            <div className='flex flex-row items-center bg-white rounded-xl pl-4 pt-4 pb-4 pr-10'>
                                <div className='bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white'>
                                    <FontAwesomeIcon className='text-white' icon={faFile} />
                                </div>
                                <div className='flex flex-col ml-4'>
                                    <h1>Total de Albums</h1>
                                    <h1 className='text-2xl'>{albums.length}</h1>
                                </div>
                            </div>
                            <div className='flex flex-row items-center bg-white rounded-xl pl-4 pt-4 pb-4 pr-10'>
                                <div className='bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white'>
                                    <FontAwesomeIcon className='text-white' icon={faDollarSign} />
                                </div>
                                <div className='flex flex-col ml-4'>
                                    <h1>Valor Investido</h1>
                                    <h1 className='text-2xl'>R${Number(albums.reduce((total, album) => total + (album.value || 0), 0)).toFixed(2)}</h1>
                                </div>
                            </div>
                        </div>
                        <section className='flex flex-wrap md:gap-4 mt-6 mb:mt-12 mb-4 justify-center space-y-4'>
                            {
                                albums && albums.length > 0 && albums?.map((album, i) => (
                                    <Card key={i} url={album.imageUrl || ''} name={album.name || ''} value={album.value} />
                                ))
                            }
                        </section>
                    </>
                }
            </main>
        </div>
    )
}
