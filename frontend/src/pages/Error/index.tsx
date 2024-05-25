

export function Error() {

    return(
        <div className='bg-background bg-cover bg-no-repeat h-screen'>
            <div className='flex items-center justify-center h-screen backdrop-brightness-50 backdrop-blur-sm'>
                <main className='w-full h-screen flex items-center justify-center bg-fundo bg-cover bg-no-repeat'>
                    <div className='flex flex-col bg-white h-fit w-full max-w-[380px] items-center p-10 shadow-md rounded-2xl'>
                        <h1 className='text-2xl font-bold'>Erro</h1>
                        <p className='text-xl mt-4'>Página não encontrada</p>
                    </div>
                </main>
            </div>
        </div>
    )

}
