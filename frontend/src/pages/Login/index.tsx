import React, { FormEvent, useState } from 'react'
import logo from '../../assets/logo.svg';
import { Input } from '@/components/custom/Input';
import { useAuth } from '@/hooks/UseAuth';
import { Loader2 } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const _navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    setLoading(true);
    event.preventDefault();

    login(email, password)
      .then(() => { 
        toast.success("Login efetuado com sucesso!");
        _navigate('/dashboard');
        setLoading(false);
      }).catch(() => {
        toast.error("Erro ao efetuar login!");
        setLoading(false);
      });
  }

  return (
    <>
      {isAuthenticated && <Navigate to='/dashboard' />}
      <main className="bg-background bg-cover bg-center bg-no-repeat h-screen overflow-x-hidden">
        <div className="flex items-center justify-center h-screen backdrop-brightness-50 backdrop-blur-sm">
          {/* Container */}
          <div className="flex relative h-fit max-w-[380px] bg-white p-10 rounded-2xl">
            <div className="flex flex-col items-center w-full gap-2">
              <FontAwesomeIcon icon={faX} onClick={() => _navigate('/')} className='absolute top-3 right-3 cursor-pointer bg-gray-100 hover:bg-gray-300 p-2 rounded-full w-3 h-3' />
              <img src={logo} className="h-12" />
              <h1 className="text-2xl font-semibold">Acesse sua conta</h1>
              {/* From */}
              <form onSubmit={handleLogin} className="flex flex-col w-72">
                <Input onChange={e => setEmail(e.target.value)} required type='email'>Email:</Input>
                <Input onChange={e => setPassword(e.target.value)} required type='password'>Senha:</Input>
                <Button type='submit' disabled={loading} className="p-3 bg-zinc-900 text-white hover:bg-zinc-800/90 transition mb-3 rounded-3xl min-h-12">
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 bg-zinc-800/90 animate-spin" /> Carregando...</> : 'Entrar'}
                </Button>
              </form>
              <p className="text-xs font-light">Ainda não tem conta ? <a href="/signup" className="font-semibold underline hover:text-zinc-600/90">Inscrever-se</a></p>
              {/* From */}
            </div>
          </div>
          {/* Container */}
        </div>
      </main>
    </>
  )
}
