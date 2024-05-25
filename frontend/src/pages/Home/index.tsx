import { Button } from '@/components/ui/Button'
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

export function Home() {

    const _navigate = useNavigate();

    return(
        <main className='bg-background bg-cover bg-center bg-no-repeat h-screen overflow-x-hidden'>
            <header className='flex items-center justify-between h-auto backdrop-brightness-60 backdrop-blur-lg bg-gray-300 bg-opacity-20'>
                <div className='flex flex-row items-center ml-4 md:ml-20 mt-2 mb-2 md:gap-2'>
                    <img src={logo} className='h-12 block' alt="Logo" />
                    <h1 className="text-md text-white ml-2">BootPlay</h1>
                </div>
                <div className='flex gap-3 md:mr-20'>
                    <Button onClick={() => _navigate('/login')} className="bg-zinc-900 min-w-44 hover:bg-zinc-900/70 text-white rounded-3xl text-center text-sm md:text-md hidden md:block">
                        Entrar</Button>
                    <Button onClick={() => _navigate('/login')} className="bg-transparent w-10 h-10 mr-4 hover:text-gray-400 text-white text-2xl rounded-full md:hidden">
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </Button>
                    <Button onClick={() => _navigate('/signup')} className="bg-blue-300 min-w-44 hover:bg-blue-300/60 text-black rounded-3xl text-center text-sm md:text-md hidden md:block">
                        Inscrever-se</Button>
                </div>
            </header>
            <div className='mt-20 md:mt-44 ml-6 md:ml-24 max-w-xl'>
                <h1 className="text-5xl md:text-6xl text-white">A história da música não pode ser esquecida!</h1>
                <p className="text-xl md:text-2xl max-w-xl mt-8 md:mt-4 text-white">Crie já sua conta e curta os sucessos que marcaram os tempos no Vinil.</p>
                <Button onClick={() => _navigate('/signup')} className="bg-blue-300 text-black hover:bg-blue-300/60 min-w-44 mt-8 md:mt-4 rounded-3xl">
                        Inscrever-se</Button>
            </div>
        </main>
    )
}