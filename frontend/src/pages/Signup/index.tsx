import React, { FormEvent, useState } from 'react'
import { Input } from '@/components/custom/Input';
import toast from 'react-hot-toast';
import { Button } from '../../components/ui/Button';
import { Loader2 } from 'lucide-react';
import logo from '../../assets/logo.svg';
import { useAuth } from '@/hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { faX } from '@fortawesome/free-solid-svg-icons/faX';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const _navigate = useNavigate();

  async function handleSigup(event: FormEvent) {
    setLoading(true);
    const toastId = toast.loading("Criando conta...");
    event.preventDefault();

    signup(name, email, password)
      .then(() => {
        toast.dismiss(toastId);
        toast.success("Conta criada com sucesso!");
        setLoading(false);
        _navigate('/landing');
      }).catch(() => {
        toast.dismiss(toastId);
        setLoading(false);
        toast.error("Erro ao criar conta!");
      });
  }

  return (
    <main className="bg-background bg-cover bg-center bg-no-repeat h-screen">
      <div className="flex items-center justify-center h-screen backdrop-brightness-50 backdrop-blur-sm">
        <div className="w-full h-screen flex items-center justify-center bg-fundo bg-cover bg-no-repeat">
          <div className="flex flex-col relative bg-white h-fit w-full max-w-[380px] items-center p-10 gap-2 shadow-md rounded-2xl">
          <FontAwesomeIcon icon={faX} onClick={() => _navigate('/')} className='absolute top-3 right-3 cursor-pointer bg-gray-100 hover:bg-gray-300 p-2 rounded-full w-3 h-3' />
            <img src={logo} className="h-12" />
            <h1 className="text-2xl font-bold">Criar conta</h1>
            <form onSubmit={handleSigup} className="flex flex-col w-full">
              <Input type='text' onChange={event => setName(event.target.value)}>Nome Completo</Input>
              <Input type='email' required onChange={event => setEmail(event.target.value)}>Email</Input>
              <Input type='password' required onChange={event => setPassword(event.target.value)}>Senha</Input>
              <Button type='submit' disabled={loading} className="p-3 bg-zinc-900 text-white hover:bg-zinc-800/90 transition mb-3 rounded-3xl min-h-12">
                {loading ? <><Loader2 className="mr-2 h-4 w-4 bg-zinc-800/90 animate-spin" /> Carregando...</> : 'Criar conta'}
              </Button>
            </form>
            <p className="text-xs font-light">Já tem uma conta ? <a href="/login" className="font-semibold underline hover:text-zinc-600/90">Entrar</a></p>
          </div>
        </div>
      </div>
    </main>
  )
}