import React, { FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.jpg';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faCoins } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { faCompactDisc, faWallet } from '@fortawesome/free-solid-svg-icons';
import { WalletModel } from '@/models/WalletModel';
import { DepositModal } from '@/components/custom/DepositModal';
import toast from 'react-hot-toast';

export function Wallet() {
    const _navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { getWallet, creditWallet } = useAuth();
    const [wallet, setWallet] = useState<WalletModel>();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (modalIsOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [modalIsOpen]);

    useEffect(() => {
        fetchWallet();
    }, []);

    async function fetchWallet() {
        const authData = localStorage.getItem('@Auth.Data');
        if (authData) {
            const parsedData = JSON.parse(authData);
            const email = parsedData.email;
            getWallet(email)
                .then((data) => {
                    setWallet(data);
                    setLoading(false);
                }).catch(() => {
                    setLoading(false);
                });
            }
    }

    async function handleDeposit(event: FormEvent) {
        setLoading(true);
        event.preventDefault();
        const authData = localStorage.getItem('@Auth.Data');
        if (authData) {
            const parsedData = JSON.parse(authData);
            const email = parsedData.email;
            creditWallet(email, parseInt(inputValue))
                .then(() => {
                    closeModal();
                    fetchWallet();
                    setLoading(false);
                }).catch(() => {
                    toast.error("Erro ao creditar valor!");
                    setLoading(false);
                });
        }
        setLoading(false);
    }

    function updateInputValue(newValue: string) {
        if (newValue === "") {
            setInputValue("0");
        } else {
            const isFirstCharZero = newValue[0] === "0";
            const lastChar = newValue.slice(-1);
            const isNumber = !isNaN(parseInt(lastChar));

            if (isFirstCharZero && newValue.length > 1) {
                newValue= newValue.slice(1);
            }
            if (parseInt(newValue) >= 0){
                if (isNumber) {
                    setInputValue(newValue);
                } 
            }
        }
    }

    function openModal() {
        setInputValue("0");
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className='bg-gray-900 flex flex-col h-screen overflow-x-hidden'>
            <header className='flex items-center justify-between h-auto backdrop-brightness-60 backdrop-blur-lg bg-gray-300 bg-opacity-20'>
                <div className='flex flex-row items-center ml-2 md:ml-20 mt-2 mb-2 gap-2 cursor-pointer' onClick={() => _navigate('/dashboard')}>
                    <img src={logo} className='h-12' alt="Logo" />
                    <h1 className="text-md text-white">BootPlay</h1>
                </div>
                <div className='flex md:gap-3 mr-4 md:mr-20 items-center'>
                    <Button onClick={() => _navigate('/user_dashboard')} className="text-white font-bold text-md hidden md:block">
                        Meus Discos</Button>
                    <Button onClick={() => _navigate('/user_dashboard')} className="text-white font-bold text-md md:hidden">
                        <FontAwesomeIcon icon={faCompactDisc} />
                    </Button>
                    <Button className="hover:text-gray-400 text-white text-md hidden md:block" disabled>
                        Carteira</Button>
                    <Button className="hover:text-gray-400 text-white mr-1 text-md md:hidden" disabled>
                        <FontAwesomeIcon icon={faWallet} />
                    </Button>
                    <img src={avatar} className='h-12 rounded-full' alt="Avatar" />
                </div>
            </header>

            <main>
                <h1 className='text-white text-4xl ml-4 md:ml-24 mt-14 md:mt-28'>Minha Carteira</h1>
                {loading ? <><Loader2 className="h-24 w-24 mt-20 mb-24 bg-gray-90 text-white animate-spin" /> <h1 className='text-white'>Carregando...</h1> </> :
                    <div className='ml-4 md:ml-24'>
                        <div className='flex flex-col md:flex-row mt-2 md:mt-10 mr-4 gap-4'>
                            <div className='flex flex-row items-center bg-white rounded-xl pl-4 pt-4 pb-4 pr-10'>
                                <div className='bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white'>
                                    <FontAwesomeIcon className='text-white' icon={faDollarSign} />
                                </div>
                                <div className='flex flex-col ml-4'>
                                    <h1>Valor na carteira</h1>
                                    <h1 className='text-2xl'>R${wallet?.balance}</h1>
                                </div>
                            </div>
                            <div className='flex flex-row items-center bg-white rounded-xl pl-4 pt-4 pb-4 pr-10'>
                                <div className='bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white'>
                                    <FontAwesomeIcon className='text-white' icon={faCoins} />
                                </div>
                                <div className='flex flex-col ml-4'>
                                    <h1>Pontuação</h1>
                                    <h1 className='text-2xl'>{wallet?.points} pontos</h1>
                                </div>
                            </div>
                        </div>
                        <Button onClick={openModal} className="mt-8 p-4 bg-white text-black hover:bg-gray-300 transition rounded-3xl min-h-12">
                            Depositar Valor
                        </Button>
                    </div>
                }
            </main>
            {
                modalIsOpen && <DepositModal modalIsOpen={modalIsOpen} closeModal={closeModal} onSubmit={handleDeposit} onInputChange={e => updateInputValue(e.target.value)} value={inputValue} />
            }
        </div>
    )
}
